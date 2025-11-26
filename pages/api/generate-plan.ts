import type { NextApiRequest, NextApiResponse } from "next";

import Groq from "groq-sdk";

import { generateDatasetContext, loadDataset, computeStatistics } from "@/lib/dataset";
import { saveUserToSupabase, getUserStatsFromSupabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Indian Food Database for meal planning
const INDIAN_FOOD_DATABASE = `
BREAKFAST OPTIONS (Indian):
Vegetarian: Poha (180 cal), Upma (200 cal), Idli-Sambar (250 cal), Moong dal chilla (150 cal), Besan chilla (170 cal), Oats porridge (180 cal), Paratha with curd (300 cal), Dosa with chutney (200 cal), Daliya/Broken wheat (190 cal), Uttapam (220 cal)
Non-Veg: Egg bhurji with roti (280 cal), Omelette with toast (250 cal), Boiled eggs with bread (200 cal), Egg dosa (270 cal), Keema paratha (350 cal)

LUNCH OPTIONS (Indian):
Vegetarian: Dal-rice-sabzi (450 cal), Rajma-rice (400 cal), Chole-roti (380 cal), Kadhi-rice (350 cal), Paneer sabzi with roti (420 cal), Sambar-rice (380 cal), Mixed veg pulao (400 cal), Palak paneer with roti (450 cal)
Non-Veg: Chicken curry with rice (500 cal), Fish curry with rice (420 cal), Egg curry with roti (380 cal), Chicken biryani (550 cal), Mutton curry with roti (520 cal)

DINNER OPTIONS (Indian):
Vegetarian: Roti with dal and sabzi (350 cal), Khichdi (280 cal), Vegetable pulao (320 cal), Palak paneer with roti (400 cal), Moong dal with roti (320 cal), Mixed dal with rice (350 cal)
Non-Veg: Grilled chicken with roti (380 cal), Fish tikka with salad (300 cal), Tandoori chicken with roti (420 cal), Egg curry with rice (400 cal)

SNACKS (Indian):
Healthy: Roasted chana (120 cal), Makhana/Fox nuts (100 cal), Sprouts chaat (150 cal), Fruit chaat (100 cal), Coconut water (45 cal), Buttermilk/Chaas (40 cal), Green tea (0 cal), Roasted peanuts (170 cal)
Protein: Paneer tikka (200 cal), Boiled eggs (70 cal each), Soya chunks (150 cal), Greek yogurt/Hung curd (100 cal), Protein smoothie (180 cal)
`;

type FormData = {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
  dietPreference: string;
  medicalConditions: string;
  equipment: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData: FormData = req.body;

    // Generate context from REAL dataset (1000 Indian fitness profiles)
    const datasetContext = generateDatasetContext(
      parseInt(formData.age) || 25,
      formData.gender,
      formData.goal,
      formData.dietPreference
    );

    const prompt = `You are an expert Indian nutritionist and fitness coach. Generate a personalized diet and workout plan based on the user profile and insights from our Indian fitness dataset of 1000 real users.

${datasetContext}

${INDIAN_FOOD_DATABASE}

USER PROFILE:
- Name: ${formData.name}
- Age: ${formData.age} years
- Gender: ${formData.gender}
- Weight: ${formData.weight} kg
- Height: ${formData.height} cm
- Goal: ${formData.goal}
- Activity Level: ${formData.activityLevel}
- Diet Preference: ${formData.dietPreference}
- Medical Conditions: ${formData.medicalConditions || "None"}
- Equipment: ${formData.equipment || "Bodyweight"}

Calculate BMI and daily calorie needs using Mifflin-St Jeor equation adjusted for the goal.
Use the similar user profiles above to calibrate workout duration, frequency, and calorie targets.

Generate a complete plan in this EXACT JSON format (no markdown, just JSON):
{
  "diet": {
    "calories": <number>,
    "protein": "<range>g",
    "carbs": "<range>g",
    "fats": "<range>g",
    "meals": [
      {
        "time": "<time>",
        "name": "<meal name>",
        "items": ["<item1>", "<item2>", ...],
        "calories": <number>
      }
    ]
  },
  "workout": {
    "daysPerWeek": <number>,
    "duration": "<duration>",
    "schedule": [
      {
        "day": "<day>",
        "workout": "<workout type>",
        "exercises": [
          {"name": "<exercise>", "sets": "<sets x reps>"}
        ]
      }
    ]
  },
  "tips": ["<tip1>", "<tip2>", ...]
}

IMPORTANT:
- Use ONLY Indian foods from the database above
- Include 5 meals: Breakfast, Mid-morning snack, Lunch, Evening snack, Dinner
- Create 7-day workout schedule (Mon-Sun)
- Provide 6 personalized tips based on dataset insights
- Consider any medical conditions mentioned
- Adjust portions and calories based on goal (deficit for weight loss, surplus for muscle gain)
- For vegetarian: NO eggs or meat. For eggetarian: eggs allowed but no meat.
- Use exercise types that are popular and effective according to our dataset

Return ONLY the JSON object, no other text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert Indian nutritionist and fitness coach with access to a real dataset of 1000 Indian fitness profiles. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    // Parse the JSON response
    let plan;

    try {
      // Clean up the response - remove any markdown code blocks if present
      let cleanedResponse = responseText.trim();

      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      }
      if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      plan = JSON.parse(cleanedResponse.trim());
    } catch {
      console.error("Failed to parse AI response:", responseText);

      return res.status(500).json({
        error: "Failed to parse AI response",
        raw: responseText,
      });
    }

    // Get dataset stats to include in response
    const profiles = loadDataset();
    const stats = computeStatistics(profiles);

    // Save user data to Supabase (PostgreSQL) for continuous learning
    const savedUser = await saveUserToSupabase({
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      goal: formData.goal,
      activityLevel: formData.activityLevel,
      dietPreference: formData.dietPreference,
      medicalConditions: formData.medicalConditions,
      equipment: formData.equipment,
      planCalories: plan.diet?.calories || 0,
      planWorkoutDays: plan.workout?.daysPerWeek || 0,
    });

    // Get updated user stats from Supabase
    const userStats = await getUserStatsFromSupabase();

    return res.status(200).json({
      success: true,
      plan,
      model: "llama-3.3-70b-versatile",
      provider: "Groq",
      datasetInfo: {
        totalProfiles: stats.totalRecords,
        source: "Indian Fitness Dataset (CSV)",
        matchedProfiles: 10,
      },
      database: {
        provider: "Supabase (PostgreSQL)",
        userId: savedUser.userId,
        totalUsersServed: userStats?.totalUsers || 1,
        message: "Your data has been saved to improve future recommendations",
      },
    });
  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      error: "Failed to generate plan",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
