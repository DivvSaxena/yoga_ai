import fs from "fs";
import path from "path";

// Type for a fitness profile from the CSV
export type FitnessProfile = {
  id: number;
  name: string;
  age: number;
  gender: string;
  city: string;
  occupation: string;
  dietType: string;
  gymMembership: boolean;
  weight: number;
  height: number;
  bmi: number;
  bodyFatPercentage: number;
  exerciseType: string;
  durationMinutes: number;
  caloriesBurned: number;
  heartRateAvg: number;
  restingHeartRate: number;
  stepsDaily: number;
  sleepHours: number;
  waterIntakeLiters: number;
  workoutFrequencyWeekly: number;
  fitnessLevel: string;
  goal: string;
  stressLevel: number;
  weeklyCheatMeals: number;
  healthScore: number;
};

// Parse CSV and return all profiles
export function loadDataset(): FitnessProfile[] {
  const csvPath = path.join(
    process.cwd(),
    "dataset",
    "Indian_Fitness_Dataset_1 - Indian_Fitness_Dataset_1000_detailed.csv"
  );

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",");

  const profiles: FitnessProfile[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length < headers.length) continue;

    profiles.push({
      id: parseInt(values[0]) || i,
      name: values[1],
      age: parseInt(values[2]) || 0,
      gender: values[3],
      city: values[4],
      occupation: values[5],
      dietType: values[6],
      gymMembership: values[7] === "Yes",
      weight: parseFloat(values[8]) || 0,
      height: parseFloat(values[9]) || 0,
      bmi: parseFloat(values[10]) || 0,
      bodyFatPercentage: parseFloat(values[11]) || 0,
      exerciseType: values[12],
      durationMinutes: parseInt(values[13]) || 0,
      caloriesBurned: parseInt(values[14]) || 0,
      heartRateAvg: parseInt(values[15]) || 0,
      restingHeartRate: parseInt(values[16]) || 0,
      stepsDaily: parseInt(values[17]) || 0,
      sleepHours: parseFloat(values[18]) || 0,
      waterIntakeLiters: parseFloat(values[19]) || 0,
      workoutFrequencyWeekly: parseInt(values[20]) || 0,
      fitnessLevel: values[21],
      goal: values[22],
      stressLevel: parseInt(values[23]) || 0,
      weeklyCheatMeals: parseInt(values[24]) || 0,
      healthScore: parseInt(values[25]) || 0,
    });
  }

  return profiles;
}

