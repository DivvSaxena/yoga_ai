import { useState } from "react";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { CheckIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

type DietCategory =
  | "weight-loss"
  | "muscle-gain"
  | "maintenance"
  | "vegetarian";

const dietPlans = {
  "weight-loss": {
    title: "Weight Loss Plan",
    subtitle: "1500-1800 calories per day",
    description:
      "Balanced Indian meals designed for sustainable fat loss while keeping you energized.",
    meals: {
      breakfast: [
        {
          name: "Poha with vegetables",
          calories: 280,
          protein: "8g",
          time: "7:00 AM",
        },
        {
          name: "Moong dal chilla (2 pcs)",
          calories: 220,
          protein: "12g",
          time: "7:00 AM",
        },
        {
          name: "Oats upma with veggies",
          calories: 250,
          protein: "9g",
          time: "7:00 AM",
        },
      ],
      midMorning: [
        {
          name: "Green tea + 10 almonds",
          calories: 80,
          protein: "3g",
          time: "10:00 AM",
        },
        {
          name: "Buttermilk + fruit",
          calories: 100,
          protein: "4g",
          time: "10:00 AM",
        },
      ],
      lunch: [
        {
          name: "2 Roti + Dal + Sabzi + Salad",
          calories: 450,
          protein: "18g",
          time: "1:00 PM",
        },
        {
          name: "Brown rice + Rajma + Raita",
          calories: 480,
          protein: "20g",
          time: "1:00 PM",
        },
        {
          name: "Quinoa pulao + Curd",
          calories: 420,
          protein: "16g",
          time: "1:00 PM",
        },
      ],
      evening: [
        {
          name: "Sprouts chaat",
          calories: 150,
          protein: "10g",
          time: "4:30 PM",
        },
        {
          name: "Roasted makhana",
          calories: 100,
          protein: "4g",
          time: "4:30 PM",
        },
      ],
      dinner: [
        {
          name: "1 Roti + Palak paneer + Salad",
          calories: 380,
          protein: "18g",
          time: "7:30 PM",
        },
        {
          name: "Grilled fish + Vegetables",
          calories: 350,
          protein: "28g",
          time: "7:30 PM",
        },
        {
          name: "Dal khichdi + Curd",
          calories: 400,
          protein: "16g",
          time: "7:30 PM",
        },
      ],
    },
  },
  "muscle-gain": {
    title: "Muscle Gain Plan",
    subtitle: "2500-3000 calories per day",
    description:
      "High-protein Indian meals to fuel muscle growth and recovery.",
    meals: {
      breakfast: [
        {
          name: "4 Egg whites + 2 Paratha + Curd",
          calories: 550,
          protein: "32g",
          time: "7:00 AM",
        },
        {
          name: "Paneer bhurji + 3 Roti",
          calories: 600,
          protein: "35g",
          time: "7:00 AM",
        },
        {
          name: "Chicken keema + 2 Bread",
          calories: 520,
          protein: "38g",
          time: "7:00 AM",
        },
      ],
      midMorning: [
        {
          name: "Protein shake + Banana",
          calories: 300,
          protein: "25g",
          time: "10:00 AM",
        },
        {
          name: "Paneer sandwich",
          calories: 350,
          protein: "20g",
          time: "10:00 AM",
        },
      ],
      lunch: [
        {
          name: "3 Roti + Chicken curry + Rice + Dal",
          calories: 750,
          protein: "45g",
          time: "1:00 PM",
        },
        {
          name: "Rice + Egg curry + Sabzi + Curd",
          calories: 700,
          protein: "35g",
          time: "1:00 PM",
        },
        {
          name: "Chole + Rice + Paneer + Salad",
          calories: 680,
          protein: "32g",
          time: "1:00 PM",
        },
      ],
      evening: [
        {
          name: "Peanut butter toast + Milk",
          calories: 350,
          protein: "15g",
          time: "4:30 PM",
        },
        {
          name: "Egg sandwich + Lassi",
          calories: 400,
          protein: "22g",
          time: "4:30 PM",
        },
      ],
      dinner: [
        {
          name: "Grilled chicken + 2 Roti + Salad",
          calories: 550,
          protein: "45g",
          time: "8:00 PM",
        },
        {
          name: "Fish curry + Rice + Dal",
          calories: 600,
          protein: "40g",
          time: "8:00 PM",
        },
        {
          name: "Soya chunks + Roti + Paneer",
          calories: 580,
          protein: "38g",
          time: "8:00 PM",
        },
      ],
    },
  },
  maintenance: {
    title: "Maintenance Plan",
    subtitle: "2000-2200 calories per day",
    description:
      "Balanced nutrition to maintain your current weight while staying healthy.",
    meals: {
      breakfast: [
        {
          name: "Idli (4) + Sambar + Chutney",
          calories: 350,
          protein: "12g",
          time: "8:00 AM",
        },
        {
          name: "Aloo paratha + Curd",
          calories: 400,
          protein: "10g",
          time: "8:00 AM",
        },
        {
          name: "Dosa (2) + Sambar",
          calories: 380,
          protein: "11g",
          time: "8:00 AM",
        },
      ],
      midMorning: [
        {
          name: "Mixed fruit bowl",
          calories: 120,
          protein: "2g",
          time: "11:00 AM",
        },
        {
          name: "Coconut water + Biscuits",
          calories: 150,
          protein: "3g",
          time: "11:00 AM",
        },
      ],
      lunch: [
        {
          name: "2 Roti + Sabzi + Dal + Rice + Salad",
          calories: 550,
          protein: "18g",
          time: "1:00 PM",
        },
        {
          name: "Veg biryani + Raita + Salad",
          calories: 580,
          protein: "14g",
          time: "1:00 PM",
        },
        {
          name: "Thali: Roti, Rice, Dal, 2 Sabzi, Curd",
          calories: 600,
          protein: "20g",
          time: "1:00 PM",
        },
      ],
      evening: [
        {
          name: "Samosa (1) + Tea",
          calories: 200,
          protein: "4g",
          time: "5:00 PM",
        },
        { name: "Bhel puri", calories: 180, protein: "5g", time: "5:00 PM" },
      ],
      dinner: [
        {
          name: "2 Roti + Mixed veg + Dal",
          calories: 420,
          protein: "15g",
          time: "8:00 PM",
        },
        {
          name: "Khichdi + Kadhi + Papad",
          calories: 450,
          protein: "14g",
          time: "8:00 PM",
        },
        {
          name: "Chapati + Matar paneer",
          calories: 480,
          protein: "18g",
          time: "8:00 PM",
        },
      ],
    },
  },
  vegetarian: {
    title: "Pure Vegetarian Plan",
    subtitle: "High-protein plant-based diet",
    description:
      "Protein-rich vegetarian meals for optimal health without meat or eggs.",
    meals: {
      breakfast: [
        {
          name: "Besan chilla + Green chutney",
          calories: 280,
          protein: "14g",
          time: "7:30 AM",
        },
        {
          name: "Sattu paratha + Curd",
          calories: 350,
          protein: "16g",
          time: "7:30 AM",
        },
        {
          name: "Paneer stuffed roti + Milk",
          calories: 400,
          protein: "20g",
          time: "7:30 AM",
        },
      ],
      midMorning: [
        {
          name: "Soy milk + Mixed nuts",
          calories: 200,
          protein: "12g",
          time: "10:30 AM",
        },
        {
          name: "Roasted chana + Fruit",
          calories: 180,
          protein: "10g",
          time: "10:30 AM",
        },
      ],
      lunch: [
        {
          name: "Rajma + Rice + Paneer sabzi + Salad",
          calories: 580,
          protein: "28g",
          time: "1:00 PM",
        },
        {
          name: "Chole + Bhature (2) + Lassi",
          calories: 650,
          protein: "24g",
          time: "1:00 PM",
        },
        {
          name: "Dal makhani + Jeera rice + Raita",
          calories: 550,
          protein: "22g",
          time: "1:00 PM",
        },
      ],
      evening: [
        {
          name: "Paneer tikka (5 pcs)",
          calories: 250,
          protein: "18g",
          time: "5:00 PM",
        },
        {
          name: "Dhokla (4 pcs) + Chutney",
          calories: 200,
          protein: "8g",
          time: "5:00 PM",
        },
      ],
      dinner: [
        {
          name: "Tofu bhurji + 2 Roti + Salad",
          calories: 420,
          protein: "24g",
          time: "7:30 PM",
        },
        {
          name: "Soya chunks curry + Roti + Dal",
          calories: 480,
          protein: "32g",
          time: "7:30 PM",
        },
        {
          name: "Palak paneer + Roti + Raita",
          calories: 450,
          protein: "22g",
          time: "7:30 PM",
        },
      ],
    },
  },
};

const weeklyPlan = [
  { day: "Monday", theme: "North Indian", highlight: "Rajma Chawal Day" },
  { day: "Tuesday", theme: "South Indian", highlight: "Dosa & Sambar" },
  { day: "Wednesday", theme: "Gujarati", highlight: "Dhokla & Thepla" },
  { day: "Thursday", theme: "Bengali", highlight: "Fish Curry Day" },
  { day: "Friday", theme: "Punjabi", highlight: "Chole Bhature" },
  { day: "Saturday", theme: "Maharashtrian", highlight: "Vada Pav & Misal" },
  { day: "Sunday", theme: "Special", highlight: "Biryani Day" },
];

export default function DietPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<DietCategory>("weight-loss");
  const currentPlan = dietPlans[selectedPlan];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className={title({ size: "lg" })}>Indian </h1>
        <h1 className={title({ size: "lg", color: "yellow" })}>Diet Plans</h1>
        <p className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}>
          Nutritious meal plans featuring your favorite Indian foods. No more
          bland Western diets - eat what you love while achieving your goals.
        </p>
      </section>

      {/* Plan Selector */}
      <section className="py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {(Object.keys(dietPlans) as DietCategory[]).map((planKey) => (
            <Button
              key={planKey}
              className={
                selectedPlan === planKey ? "bg-success text-white" : ""
              }
              radius="full"
              variant={selectedPlan === planKey ? "solid" : "bordered"}
              onPress={() => setSelectedPlan(planKey)}
            >
              {dietPlans[planKey].title}
            </Button>
          ))}
        </div>
      </section>

      {/* Selected Plan Details */}
      <section className="py-8">
        <div className="bg-gradient-to-r from-warning/10 to-success/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className={title({ size: "sm" })}>{currentPlan.title}</h2>
            <p className="text-success font-semibold mt-2">
              {currentPlan.subtitle}
            </p>
            <p className="text-default-600 mt-2 max-w-xl mx-auto">
              {currentPlan.description}
            </p>
          </div>

          {/* Meals Grid */}
          <div className="space-y-6">
            {/* Breakfast */}
            <div className="bg-white dark:bg-default-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌅</span> Breakfast Options
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {currentPlan.meals.breakfast.map((meal, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-xl">
                    <p className="font-medium">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-default-500">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein} protein</span>
                    </div>
                    <p className="text-xs text-success mt-1">{meal.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid Morning */}
            <div className="bg-white dark:bg-default-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🍎</span> Mid-Morning Snack
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {currentPlan.meals.midMorning.map((meal, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-xl">
                    <p className="font-medium">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-default-500">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein} protein</span>
                    </div>
                    <p className="text-xs text-success mt-1">{meal.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-white dark:bg-default-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🍛</span> Lunch Options
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {currentPlan.meals.lunch.map((meal, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-xl">
                    <p className="font-medium">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-default-500">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein} protein</span>
                    </div>
                    <p className="text-xs text-success mt-1">{meal.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Snack */}
            <div className="bg-white dark:bg-default-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🫖</span> Evening Snack
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {currentPlan.meals.evening.map((meal, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-xl">
                    <p className="font-medium">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-default-500">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein} protein</span>
                    </div>
                    <p className="text-xs text-success mt-1">{meal.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-white dark:bg-default-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌙</span> Dinner Options
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {currentPlan.meals.dinner.map((meal, index) => (
                  <div key={index} className="p-4 bg-default-50 rounded-xl">
                    <p className="font-medium">{meal.name}</p>
                    <div className="flex gap-4 mt-2 text-sm text-default-500">
                      <span>{meal.calories} cal</span>
                      <span>{meal.protein} protein</span>
                    </div>
                    <p className="text-xs text-success mt-1">{meal.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Regional Plan */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Weekly </h2>
          <h2 className={title({ size: "sm", color: "violet" })}>
            Regional Variety
          </h2>
          <p className="text-default-500 mt-4 max-w-xl mx-auto">
            Experience the diversity of Indian cuisine with our rotating
            regional menu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weeklyPlan.map((day) => (
            <div
              key={day.day}
              className="p-4 rounded-xl bg-default-50 border border-default-200 text-center"
            >
              <p className="font-semibold text-success">{day.day}</p>
              <p className="text-sm text-default-600 mt-1">{day.theme}</p>
              <p className="text-xs text-default-400 mt-2">{day.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-r from-success/5 to-warning/5 rounded-3xl px-8">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Diet Plan </h2>
          <h2 className={title({ size: "sm", color: "green" })}>Benefits</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Calorie Counted",
              desc: "Every meal is precisely calculated",
            },
            { title: "Macro Balanced", desc: "Optimal protein, carbs & fats" },
            { title: "Budget Friendly", desc: "Affordable local ingredients" },
            {
              title: "Easy to Follow",
              desc: "Simple recipes with common items",
            },
          ].map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="text-success" size={24} />
              </div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="text-sm text-default-500 mt-1">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className={title({ size: "sm" })}>Get Your </h2>
        <h2 className={title({ size: "sm", color: "green" })}>
          Personalized Plan
        </h2>
        <p className="text-default-600 mt-4 mb-8 max-w-xl mx-auto">
          These are sample plans. Get a diet customized to your exact needs,
          preferences, and goals.
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
          Create My Custom Plan
        </NextLink>
      </section>
    </DefaultLayout>
  );
}
