import { button as buttonStyles } from "@heroui/theme";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { TwitterIcon, InstagramIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function ConnectPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center py-8 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Social Icons */}
          <div className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <TwitterIcon className="text-white" size={32} />
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center shadow-lg">
              <InstagramIcon className="text-white" size={32} />
            </div>
          </div>

          {/* Heading */}
          <h1 className={title({ size: "lg" })}>We&apos;re Not </h1>
          <h1 className={title({ size: "lg", color: "green" })}>
            Social Yet!
          </h1>

          <p className={subtitle({ class: "mt-6 max-w-xl mx-auto" })}>
            YogaAI doesn&apos;t have a social media presence right now.
          </p>

          {/* Message */}
          <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl p-4 sm:p-8 mt-6 sm:mt-8">
            <p className="text-default-600 leading-relaxed text-base sm:text-lg">
              We&apos;re a small team focused on building an amazing product
              first.
            </p>
            <p className="text-default-600 leading-relaxed mt-3 sm:mt-4 text-base sm:text-lg">
              But if you&apos;d like to{" "}
              <span className="text-success font-semibold">
                back us or explore synergies
              </span>
              , we&apos;d love to connect!
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-10">
            <p className="text-default-500 mb-4">
              Get in touch with us directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                className={buttonStyles({
                  color: "success",
                  radius: "full",
                  variant: "shadow",
                  size: "lg",
                })}
                href="mailto:hello@divvsaxena.com"
              >
                hello@divvsaxena.com
              </a>
              <NextLink
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                  size: "lg",
                })}
                href="/about"
              >
                Meet the Team
              </NextLink>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
