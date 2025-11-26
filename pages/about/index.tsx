import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import {
  YogaIcon,
  HeartPulseIcon,
  AIIcon,
  CheckIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";

const teamMembers = [
  {
    name: "Divv Saxena",
    role: "Co-Founder",
    bio: "Serial entrepreneur passionate about building products that make a difference in people's lives.",
    avatar: "DS",
  },
  {
    name: "Kamakhya Narayan Kesari",
    role: "Full Stack Developer",
    bio: "Final year B.Tech AIML student. Building seamless user experiences and robust backend systems.",
    avatar: "KK",
  },
  {
    name: "Joshua KS",
    role: "AI Researcher",
    bio: "Final year B.Tech AIML student. Focused on developing intelligent algorithms for personalized fitness.",
    avatar: "JK",
  },
];

const values = [
  {
    icon: HeartPulseIcon,
    title: "Health First",
    description:
      "Every recommendation we make prioritizes your long-term health over quick fixes.",
  },
  {
    icon: YogaIcon,
    title: "Cultural Sensitivity",
    description:
      "We respect and incorporate Indian traditions, dietary preferences, and lifestyle patterns.",
  },
  {
    icon: AIIcon,
    title: "Science-Backed",
    description:
      "Our AI is trained on peer-reviewed research and validated by certified professionals.",
  },
];

const milestones = [
  {
    year: "2024",
    event: "Started as a minor project - exploring AI for personalized fitness",
  },
  {
    year: "2024",
    event: "Entered product development phase with core team formation",
  },
  {
    year: "2025",
    event: "Consulting with researchers and fitness experts for validation",
  },
  {
    year: "2025",
    event: "Preparing for public launch and end-user release",
  },
];

export default function AboutPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className={title({ size: "lg" })}>About </h1>
        <h1 className={title({ size: "lg", color: "green" })}>YogaAI</h1>
        <p className={subtitle({ class: "mt-4 max-w-2xl mx-auto" })}>
          We&apos;re on a mission to make personalized fitness and nutrition
          accessible to every Indian, respecting our rich cultural heritage
          while embracing modern science.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-gradient-to-r from-success/5 to-primary/5 rounded-3xl px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={title({ size: "sm" })}>Our </h2>
            <h2 className={title({ size: "sm", color: "violet" })}>Mission</h2>
            <p className="text-default-600 mt-4 mb-6 leading-relaxed">
              India is facing a health crisis. With rising rates of diabetes,
              obesity, and lifestyle diseases, we need solutions that work for
              our unique context - our food, our schedules, our budgets.
            </p>
            <p className="text-default-600 mb-6 leading-relaxed">
              YogaAI was born from a simple observation: most fitness apps are
              designed for Western audiences. They recommend foods we don&apos;t
              eat, exercises that don&apos;t fit our spaces, and routines that
              clash with our lifestyles.
            </p>
            <p className="text-default-600 leading-relaxed">
              We&apos;re changing that. Using AI trained specifically on Indian
              dietary patterns and fitness needs, we create plans that feel
              natural, sustainable, and effective.
            </p>
          </div>
          <div className="bg-white dark:bg-default-100 p-8 rounded-2xl shadow-lg">
            <div className="text-6xl text-center mb-6">🇮🇳</div>
            <h3 className="text-xl font-bold text-center mb-4">
              Made for India
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckIcon className="text-success" size={20} />
                <span>Supports 8 regional cuisines</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="text-success" size={20} />
                <span>Vegetarian-first approach</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="text-success" size={20} />
                <span>Budget-conscious meal plans</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="text-success" size={20} />
                <span>Home workout friendly</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckIcon className="text-success" size={20} />
                <span>Traditional yoga integration</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Our </h2>
          <h2 className={title({ size: "sm", color: "yellow" })}>Values</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl border border-default-200"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="text-success" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-default-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-violet/5 rounded-3xl px-8">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Our </h2>
          <h2 className={title({ size: "sm", color: "cyan" })}>AI Technology</h2>
          <p className="text-default-500 mt-4 max-w-2xl mx-auto">
            Powered by cutting-edge artificial intelligence to deliver
            personalized health recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-default-100 p-6 rounded-2xl">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold mb-3">
              Large Language Models (LLMs)
            </h3>
            <p className="text-default-600 text-sm leading-relaxed">
              We leverage state-of-the-art Large Language Models to understand
              your health goals, dietary preferences, and lifestyle constraints.
              Our AI processes natural language inputs to create truly
              personalized recommendations that feel human-crafted.
            </p>
          </div>

          <div className="bg-white dark:bg-default-100 p-6 rounded-2xl">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-3">
              Nutritional Intelligence
            </h3>
            <p className="text-default-600 text-sm leading-relaxed">
              Our AI is trained on extensive Indian nutritional databases,
              understanding the macro and micronutrient profiles of regional
              cuisines. It calculates optimal meal combinations based on your
              body metrics and fitness goals.
            </p>
          </div>

          <div className="bg-white dark:bg-default-100 p-6 rounded-2xl">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-3">
              Personalization Engine
            </h3>
            <p className="text-default-600 text-sm leading-relaxed">
              Using machine learning algorithms, we analyze your preferences,
              progress, and feedback to continuously refine recommendations. The
              more you use YogaAI, the better it understands your unique needs.
            </p>
          </div>

          <div className="bg-white dark:bg-default-100 p-6 rounded-2xl">
            <div className="text-3xl mb-4">🔬</div>
            <h3 className="text-lg font-semibold mb-3">Research-Backed</h3>
            <p className="text-default-600 text-sm leading-relaxed">
              We&apos;re actively collaborating with nutritionists, fitness
              researchers, and healthcare professionals to validate our AI
              models. Our recommendations are grounded in peer-reviewed science
              and expert consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Our </h2>
          <h2 className={title({ size: "sm", color: "blue" })}>Journey</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
                  {milestone.year}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-success/30 mt-2" />
                )}
              </div>
              <div className="pt-3">
                <p className="text-default-700">{milestone.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className={title({ size: "sm" })}>Meet the </h2>
          <h2 className={title({ size: "sm", color: "green" })}>Team</h2>
          <p className="text-default-500 mt-4 max-w-2xl mx-auto">
            A passionate team of technologists, health experts, and fitness
            enthusiasts united by a common goal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-6 rounded-xl bg-default-50 border border-default-200 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                {member.avatar}
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-success text-sm mb-3">{member.role}</p>
              <p className="text-default-500 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-success/10 to-warning/10 rounded-3xl px-8">
        <h2 className={title({ size: "sm" })}>Join Us in </h2>
        <h2 className={title({ size: "sm", color: "green" })}>
          Building a Healthier India
        </h2>
        <p className="text-default-600 mt-4 mb-8 max-w-xl mx-auto">
          Start your fitness journey today with a personalized plan designed
          just for you.
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
          Get Your Free Plan
        </NextLink>
      </section>
    </DefaultLayout>
  );
}