// Compute real statistics from dataset
export function computeStatistics(profiles: FitnessProfile[]) {
  const total = profiles.length;

  // Helper functions
  const avg = (arr: number[]) =>
    arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;
  const countBy = <T>(arr: T[], key: keyof T) => {
    const counts: Record<string, number> = {};
    arr.forEach((item) => {
      const val = String(item[key]);
      counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  };
  const percentage = (count: number) => Math.round((count / total) * 100);

  // Demographics
  const ages = profiles.map((p) => p.age);
  const males = profiles.filter((p) => p.gender === "M").length;
  const females = profiles.filter((p) => p.gender === "F").length;
  const cityCounts = countBy(profiles, "city");
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([city]) => city);

  // Body metrics
  const weights = profiles.map((p) => p.weight);
  const heights = profiles.map((p) => p.height);
  const bmis = profiles.map((p) => p.bmi);
  const maleBodyFat = profiles.filter((p) => p.gender === "M").map((p) => p.bodyFatPercentage);
  const femaleBodyFat = profiles.filter((p) => p.gender === "F").map((p) => p.bodyFatPercentage);

  // Exercise patterns
  const exerciseCounts = countBy(profiles, "exerciseType");
  const exerciseStats = Object.entries(exerciseCounts).map(([type, count]) => {
    const typeProfiles = profiles.filter((p) => p.exerciseType === type);
    return {
      type,
      percentage: percentage(count),
      avgCalories: avg(typeProfiles.map((p) => p.caloriesBurned)),
      avgDuration: avg(typeProfiles.map((p) => p.durationMinutes)),
    };
  }).sort((a, b) => b.percentage - a.percentage);

  // Goals
  const goalCounts = countBy(profiles, "goal");
  const goals = Object.entries(goalCounts)
    .map(([goal, count]) => ({ goal, percentage: percentage(count) }))
    .sort((a, b) => b.percentage - a.percentage);

  // Fitness levels
  const levelCounts = countBy(profiles, "fitnessLevel");
  const fitnessLevels = Object.entries(levelCounts)
    .map(([level, count]) => ({ level, percentage: percentage(count) }));

  // Diet types
  const dietCounts = countBy(profiles, "dietType");
  const dietTypes = Object.entries(dietCounts)
    .map(([diet, count]) => ({ diet, percentage: percentage(count) }))
    .sort((a, b) => b.percentage - a.percentage);

  // Lifestyle
  const sleepHours = profiles.map((p) => p.sleepHours);
  const waterIntake = profiles.map((p) => p.waterIntakeLiters);
  const steps = profiles.map((p) => p.stepsDaily);
  const stress = profiles.map((p) => p.stressLevel);

  return {
    totalRecords: total,
    demographics: {
      ageRange: { min: Math.min(...ages), max: Math.max(...ages), avg: avg(ages) },
      gender: { male: percentage(males), female: percentage(females) },
      topCities,
    },
    bodyMetrics: {
      weight: { min: Math.min(...weights), max: Math.max(...weights), avg: avg(weights) },
      height: { min: Math.min(...heights), max: Math.max(...heights), avg: avg(heights) },
      bmi: { min: Math.min(...bmis), max: Math.max(...bmis), avg: avg(bmis) },
      bodyFat: { maleAvg: avg(maleBodyFat), femaleAvg: avg(femaleBodyFat) },
    },
    exercise: {
      types: exerciseStats.slice(0, 10),
      avgDuration: avg(profiles.map((p) => p.durationMinutes)),
      avgCalories: avg(profiles.map((p) => p.caloriesBurned)),
    },
    lifestyle: {
      sleep: { avg: avg(sleepHours), min: Math.min(...sleepHours), max: Math.max(...sleepHours) },
      water: { avg: avg(waterIntake), min: Math.min(...waterIntake), max: Math.max(...waterIntake) },
      steps: { avg: Math.round(avg(steps)) },
      stress: { avg: avg(stress) },
    },
    goals,
    fitnessLevels,
    dietTypes,
  };
}

// Find similar profiles to user input (for context)
export function findSimilarProfiles(
  profiles: FitnessProfile[],
  userAge: number,
  userGender: string,
  userGoal: string,
  userDiet: string,
  limit = 5
): FitnessProfile[] {
  // Score profiles by similarity
  const scored = profiles.map((p) => {
    let score = 0;
    if (Math.abs(p.age - userAge) <= 5) score += 3;
    else if (Math.abs(p.age - userAge) <= 10) score += 1;

    if (p.gender.toLowerCase() === userGender.toLowerCase().charAt(0)) score += 2;

    const goalMap: Record<string, string[]> = {
      "weight-loss": ["Fat Loss", "General Fitness"],
      "muscle-gain": ["Muscle Gain"],
      "maintenance": ["General Fitness", "Endurance"],
    };
    if (goalMap[userGoal]?.includes(p.goal)) score += 3;

    const dietMap: Record<string, string[]> = {
      vegetarian: ["Vegetarian", "Vegan"],
      "non-vegetarian": ["Non-Vegetarian"],
      eggetarian: ["Non-Vegetarian", "Vegetarian"],
    };
    if (dietMap[userDiet]?.includes(p.dietType)) score += 2;

    return { profile: p, score };
  });

  // Sort by score and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.profile);
}

// Generate AI context from real data
export function generateDatasetContext(
  userAge: number,
  userGender: string,
  userGoal: string,
  userDiet: string
): string {
  const profiles = loadDataset();
  const stats = computeStatistics(profiles);
  const similarProfiles = findSimilarProfiles(profiles, userAge, userGender, userGoal, userDiet, 10);

  return `
INDIAN FITNESS DATASET ANALYSIS (${stats.totalRecords} real profiles):

DEMOGRAPHICS:
- Age: ${stats.demographics.ageRange.min}-${stats.demographics.ageRange.max} years (avg: ${stats.demographics.ageRange.avg})
- Gender: Male ${stats.demographics.gender.male}%, Female ${stats.demographics.gender.female}%
- Top Cities: ${stats.demographics.topCities.slice(0, 8).join(", ")}

BODY METRICS (from dataset):
- Weight range: ${stats.bodyMetrics.weight.min}-${stats.bodyMetrics.weight.max} kg (avg: ${stats.bodyMetrics.weight.avg})
- Height range: ${stats.bodyMetrics.height.min}-${stats.bodyMetrics.height.max} cm (avg: ${stats.bodyMetrics.height.avg})
- BMI range: ${stats.bodyMetrics.bmi.min}-${stats.bodyMetrics.bmi.max} (avg: ${stats.bodyMetrics.bmi.avg})
- Body Fat: Male avg ${stats.bodyMetrics.bodyFat.maleAvg}%, Female avg ${stats.bodyMetrics.bodyFat.femaleAvg}%

POPULAR EXERCISES (by effectiveness):
${stats.exercise.types.slice(0, 8).map((e) => `- ${e.type}: ${e.percentage}% of users, burns ${e.avgCalories} cal in ${e.avgDuration} mins`).join("\n")}

LIFESTYLE PATTERNS:
- Average sleep: ${stats.lifestyle.sleep.avg} hours
- Average water intake: ${stats.lifestyle.water.avg}L (Indian climate needs 3-3.5L)
- Average daily steps: ${stats.lifestyle.steps.avg}
- Average stress level: ${stats.lifestyle.stress.avg}/10

FITNESS GOALS IN INDIA:
${stats.goals.map((g) => `- ${g.goal}: ${g.percentage}%`).join("\n")}

DIET PREFERENCES:
${stats.dietTypes.map((d) => `- ${d.diet}: ${d.percentage}%`).join("\n")}

SIMILAR USER PROFILES (matched by age, gender, goal, diet):
${similarProfiles.map((p) =>
  `- ${p.name}, ${p.age}${p.gender}, ${p.city}: ${p.weight}kg, BMI ${p.bmi}, does ${p.exerciseType} ${p.durationMinutes}min/${p.workoutFrequencyWeekly}x week, burns ${p.caloriesBurned}cal, Goal: ${p.goal}, Health Score: ${p.healthScore}`
).join("\n")}

Based on similar profiles, recommended:
- Workout duration: ${Math.round(avg(similarProfiles.map((p) => p.durationMinutes)))} mins
- Workout frequency: ${Math.round(avg(similarProfiles.map((p) => p.workoutFrequencyWeekly)))} days/week
- Target calories to burn: ${Math.round(avg(similarProfiles.map((p) => p.caloriesBurned)))} cal/session
`;

  function avg(arr: number[]) {
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  }
}
