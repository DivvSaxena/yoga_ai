import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import {
  YogaIcon,
  DietIcon,
  FitnessIcon,
  AIIcon,
  HeartPulseIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";

const features = [
  {
    icon: AIIcon,
    title: "AI-Powered Plans",
    description:
      "Get personalized diet and workout recommendations powered by advanced AI that understands your unique body and goals.",
  },
  {
    icon: DietIcon,
    title: "Indian Diet Focus",
    description:
      "Meal plans featuring dal, roti, rice, sabzi, and more - nutrition that fits your kitchen and cultural preferences.",
  },
  {
    icon: FitnessIcon,
    title: "Custom Workouts",
    description:
      "From yoga asanas to strength training, get exercise routines tailored to your fitness level and available equipment.",
  },
  {
    icon: HeartPulseIcon,
    title: "Health Tracking",
    description:
      "Monitor your progress with intuitive dashboards tracking weight, measurements, and fitness milestones.",
  },
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "50+", label: "Diet Plans" },
  { value: "100+", label: "Workout Routines" },
  { value: "95%", label: "Satisfaction Rate" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "YogaAI helped me lose 12kg in 4 months with a diet plan that actually included foods I love. No more bland salads!",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "As a vegetarian, finding protein-rich meal plans was always hard. YogaAI gave me perfect paneer and dal-based nutrition.",
    avatar: "RV",
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    text: "The yoga routines are perfect for my busy schedule. 20 minutes in the morning and I feel energized all day!",
    avatar: "AD",
  },
];

const dietHighlights = [
  "Vegetarian & Non-vegetarian options",
  "Regional cuisine variations (North, South, East, West)",
  "Calorie-counted Indian meals",
  "Festival & fasting day alternatives",
  "Budget-friendly ingredient lists",
];

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-16">
        <div className="inline-block max-w-3xl text-center justify-center">
          <span className={title({ size: "lg" })}>Transform Your Health</span>
          <br />
          <span className={title({ color: "green", size: "lg" })}>
            The Indian Way&nbsp;
          </span>
          <div className={subtitle({ class: "mt-6" })}>
            AI-powered personalized diet and fitness plans designed for Indian
            lifestyles. Eat what you love, achieve your goals.
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <NextLink
            className={buttonStyles({
              color: "success",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href="/ai-planner"
          >
            Get Your Free Plan
            <ArrowRightIcon size={20} />
          </NextLink>
          <NextLink
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href="/features"
          >
            Learn More
          </NextLink>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-4xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success">
                {stat.value}
              </div>
              <div className="text-default-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Why Choose </h2>
          <h2 className={title({ size: "sm", color: "green" })}>YogaAI?</h2>
          <p className="text-default-500 mt-4 max-w-2xl mx-auto">
            We combine ancient Indian wellness wisdom with modern AI technology
            to create the perfect health companion for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-default-50 border border-default-200 hover:border-success transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <feature.icon className="text-success" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-default-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Indian Diet Section */}
      <section className="py-16 bg-gradient-to-r from-success/5 to-warning/5 rounded-3xl px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={title({ size: "sm" })}>Diet Plans That </h2>
            <h2 className={title({ size: "sm", color: "yellow" })}>
              Feel Like Home
            </h2>
            <p className="text-default-600 mt-4 mb-6">
              No more forcing yourself to eat quinoa and kale. Our AI creates
              nutritious meal plans using ingredients from your local sabzi
              mandi.
            </p>
            <ul className="space-y-3">
              {dietHighlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon className="text-success" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <NextLink
              className={buttonStyles({
                color: "warning",
                radius: "full",
                variant: "shadow",
                class: "mt-8",
              })}
              href="/diet-plans"
            >
              Explore Diet Plans
            </NextLink>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-default-100 p-4 rounded-xl shadow-lg">
              <div className="text-2xl mb-2">🍛</div>
              <h4 className="font-semibold">Dal Chawal</h4>
              <p className="text-xs text-default-500">350 cal | High Protein</p>
            </div>
            <div className="bg-white dark:bg-default-100 p-4 rounded-xl shadow-lg mt-8">
              <div className="text-2xl mb-2">🥗</div>
              <h4 className="font-semibold">Sprouts Salad</h4>
              <p className="text-xs text-default-500">180 cal | Fiber Rich</p>
            </div>
            <div className="bg-white dark:bg-default-100 p-4 rounded-xl shadow-lg">
              <div className="text-2xl mb-2">🫓</div>
              <h4 className="font-semibold">Roti Sabzi</h4>
              <p className="text-xs text-default-500">280 cal | Balanced</p>
            </div>
            <div className="bg-white dark:bg-default-100 p-4 rounded-xl shadow-lg mt-8">
              <div className="text-2xl mb-2">🥛</div>
              <h4 className="font-semibold">Lassi</h4>
              <p className="text-xs text-default-500">150 cal | Probiotics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Yoga & Fitness Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>From </h2>
          <h2 className={title({ size: "sm", color: "violet" })}>
            Surya Namaskar{" "}
          </h2>
          <h2 className={title({ size: "sm" })}>to </h2>
          <h2 className={title({ size: "sm", color: "blue" })}>HIIT</h2>
          <p className="text-default-500 mt-4 max-w-2xl mx-auto">
            Whether you prefer traditional yoga or modern workouts, we have
            routines that fit your lifestyle and space.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-default-200 text-center">
            <YogaIcon className="mx-auto text-violet-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Yoga & Pranayama</h3>
            <p className="text-default-500 text-sm mb-4">
              Ancient practices for flexibility, strength, and mental peace.
            </p>
            <p className="text-success font-semibold">30+ Asanas</p>
          </div>
          <div className="p-6 rounded-xl border border-default-200 text-center bg-gradient-to-b from-success/5 to-transparent">
            <FitnessIcon className="mx-auto text-success mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Strength Training</h3>
            <p className="text-default-500 text-sm mb-4">
              Build muscle with home or gym workouts customized for you.
            </p>
            <p className="text-success font-semibold">50+ Exercises</p>
          </div>
          <div className="p-6 rounded-xl border border-default-200 text-center">
            <HeartPulseIcon className="mx-auto text-danger mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Cardio & HIIT</h3>
            <p className="text-default-500 text-sm mb-4">
              Burn calories fast with high-intensity interval training.
            </p>
            <p className="text-success font-semibold">20+ Routines</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <NextLink
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/fitness-plans"
          >
            View All Workouts
          </NextLink>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Real Results from </h2>
          <h2 className={title({ size: "sm", color: "green" })}>Real People</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl bg-default-50 border border-default-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-default-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
              <p className="text-default-600 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-success/10 via-primary/10 to-warning/10 rounded-3xl px-8">
        <h2 className={title({ size: "sm" })}>Ready to Start Your </h2>
        <h2 className={title({ size: "sm", color: "green" })}>
          Fitness Journey?
        </h2>
        <p className="text-default-600 mt-4 mb-8 max-w-xl mx-auto">
          Get your personalized AI-generated diet and workout plan in under 2
          minutes. Completely free!
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
          Generate My Plan Now
          <ArrowRightIcon size={20} />
        </NextLink>
      </section>
    </DefaultLayout>
  );
}
