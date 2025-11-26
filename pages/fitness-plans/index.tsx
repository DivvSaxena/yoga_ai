import { useState } from "react";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";
import Image from "next/image";

import { title, subtitle } from "@/components/primitives";
import { YogaIcon, FitnessIcon, HeartPulseIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

type WorkoutCategory = "yoga" | "strength" | "cardio" | "home";

const workoutPlans = {
  yoga: {
    title: "Yoga & Pranayama",
    subtitle: "Ancient wisdom for modern wellness",
    icon: YogaIcon,
    bgClass: "bg-violet-500",
    gradientClass: "bg-gradient-to-r from-violet-500/10 to-violet-500/5",
    textClass: "text-violet-500",
    badgeClass: "bg-violet-500/10 text-violet-500",
    image: "/assets/yoga-pranayamasection.png",
    description:
      "Traditional yoga asanas and breathing exercises for flexibility, strength, and mental peace.",
    routines: [
      {
        name: "Morning Surya Namaskar",
        duration: "20 mins",
        level: "Beginner",
        exercises: [
          { name: "Pranamasana (Prayer Pose)", reps: "Hold 30s" },
          { name: "Hasta Uttanasana (Raised Arms)", reps: "Hold 15s" },
          { name: "Uttanasana (Forward Bend)", reps: "Hold 20s" },
          { name: "Ashwa Sanchalanasana (Lunge)", reps: "Each side 15s" },
          { name: "Dandasana (Plank)", reps: "Hold 30s" },
          { name: "Ashtanga Namaskara (8 Limb Pose)", reps: "Hold 10s" },
          { name: "Bhujangasana (Cobra)", reps: "Hold 20s" },
          { name: "Adho Mukha Svanasana (Downward Dog)", reps: "Hold 30s" },
        ],
        benefits: [
          "Improves flexibility",
          "Boosts metabolism",
          "Energizes body",
        ],
      },
      {
        name: "Evening Relaxation Flow",
        duration: "30 mins",
        level: "All Levels",
        exercises: [
          { name: "Balasana (Child's Pose)", reps: "Hold 1 min" },
          { name: "Marjariasana (Cat-Cow)", reps: "10 cycles" },
          { name: "Setu Bandhasana (Bridge)", reps: "Hold 30s x 3" },
          {
            name: "Supta Matsyendrasana (Supine Twist)",
            reps: "Each side 1 min",
          },
          { name: "Viparita Karani (Legs Up Wall)", reps: "Hold 5 mins" },
          { name: "Savasana (Corpse Pose)", reps: "Hold 5 mins" },
        ],
        benefits: ["Reduces stress", "Improves sleep", "Releases tension"],
      },
      {
        name: "Pranayama Session",
        duration: "15 mins",
        level: "Beginner",
        exercises: [
          { name: "Bhastrika (Bellows Breath)", reps: "30 breaths x 3" },
          { name: "Kapalbhati (Skull Shining)", reps: "50 strokes x 3" },
          { name: "Anulom Vilom (Alternate Nostril)", reps: "10 mins" },
          { name: "Bhramari (Bee Breath)", reps: "5 cycles" },
        ],
        benefits: ["Clears mind", "Improves lung capacity", "Reduces anxiety"],
      },
    ],
  },
  strength: {
    title: "Strength Training",
    subtitle: "Build muscle & increase power",
    icon: FitnessIcon,
    bgClass: "bg-success",
    gradientClass: "bg-gradient-to-r from-success/10 to-success/5",
    textClass: "text-success",
    badgeClass: "bg-success/10 text-success",
    image: "/assets/strength-training-section.png",
    description:
      "Progressive resistance training for muscle building and strength gains.",
    routines: [
      {
        name: "Upper Body Power",
        duration: "45 mins",
        level: "Intermediate",
        exercises: [
          { name: "Push-ups", reps: "4 sets x 12 reps" },
          { name: "Dumbbell Shoulder Press", reps: "4 sets x 10 reps" },
          { name: "Bent Over Rows", reps: "4 sets x 12 reps" },
          { name: "Bicep Curls", reps: "3 sets x 15 reps" },
          { name: "Tricep Dips", reps: "3 sets x 12 reps" },
          { name: "Plank Hold", reps: "3 sets x 45 secs" },
        ],
        benefits: [
          "Builds upper body strength",
          "Improves posture",
          "Tones arms",
        ],
      },
      {
        name: "Lower Body Strength",
        duration: "45 mins",
        level: "Intermediate",
        exercises: [
          { name: "Squats", reps: "4 sets x 15 reps" },
          { name: "Lunges", reps: "3 sets x 12 each leg" },
          { name: "Romanian Deadlifts", reps: "4 sets x 10 reps" },
          { name: "Calf Raises", reps: "4 sets x 20 reps" },
          { name: "Glute Bridges", reps: "3 sets x 15 reps" },
          { name: "Wall Sit", reps: "3 sets x 45 secs" },
        ],
        benefits: ["Strengthens legs", "Improves balance", "Burns fat"],
      },
      {
        name: "Full Body Circuit",
        duration: "40 mins",
        level: "Advanced",
        exercises: [
          { name: "Burpees", reps: "4 sets x 10 reps" },
          { name: "Mountain Climbers", reps: "4 sets x 30 secs" },
          { name: "Kettlebell Swings", reps: "4 sets x 15 reps" },
          { name: "Box Jumps", reps: "3 sets x 10 reps" },
          { name: "Renegade Rows", reps: "3 sets x 10 each" },
          { name: "Turkish Get-ups", reps: "2 sets x 5 each" },
        ],
        benefits: [
          "Total body workout",
          "High calorie burn",
          "Builds endurance",
        ],
      },
    ],
  },
  cardio: {
    title: "Cardio & HIIT",
    subtitle: "Burn fat & boost stamina",
    icon: HeartPulseIcon,
    bgClass: "bg-danger",
    gradientClass: "bg-gradient-to-r from-danger/10 to-danger/5",
    textClass: "text-danger",
    badgeClass: "bg-danger/10 text-danger",
    image: "/assets/cardio-hiit-section.png",
    description:
      "High-intensity workouts for maximum calorie burn and cardiovascular health.",
    routines: [
      {
        name: "20-Min Fat Burner",
        duration: "20 mins",
        level: "Beginner",
        exercises: [
          { name: "Jumping Jacks", reps: "45 sec work, 15 sec rest" },
          { name: "High Knees", reps: "45 sec work, 15 sec rest" },
          { name: "Butt Kicks", reps: "45 sec work, 15 sec rest" },
          { name: "Squat Jumps", reps: "30 sec work, 30 sec rest" },
          { name: "Mountain Climbers", reps: "45 sec work, 15 sec rest" },
          { name: "Repeat 3 rounds", reps: "" },
        ],
        benefits: [
          "Burns 200+ calories",
          "No equipment needed",
          "Quick & effective",
        ],
      },
      {
        name: "HIIT Tabata",
        duration: "25 mins",
        level: "Advanced",
        exercises: [
          { name: "Sprint in Place", reps: "20 sec on, 10 sec off x 8" },
          { name: "Burpees", reps: "20 sec on, 10 sec off x 8" },
          { name: "Jump Lunges", reps: "20 sec on, 10 sec off x 8" },
          { name: "Plank Jacks", reps: "20 sec on, 10 sec off x 8" },
        ],
        benefits: [
          "Maximum calorie burn",
          "EPOC effect",
          "Builds mental toughness",
        ],
      },
      {
        name: "Dance Cardio",
        duration: "30 mins",
        level: "All Levels",
        exercises: [
          { name: "Warm-up Stretches", reps: "5 mins" },
          { name: "Bollywood Dance Moves", reps: "10 mins" },
          { name: "Bhangra Beats", reps: "8 mins" },
          { name: "Free Style", reps: "5 mins" },
          { name: "Cool Down", reps: "2 mins" },
        ],
        benefits: ["Fun & engaging", "Full body workout", "Mood booster"],
      },
    ],
  },
  home: {
    title: "Home Workouts",
    subtitle: "No equipment required",
    icon: FitnessIcon,
    bgClass: "bg-primary",
    gradientClass: "bg-gradient-to-r from-primary/10 to-primary/5",
    textClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary",
    image: "/assets/basic-equipment-setup.png",
    description: "Effective workouts you can do anywhere with zero equipment.",
    routines: [
      {
        name: "Quick Morning Energizer",
        duration: "15 mins",
        level: "Beginner",
        exercises: [
          { name: "Arm Circles", reps: "30 secs each direction" },
          { name: "Bodyweight Squats", reps: "15 reps" },
          { name: "Push-ups (or Knee)", reps: "10 reps" },
          { name: "Standing Crunches", reps: "20 reps" },
          { name: "Jumping Jacks", reps: "30 secs" },
          { name: "Repeat 2 rounds", reps: "" },
        ],
        benefits: ["Wakes up body", "Boosts energy", "Quick & easy"],
      },
      {
        name: "Living Room Circuit",
        duration: "30 mins",
        level: "Intermediate",
        exercises: [
          { name: "Wall Push-ups", reps: "15 reps" },
          { name: "Chair Dips", reps: "12 reps" },
          { name: "Sofa Squats", reps: "15 reps" },
          { name: "Stair Climbs", reps: "2 mins" },
          { name: "Floor Crunches", reps: "20 reps" },
          { name: "Plank", reps: "45 secs" },
          { name: "Repeat 3 rounds", reps: "" },
        ],
        benefits: ["Uses household items", "Full body", "Space efficient"],
      },
      {
        name: "Apartment-Friendly HIIT",
        duration: "20 mins",
        level: "Intermediate",
        exercises: [
          { name: "Silent Burpees (no jump)", reps: "10 reps" },
          { name: "Reverse Lunges", reps: "12 each leg" },
          { name: "Plank to Downward Dog", reps: "10 reps" },
          { name: "Glute Bridges", reps: "15 reps" },
          { name: "Dead Bugs", reps: "10 each side" },
          { name: "Repeat 3 rounds", reps: "" },
        ],
        benefits: ["Neighbor-friendly", "No jumping", "Still effective"],
      },
    ],
  },
};

const weeklySchedule = [
  { day: "Monday", workout: "Upper Body Strength", type: "strength" },
  { day: "Tuesday", workout: "Morning Yoga Flow", type: "yoga" },
  { day: "Wednesday", workout: "HIIT Cardio", type: "cardio" },
  { day: "Thursday", workout: "Lower Body Strength", type: "strength" },
  { day: "Friday", workout: "Pranayama & Meditation", type: "yoga" },
  { day: "Saturday", workout: "Full Body Circuit", type: "cardio" },
  { day: "Sunday", workout: "Active Recovery / Rest", type: "rest" },
];

export default function FitnessPlansPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<WorkoutCategory>("yoga");
  const currentPlan = workoutPlans[selectedCategory];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className={title({ size: "lg" })}>Fitness </h1>
            <h1 className={title({ size: "lg", color: "green" })}>Plans</h1>
            <p className={subtitle({ class: "mt-4" })}>
              From traditional yoga to modern HIIT - workout routines that fit
              your space, schedule, and fitness level.
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
            <Image
              alt="Fitness and Yoga"
              className="object-cover"
              fill
              src="/assets/hero-banner.png"
            />
          </div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {(Object.keys(workoutPlans) as WorkoutCategory[]).map((category) => {
            const plan = workoutPlans[category];

            return (
              <Button
                key={category}
                className={
                  selectedCategory === category
                    ? `${plan.bgClass} text-white`
                    : ""
                }
                radius="full"
                variant={selectedCategory === category ? "solid" : "bordered"}
                onPress={() => setSelectedCategory(category)}
              >
                <plan.icon size={18} />
                {plan.title}
              </Button>
            );
          })}
        </div>
      </section>

      {/* Selected Category Details */}
      <section className="py-8">
        <div className={`${currentPlan.gradientClass} rounded-3xl p-8`}>
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                alt={currentPlan.title}
                className="object-cover"
                fill
                src={currentPlan.image}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-default-100 flex items-center justify-center">
                  <currentPlan.icon className={currentPlan.textClass} size={24} />
                </div>
                <h2 className={title({ size: "sm" })}>{currentPlan.title}</h2>
              </div>
              <p className={`${currentPlan.textClass} font-semibold`}>
                {currentPlan.subtitle}
              </p>
              <p className="text-default-600 mt-2">
                {currentPlan.description}
              </p>
            </div>
          </div>

          {/* Routines */}
          <div className="grid md:grid-cols-3 gap-6">
            {currentPlan.routines.map((routine, index) => (
              <div
                key={index}
                className="bg-white dark:bg-default-100 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{routine.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${currentPlan.badgeClass}`}
                  >
                    {routine.level}
                  </span>
                </div>
                <p className="text-success font-medium mb-4">
                  {routine.duration}
                </p>

                <div className="space-y-2 mb-4">
                  {routine.exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-default-100 last:border-0"
                    >
                      <span className="text-sm">{exercise.name}</span>
                      <span className="text-xs text-default-500">
                        {exercise.reps}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-default-200">
                  <p className="text-xs text-default-500 mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {routine.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-default-100 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Sample </h2>
          <h2 className={title({ size: "sm", color: "blue" })}>
            Weekly Schedule
          </h2>
          <p className="text-default-500 mt-4 max-w-xl mx-auto">
            A balanced week combining strength, cardio, and recovery for optimal
            results.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weeklySchedule.map((day) => (
            <div
              key={day.day}
              className={`p-4 rounded-xl text-center ${
                day.type === "rest"
                  ? "bg-default-100"
                  : day.type === "yoga"
                    ? "bg-violet-500/10"
                    : day.type === "strength"
                      ? "bg-success/10"
                      : "bg-danger/10"
              }`}
            >
              <p className="font-semibold">{day.day}</p>
              <p className="text-xs text-default-600 mt-2">{day.workout}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment Guide */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-success/5 rounded-3xl px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={title({ size: "sm" })}>Equipment </h2>
            <h2 className={title({ size: "sm", color: "yellow" })}>Guide</h2>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏠</div>
                <div>
                  <h3 className="font-semibold mb-1">No Equipment</h3>
                  <p className="text-sm text-default-500">
                    Bodyweight exercises, yoga, and cardio - perfect for home
                    workouts with zero investment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎒</div>
                <div>
                  <h3 className="font-semibold mb-1">Basic Setup</h3>
                  <p className="text-sm text-default-500">
                    Yoga mat, resistance bands, and a pair of dumbbells - invest
                    under Rs. 2000.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">💪</div>
                <div>
                  <h3 className="font-semibold mb-1">Full Gym</h3>
                  <p className="text-sm text-default-500">
                    Access to gym equipment? We have advanced routines for
                    maximum gains.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image
              alt="Pranayama and meditation"
              className="object-cover"
              fill
              src="/assets/pranayama.png"
            />
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Pro </h2>
          <h2 className={title({ size: "sm", color: "green" })}>Tips</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              tip: "Warm up for 5-10 minutes before every workout",
              icon: "🔥",
            },
            {
              tip: "Stay hydrated - drink water before, during & after",
              icon: "💧",
            },
            { tip: "Listen to your body - rest when needed", icon: "🧘" },
            { tip: "Consistency beats intensity - show up daily", icon: "📅" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-default-50 border border-default-200 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-sm text-default-700">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className={title({ size: "sm" })}>Get Your </h2>
        <h2 className={title({ size: "sm", color: "green" })}>
          Custom Workout Plan
        </h2>
        <p className="text-default-600 mt-4 mb-8 max-w-xl mx-auto">
          Let our AI create a personalized fitness plan based on your goals,
          fitness level, and available equipment.
        </p>
        <NextLink
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
            size: "lg",
          })}
          href="/ai-planner"
        >
          Create My Workout Plan
        </NextLink>
      </section>
    </DefaultLayout>
  );
}
