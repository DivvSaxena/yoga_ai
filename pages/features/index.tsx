import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import {
  YogaIcon,
  DietIcon,
  FitnessIcon,
  AIIcon,
  CheckIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";

const mainFeatures = [
  {
    icon: AIIcon,
    title: "AI-Powered Personalization",
    description:
      "Our advanced AI analyzes your body type, goals, dietary preferences, and lifestyle to create truly personalized plans.",
    highlights: [
      "Learns from your feedback",
      "Adapts plans as you progress",
      "Considers medical conditions",
      "Accounts for allergies & restrictions",
    ],
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    gradientBg: "bg-gradient-to-br from-primary/10 to-primary/5",
  },
  {
    icon: DietIcon,
    title: "Indian-First Nutrition",
    description:
      "Meal plans that feature foods you actually eat - from rajma chawal to idli sambar, calculated for optimal nutrition.",
    highlights: [
      "8 regional cuisines supported",
      "Calorie & macro tracking",
      "Seasonal ingredient suggestions",
      "Budget-friendly options",
    ],
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    gradientBg: "bg-gradient-to-br from-warning/10 to-warning/5",
  },
  {
    icon: YogaIcon,
    title: "Traditional Yoga Integration",
    description:
      "Ancient yoga wisdom meets modern fitness science. Practice asanas with guided instructions and breathing techniques.",
    highlights: [
      "30+ yoga asanas library",
      "Pranayama breathing exercises",
      "Meditation guidance",
      "Video demonstrations",
    ],
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    gradientBg: "bg-gradient-to-br from-secondary/10 to-secondary/5",
  },
  {
    icon: FitnessIcon,
    title: "Flexible Workout Plans",
    description:
      "Whether you have a full gym or just a yoga mat at home, we create workouts that fit your space and equipment.",
    highlights: [
      "Home & gym workouts",
      "No equipment options",
      "Progressive difficulty",
      "Time-based routines",
    ],
    iconBg: "bg-success/10",
    iconColor: "text-success",
    gradientBg: "bg-gradient-to-br from-success/10 to-success/5",
  },
];

const additionalFeatures = [
  {
    title: "Progress Tracking",
    description:
      "Visual dashboards showing your weight, measurements, and fitness improvements over time.",
  },
  {
    title: "Grocery Lists",
    description:
      "Auto-generated shopping lists based on your weekly meal plan with estimated costs.",
  },
  {
    title: "Recipe Library",
    description:
      "Step-by-step cooking instructions for all recommended meals with nutritional info.",
  },
  {
    title: "Workout Timer",
    description:
      "Built-in timer for exercises, rest periods, and HIIT intervals.",
  },
  {
    title: "Water Reminders",
    description:
      "Stay hydrated with customizable water intake reminders throughout the day.",
  },
  {
    title: "Community Support",
    description:
      "Connect with others on similar fitness journeys for motivation and tips.",
  },
];

const comparisonData = [
  { feature: "Indian Diet Plans", yogaai: true, others: false },
  { feature: "AI Personalization", yogaai: true, others: "Limited" },
  { feature: "Yoga & Pranayama", yogaai: true, others: false },
  { feature: "Regional Cuisines", yogaai: "8 Regions", others: false },
  { feature: "Vegetarian Focus", yogaai: true, others: "Limited" },
  { feature: "Budget Meal Plans", yogaai: true, others: false },
  { feature: "Home Workouts", yogaai: true, others: true },
  { feature: "Free Plan Available", yogaai: true, others: "Trial Only" },
];

export default function FeaturesPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className={title({ size: "lg" })}>Powerful </h1>
        <h1 className={title({ size: "lg", color: "green" })}>Features</h1>
        <p className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}>
          Everything you need to transform your health, designed specifically
          for Indian lifestyles.
        </p>
      </section>

      {/* Main Features */}
      <section className="py-12">
        <div className="space-y-16">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center`}
                  >
                    <feature.icon className={feature.iconColor} size={28} />
                  </div>
                  <h2 className={title({ size: "sm" })}>{feature.title}</h2>
                </div>
                <p className="text-default-600 mb-6 text-lg">
                  {feature.description}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {feature.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckIcon className="text-success" size={18} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`${feature.gradientBg} rounded-3xl p-8 h-64 flex items-center justify-center ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <feature.icon className="text-default-300" size={120} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-gradient-to-r from-success/5 to-primary/5 rounded-3xl px-8">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>And </h2>
          <h2 className={title({ size: "sm", color: "blue" })}>Much More...</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white dark:bg-default-100 rounded-xl"
            >
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-default-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Why YogaAI </h2>
          <h2 className={title({ size: "sm", color: "green" })}>Stands Out</h2>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-default-200">
                <th className="text-left py-4 px-4">Feature</th>
                <th className="text-center py-4 px-4 bg-success/10 rounded-t-xl">
                  <span className="text-success font-bold">YogaAI</span>
                </th>
                <th className="text-center py-4 px-4">Other Apps</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.feature}
                  className={
                    index < comparisonData.length - 1
                      ? "border-b border-default-100"
                      : ""
                  }
                >
                  <td className="py-4 px-4">{row.feature}</td>
                  <td className="text-center py-4 px-4 bg-success/5">
                    {row.yogaai === true ? (
                      <CheckIcon className="text-success mx-auto" size={20} />
                    ) : (
                      <span className="text-success font-semibold">
                        {row.yogaai}
                      </span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {row.others === true ? (
                      <CheckIcon
                        className="text-default-400 mx-auto"
                        size={20}
                      />
                    ) : row.others === false ? (
                      <span className="text-default-300">-</span>
                    ) : (
                      <span className="text-default-500">{row.others}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-success/10 via-primary/10 to-warning/10 rounded-3xl px-8">
        <h2 className={title({ size: "sm" })}>Experience All Features </h2>
        <h2 className={title({ size: "sm", color: "green" })}>Free</h2>
        <p className="text-default-600 mt-4 mb-8 max-w-xl mx-auto">
          Start with our free AI-generated plan and see the difference for
          yourself.
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
          Get Started Now
        </NextLink>
      </section>
    </DefaultLayout>
  );
}
