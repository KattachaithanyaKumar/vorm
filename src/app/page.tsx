"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Blocks,
  Download,
  GitBranch,
  LayoutGrid,
  Palette,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/text-reveal";
import { AnimateOnEnter } from "@/components/animate-on-enter";
import { AuthModal } from "@/components/auth-modal";

const FEATURES = [
  { icon: Blocks, label: "No-code builder" },
  { icon: Shield, label: "Secure by default" },
  { icon: Zap, label: "Instant publish" },
  { icon: RefreshCw, label: "Realtime responses" },
  { icon: Download, label: "Export anywhere" },
];

const CAPTURE_FEATURES = [
  {
    icon: LayoutGrid,
    title: "Drag & drop",
    description:
      "Intuitively assemble complex forms in seconds without writing a single line of code.",
  },
  {
    icon: GitBranch,
    title: "Conditional logic",
    description:
      "Create personalized surveys by showing or hiding fields based on previous answers.",
  },
  {
    icon: Palette,
    title: "Custom branding",
    description:
      "Make every form feel native to your brand with custom colors, fonts, and logic.",
  },
  {
    icon: BarChart3,
    title: "Instant analytics",
    description:
      "Monitor completion rates, drop-off, and responses in real-time dashboards.",
  },
];

const STEPS = [
  {
    title: "Build",
    description:
      "Select a template or start from scratch with our visual builder.",
  },
  {
    title: "Publish",
    description:
      "Share via link, embed on your site, or send via email campaigns.",
  },
  {
    title: "Collect",
    description:
      "Watch responses roll in and route data directly to your favorite tools.",
  },
];

const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Security",
];

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = "Vorm"
  }, []);

  return (
    <div className="">
      <nav className="border-b sticky top-0 bg-white z-50">
        <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">Vorm</h1>
          <ul>
            <li></li>
          </ul>

          <Button
            size="lg"
            className="px-6 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </nav>

      <AuthModal isOpen={isModalOpen} onToggle={setIsModalOpen} />

      {/* hero section */}
      <section className="bg-[url('/images/screen.png')] bg-cover bg-center bg-no-repeat text-white">
        <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-0 sm:px-6 sm:pt-20  lg:px-8 lg:pt-24 ">
          <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            <AnimateOnEnter className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              <TextReveal
                lines={[
                  "Build forms",
                  "Customers actually",
                  "enjoy filling out.",
                ]}
              />
            </AnimateOnEnter>
          </h1>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="w-full px-8 cursor-pointer bg-white text-black hover:bg-white/85 sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full px-8 cursor-pointer border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Learn More
            </Button>
          </div>

          <div className="mt-16 sm:mt-20">
            <Image
              src="/images/form-demo.png"
              alt="Vorm form builder demo"
              width={1284}
              height={903}
              priority
              className="mx-auto h-auto w-full rounded-t-4xl "
            />
          </div>
        </div>
      </section>

      {/* icons section */}
      <section className="bg-gray-50 py-10 ">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground sm:text-base md:text-lg">
            <AnimateOnEnter className="text-sm font-semibold tracking-widest text-muted-foreground sm:text-base md:text-lg">
              <TextReveal
                lines={["EVERYTHING YOU NEED TO BUILD, PUBLISH, AND COLLECT"]}
              />
            </AnimateOnEnter>
          </h2>

          <AnimateOnEnter className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <AnimateOnEnter
                key={label}
                className="flex flex-col items-center gap-2 text-center"
                delay={i * 100}
              >
                <li className="flex flex-col items-center gap-2 text-center">
                  <Icon
                    className="size-6 text-foreground/70"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {label}
                  </span>
                </li>
              </AnimateOnEnter>
            ))}
          </AnimateOnEnter>
        </div>
      </section>

      {/* feature cards section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <TextReveal lines={["Everything you need to capture data"]} />
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Powerful features hidden behind a beautifully simple interface.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPTURE_FEATURES.map(
              ({ icon: Icon, title, description }, index) => (
                <AnimateOnEnter
                  key={title}
                  className="card transition-shadow hover:shadow-md"
                  delay={index * 100}
                >
                  <Card
                    key={title}
                    className="transition-shadow hover:shadow-md"
                  >
                    <CardContent>
                      <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-foreground/70">
                        <Icon
                          className="size-5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimateOnEnter>
              ),
            )}
          </div>
        </div>
      </section>

      {/* how it works section */}
      <section className=" bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <TextReveal lines={["How it works"]} />
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              From idea to insights in three simple steps.
            </p>
          </div>

          <AnimateOnEnter className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, index) => (
              <AnimateOnEnter
                key={step.title}
                className="flex flex-col items-center text-center"
                delay={index * 150}
              >
                <li
                  key={step.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </AnimateOnEnter>
            ))}
          </AnimateOnEnter>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-black py-16 text-center sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <AnimateOnEnter
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              delay={300}
            >
              <TextReveal
                lines={["Ready to transform your data collection?"]}
              />
            </AnimateOnEnter>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            Join thousands of teams already building better forms with Vorm.
          </p>
          <Button
            size="lg"
            className="mt-8 w-full cursor-pointer bg-white px-8 text-black hover:bg-white/85 sm:w-auto"
          >
            Start for free today
          </Button>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-2xl font-bold">Vorm</span>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.map((link) => (
                <AnimateOnEnter
                  key={link}
                  className="flex flex-col items-center gap-2 text-center"
                  delay={400}
                >
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                </AnimateOnEnter>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t">
          <p className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 sm:text-sm lg:px-8">
            &copy; 2026 Vorm Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
