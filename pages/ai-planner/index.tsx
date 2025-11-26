import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { title, subtitle } from "@/components/primitives";
import { AIIcon, CheckIcon, DietIcon, FitnessIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

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

type GeneratedPlan = {
  diet: {
    calories: number;
    protein: string;
    carbs: string;
    fats: string;
    meals: {
      time: string;
      name: string;
      items: string[];
      calories: number;
    }[];
  };
  workout: {
    daysPerWeek: number;
    duration: string;
    schedule: {
      day: string;
      workout: string;
      exercises: { name: string; sets: string }[];
    }[];
  };
  tips: string[];
};

const mockGeneratePlan = (data: FormData): GeneratedPlan => {
  const weight = parseInt(data.weight) || 70;
  const isWeightLoss = data.goal === "weight-loss";
  const isMuscleGain = data.goal === "muscle-gain";
  const isVegetarian = data.dietPreference === "vegetarian";

  const baseCalories = isWeightLoss ? 1600 : isMuscleGain ? 2500 : 2000;
  const adjustedCalories = Math.round(baseCalories * (weight / 70));

  return {
    diet: {
      calories: adjustedCalories,
      protein: isMuscleGain ? "120-150g" : "60-80g",
      carbs: isWeightLoss ? "150-180g" : "200-250g",
      fats: "50-70g",
      meals: [
        {
          time: "7:00 AM",
          name: "Breakfast",
          items: isVegetarian
            ? [
                "Moong dal chilla (2 pcs)",
                "Mint chutney",
                "1 cup green tea",
                "5 soaked almonds",
              ]
            : [
                "3 Egg white omelette",
                "2 whole wheat toast",
                "1 cup milk",
                "1 banana",
              ],
          calories: Math.round(adjustedCalories * 0.25),
        },
        {
          time: "10:30 AM",
          name: "Mid-Morning Snack",
          items: ["1 medium apple", "10 roasted almonds", "Green tea"],
          calories: Math.round(adjustedCalories * 0.1),
        },
        {
          time: "1:00 PM",
          name: "Lunch",
          items: isVegetarian
            ? [
                "2 Multigrain roti",
                "1 cup rajma/chole",
                "Mixed vegetable sabzi",
                "Cucumber raita",
                "Green salad",
              ]
            : [
                "1 cup brown rice",
                "Grilled chicken (150g)",
                "Dal tadka",
                "Salad",
                "Buttermilk",
              ],
          calories: Math.round(adjustedCalories * 0.3),
        },
        {
          time: "4:30 PM",
          name: "Evening Snack",
          items: isVegetarian
            ? ["Sprouts chaat", "Coconut water"]
            : ["Boiled egg (2)", "Green tea"],
          calories: Math.round(adjustedCalories * 0.1),
        },
        {
          time: "7:30 PM",
          name: "Dinner",
          items: isVegetarian
            ? ["1 Roti", "Palak paneer", "Mixed veg salad", "1 cup dal"]
            : ["2 Roti", "Fish curry", "Sauteed vegetables", "Curd"],
          calories: Math.round(adjustedCalories * 0.25),
        },
      ],
    },
    workout: {
      daysPerWeek:
        data.activityLevel === "sedentary"
          ? 3
          : data.activityLevel === "moderate"
            ? 5
            : 6,
      duration: "45-60 minutes",
      schedule: [
        {
          day: "Monday",
          workout: isMuscleGain ? "Upper Body Strength" : "Full Body + Cardio",
          exercises: isMuscleGain
            ? [
                { name: "Push-ups", sets: "4 x 15" },
                { name: "Dumbbell Shoulder Press", sets: "4 x 12" },
                { name: "Bent Over Rows", sets: "4 x 12" },
                { name: "Bicep Curls", sets: "3 x 15" },
                { name: "Tricep Dips", sets: "3 x 12" },
              ]
            : [
                { name: "Jumping Jacks", sets: "3 x 30 sec" },
                { name: "Squats", sets: "3 x 15" },
                { name: "Push-ups", sets: "3 x 10" },
                { name: "Lunges", sets: "3 x 12 each" },
                { name: "Plank", sets: "3 x 30 sec" },
              ],
        },
        {
          day: "Tuesday",
          workout: "Yoga & Flexibility",
          exercises: [
            { name: "Surya Namaskar", sets: "5 rounds" },
            { name: "Warrior Poses", sets: "Hold 30 sec each" },
            { name: "Triangle Pose", sets: "Hold 30 sec each side" },
            { name: "Seated Forward Bend", sets: "Hold 1 min" },
            { name: "Savasana", sets: "5 mins" },
          ],
        },
        {
          day: "Wednesday",
          workout: isMuscleGain ? "Lower Body Strength" : "Cardio HIIT",
          exercises: isMuscleGain
            ? [
                { name: "Squats", sets: "4 x 15" },
                { name: "Lunges", sets: "4 x 12 each" },
                { name: "Romanian Deadlifts", sets: "4 x 12" },
                { name: "Calf Raises", sets: "4 x 20" },
                { name: "Glute Bridges", sets: "3 x 15" },
              ]
            : [
                { name: "High Knees", sets: "30 sec on, 15 sec off x 4" },
                { name: "Burpees", sets: "30 sec on, 15 sec off x 4" },
                {
                  name: "Mountain Climbers",
                  sets: "30 sec on, 15 sec off x 4",
                },
                { name: "Squat Jumps", sets: "30 sec on, 15 sec off x 4" },
              ],
        },
        {
          day: "Thursday",
          workout: "Active Recovery",
          exercises: [
            { name: "Light Walking", sets: "20 mins" },
            { name: "Stretching Routine", sets: "15 mins" },
            { name: "Pranayama (Breathing)", sets: "10 mins" },
          ],
        },
        {
          day: "Friday",
          workout: isMuscleGain ? "Push Day" : "Strength Training",
          exercises: [
            { name: "Push-ups variations", sets: "4 x 12" },
            { name: "Shoulder Press", sets: "4 x 10" },
            { name: "Chest Flyes", sets: "3 x 12" },
            { name: "Lateral Raises", sets: "3 x 12" },
            { name: "Core Circuit", sets: "3 rounds" },
          ],
        },
        {
          day: "Saturday",
          workout: "Mixed Cardio",
          exercises: [
            { name: "Brisk Walking/Jogging", sets: "20 mins" },
            { name: "Cycling/Spot Jogging", sets: "15 mins" },
            { name: "Cool Down Stretches", sets: "10 mins" },
          ],
        },
        {
          day: "Sunday",
          workout: "Rest Day",
          exercises: [
            { name: "Complete rest or light stretching", sets: "Optional" },
          ],
        },
      ],
    },
    tips: [
      `Drink at least ${Math.round(weight * 0.033)} liters of water daily`,
      "Eat your dinner at least 2-3 hours before sleeping",
      "Get 7-8 hours of quality sleep every night",
      isWeightLoss
        ? "Avoid sugary drinks and processed foods"
        : "Include a protein source in every meal",
      "Track your progress weekly - measurements and photos work better than just weight",
      "Listen to your body - rest when needed, push when you can",
    ],
  };
};

export default function AIPlannerPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(
    null,
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    dietPreference: "",
    medicalConditions: "",
    equipment: "",
  });

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      const plan = mockGeneratePlan(formData);

      setGeneratedPlan(plan);
      setIsGenerating(false);
      setStep(3);
    }, 2500);
  };

  const canProceedStep1 =
    formData.name &&
    formData.age &&
    formData.gender &&
    formData.weight &&
    formData.height;
  const canProceedStep2 =
    formData.goal && formData.activityLevel && formData.dietPreference;

  const handleDownloadPDF = () => {
    if (!generatedPlan) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.name}'s YogaAI Plan</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
          h1 { color: #17c964; border-bottom: 2px solid #17c964; padding-bottom: 10px; }
          h2 { color: #17c964; margin-top: 30px; }
          h3 { color: #666; margin-top: 20px; }
          .header { text-align: center; margin-bottom: 40px; }
          .header img { width: 60px; }
          .section { margin-bottom: 30px; background: #f9f9f9; padding: 20px; border-radius: 10px; }
          .meal, .day { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #17c964; }
          .meal-time { color: #888; font-size: 12px; }
          .stats { display: flex; justify-content: space-around; margin: 20px 0; }
          .stat { text-align: center; padding: 15px; background: white; border-radius: 8px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #17c964; }
          .tip { padding: 10px; margin: 5px 0; background: #e8f5e9; border-radius: 5px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; }
          ul { margin: 10px 0; padding-left: 20px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>YogaAI - Your Personalized Plan</h1>
          <p>Created for <strong>${formData.name}</strong> | Goal: ${formData.goal.replace("-", " ").toUpperCase()}</p>
        </div>

        <div class="section">
          <h2>Diet Plan - ${generatedPlan.diet.calories} Calories/Day</h2>
          <div class="stats">
            <div class="stat"><div class="stat-value">${generatedPlan.diet.protein}</div><div>Protein</div></div>
            <div class="stat"><div class="stat-value">${generatedPlan.diet.carbs}</div><div>Carbs</div></div>
            <div class="stat"><div class="stat-value">${generatedPlan.diet.fats}</div><div>Fats</div></div>
          </div>
          ${generatedPlan.diet.meals
            .map(
              (meal) => `
            <div class="meal">
              <strong>${meal.name}</strong> <span class="meal-time">${meal.time} - ${meal.calories} cal</span>
              <ul>${meal.items.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="section">
          <h2>Workout Plan - ${generatedPlan.workout.daysPerWeek} Days/Week</h2>
          <p>Duration: ${generatedPlan.workout.duration}</p>
          ${generatedPlan.workout.schedule
            .map(
              (day) => `
            <div class="day">
              <strong>${day.day}</strong> - ${day.workout}
              <ul>${day.exercises.map((ex) => `<li>${ex.name}: ${ex.sets}</li>`).join("")}</ul>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="section">
          <h2>Tips for Success</h2>
          ${generatedPlan.tips.map((tip) => `<div class="tip">✓ ${tip}</div>`).join("")}
        </div>

        <div class="footer">
          <p>Generated by YogaAI - AI-powered fitness for Indian lifestyles</p>
          <p>www.yogaai.in</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <AIIcon className="text-success" size={32} />
        </div>
        <h1 className={title({ size: "lg" })}>AI </h1>
        <h1 className={title({ size: "lg", color: "green" })}>Planner</h1>
        <p className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}>
          Get your personalized diet and workout plan in under 2 minutes.
          Powered by AI, designed for Indian lifestyles.
        </p>
      </section>

      {/* Progress Steps */}
      {step < 3 && (
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 px-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-1 sm:gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "bg-success text-white" : "bg-default-200"
                }`}
              >
                {step > s ? <CheckIcon size={16} /> : s}
              </div>
              <span
                className={`text-xs sm:text-base ${step >= s ? "text-success" : "text-default-500"}`}
              >
                {s === 1 ? "Basic Info" : "Goals"}
              </span>
              {s < 2 && (
                <div className="w-4 sm:w-8 h-0.5 bg-default-200 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <section className="max-w-2xl mx-auto py-4 sm:py-8 px-4 sm:px-0">
          <div className="bg-default-50 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">
              Tell us about yourself
            </h2>

            <div className="space-y-6">
              <Input
                label="Your Name"
                placeholder="Enter your name"
                value={formData.name}
                onValueChange={(v) => updateForm("name", v)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Age"
                  placeholder="25"
                  type="number"
                  value={formData.age}
                  onValueChange={(v) => updateForm("age", v)}
                />
                <div>
                  <span className="block text-sm mb-2">Gender</span>
                  <div className="flex flex-wrap gap-2">
                    {["male", "female", "other"].map((g) => (
                      <Button
                        key={g}
                        className={
                          formData.gender === g ? "bg-success text-white" : ""
                        }
                        radius="full"
                        size="sm"
                        variant={formData.gender === g ? "solid" : "bordered"}
                        onPress={() => updateForm("gender", g)}
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Weight (kg)"
                  placeholder="70"
                  type="number"
                  value={formData.weight}
                  onValueChange={(v) => updateForm("weight", v)}
                />
                <Input
                  label="Height (cm)"
                  placeholder="170"
                  type="number"
                  value={formData.height}
                  onValueChange={(v) => updateForm("height", v)}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                color="success"
                isDisabled={!canProceedStep1}
                radius="full"
                size="lg"
                onPress={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Goals & Preferences */}
      {step === 2 && (
        <section className="max-w-2xl mx-auto py-4 sm:py-8 px-4 sm:px-0">
          <div className="bg-default-50 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">
              Your goals & preferences
            </h2>

            <div className="space-y-6">
              <div>
                <span className="block text-sm mb-3">
                  What&apos;s your primary goal?
                </span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: "weight-loss", label: "Lose Weight", emoji: "⚖️" },
                    { id: "muscle-gain", label: "Build Muscle", emoji: "💪" },
                    { id: "maintenance", label: "Stay Fit", emoji: "🎯" },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      className={`p-2 sm:p-4 rounded-xl border-2 text-center transition-all ${
                        formData.goal === goal.id
                          ? "border-success bg-success/10"
                          : "border-default-200 hover:border-default-400"
                      }`}
                      onClick={() => updateForm("goal", goal.id)}
                    >
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                        {goal.emoji}
                      </div>
                      <div className="text-xs sm:text-sm font-medium">
                        {goal.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm mb-3">Activity Level</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    {
                      id: "sedentary",
                      label: "Sedentary",
                      desc: "Desk job",
                    },
                    {
                      id: "moderate",
                      label: "Moderate",
                      desc: "Some exercise",
                    },
                    { id: "active", label: "Active", desc: "Regular exercise" },
                  ].map((level) => (
                    <button
                      key={level.id}
                      className={`p-2 sm:p-4 rounded-xl border-2 text-center transition-all ${
                        formData.activityLevel === level.id
                          ? "border-success bg-success/10"
                          : "border-default-200 hover:border-default-400"
                      }`}
                      onClick={() => updateForm("activityLevel", level.id)}
                    >
                      <div className="text-xs sm:text-sm font-medium">
                        {level.label}
                      </div>
                      <div className="text-xs text-default-500 mt-1 hidden sm:block">
                        {level.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm mb-3">Diet Preference</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: "vegetarian", label: "Veg", emoji: "🥗" },
                    { id: "non-vegetarian", label: "Non-Veg", emoji: "🍗" },
                    { id: "eggetarian", label: "Egg", emoji: "🥚" },
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      className={`p-2 sm:p-4 rounded-xl border-2 text-center transition-all ${
                        formData.dietPreference === diet.id
                          ? "border-success bg-success/10"
                          : "border-default-200 hover:border-default-400"
                      }`}
                      onClick={() => updateForm("dietPreference", diet.id)}
                    >
                      <div className="text-xl sm:text-2xl mb-1">{diet.emoji}</div>
                      <div className="text-xs sm:text-sm font-medium">
                        {diet.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Any medical conditions or allergies? (Optional)"
                placeholder="e.g., Diabetes, Lactose intolerant, None"
                value={formData.medicalConditions}
                onValueChange={(v) => updateForm("medicalConditions", v)}
              />

              <div>
                <span className="block text-sm mb-3">Equipment Available</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "None (Bodyweight)",
                    "Basic (Dumbbells, Mat)",
                    "Full Gym Access",
                  ].map((eq) => (
                    <Button
                      key={eq}
                      className={
                        formData.equipment === eq ? "bg-success text-white" : ""
                      }
                      radius="full"
                      size="sm"
                      variant={formData.equipment === eq ? "solid" : "bordered"}
                      onPress={() => updateForm("equipment", eq)}
                    >
                      {eq}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                radius="full"
                variant="bordered"
                onPress={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                color="success"
                isDisabled={!canProceedStep2}
                isLoading={isGenerating}
                radius="full"
                size="lg"
                onPress={handleGenerate}
              >
                {isGenerating ? "Generating Your Plan..." : "Generate My Plan"}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Generated Plan */}
      {step === 3 && generatedPlan && (
        <section className="py-4 sm:py-8 px-2 sm:px-0">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-success/10 rounded-full text-success mb-4">
              <CheckIcon size={20} />
              <span className="font-medium text-sm sm:text-base">
                Plan Generated!
              </span>
            </div>
            <h2 className={title({ size: "sm" })}>
              {formData.name}&apos;s Plan
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Diet Plan */}
            <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                  <DietIcon className="text-warning" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Diet Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-default-500">
                    {generatedPlan.diet.calories} cal/day
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white dark:bg-default-100 rounded-xl p-2 sm:p-3 text-center">
                  <p className="text-sm sm:text-lg font-bold text-warning">
                    {generatedPlan.diet.protein}
                  </p>
                  <p className="text-xs text-default-500">Protein</p>
                </div>
                <div className="bg-white dark:bg-default-100 rounded-xl p-2 sm:p-3 text-center">
                  <p className="text-sm sm:text-lg font-bold text-warning">
                    {generatedPlan.diet.carbs}
                  </p>
                  <p className="text-xs text-default-500">Carbs</p>
                </div>
                <div className="bg-white dark:bg-default-100 rounded-xl p-2 sm:p-3 text-center">
                  <p className="text-sm sm:text-lg font-bold text-warning">
                    {generatedPlan.diet.fats}
                  </p>
                  <p className="text-xs text-default-500">Fats</p>
                </div>
              </div>

              <div className="space-y-4">
                {generatedPlan.diet.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-default-100 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{meal.name}</span>
                      <span className="text-xs text-default-500">
                        {meal.time}
                      </span>
                    </div>
                    <ul className="text-sm text-default-600 space-y-1">
                      {meal.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-success mt-2">
                      {meal.calories} calories
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workout Plan */}
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <FitnessIcon className="text-success" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Workout Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-default-500">
                    {generatedPlan.workout.daysPerWeek} days/week
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {generatedPlan.workout.schedule.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-default-100 rounded-xl p-3 sm:p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-success text-sm sm:text-base">
                        {day.day}
                      </span>
                      <span className="text-xs sm:text-sm">{day.workout}</span>
                    </div>
                    <div className="space-y-1">
                      {day.exercises.map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-xs sm:text-sm text-default-600"
                        >
                          <span className="truncate mr-2">{ex.name}</span>
                          <span className="text-default-400 whitespace-nowrap">
                            {ex.sets}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-4 sm:mt-8 bg-gradient-to-r from-primary/10 to-violet/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Tips for You
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              {generatedPlan.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <CheckIcon
                    className="text-success mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-xs sm:text-sm text-default-700">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              color="success"
              radius="full"
              size="lg"
              variant="shadow"
              onPress={handleDownloadPDF}
            >
              Download Plan (PDF)
            </Button>
            <Button
              radius="full"
              size="lg"
              variant="bordered"
              onPress={() => setStep(1)}
            >
              Create New Plan
            </Button>
          </div>
        </section>
      )}
    </DefaultLayout>
  );
}
