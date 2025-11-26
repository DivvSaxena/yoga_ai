import { Link } from "@heroui/link";
import NextLink from "next/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { TwitterIcon, InstagramIcon } from "@/components/icons";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8 pb-16">
        {children}
      </main>
      <footer className="w-full bg-default-50 border-t border-default-200">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <NextLink className="flex items-center gap-2 mb-4" href="/">
                <span className="font-bold text-xl">
                  Yoga<span className="text-success">AI</span>
                </span>
              </NextLink>
              <p className="text-sm text-default-500 mb-4">
                AI-powered fitness companion for Indian lifestyles.
              </p>
              <div className="flex gap-4">
                <NextLink href="/connect">
                  <TwitterIcon className="text-default-500 hover:text-success transition-colors" />
                </NextLink>
                <NextLink href="/connect">
                  <InstagramIcon className="text-default-500 hover:text-success transition-colors" />
                </NextLink>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/"
                  >
                    Home
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/features"
                  >
                    Features
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/ai-planner"
                  >
                    AI Planner
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/about"
                  >
                    About Us
                  </NextLink>
                </li>
              </ul>
            </div>

            {/* Plans */}
            <div>
              <h4 className="font-semibold mb-4">Plans</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/diet-plans"
                  >
                    Diet Plans
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/fitness-plans"
                  >
                    Fitness Plans
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/diet-plans"
                  >
                    Weight Loss
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="text-default-500 hover:text-success transition-colors"
                    href="/fitness-plans"
                  >
                    Yoga & Pranayama
                  </NextLink>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-default-500">
                <li>hello@divvsaxena.com</li>
                <li>Delhi, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-default-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-default-500">
              © 2024 YogaAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-default-500">
              <Link className="hover:text-success transition-colors" href="#">
                Privacy Policy
              </Link>
              <Link className="hover:text-success transition-colors" href="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
