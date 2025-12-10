"use client";

//styles
import styles from "./RootPage.module.css";

import { Hero } from "@/components/features/home/hero/Hero";
import { Pricing } from "@/components/features/home/pricing/Pricing";

import About from "@/components/features/home/about/About";
import Testimonials from "@/components/features/home/testimonials/Testimonials";
import { MacbookScroll } from "@/components/ui/macbookscrool";

import { GlobeDemo } from "@/components/ui/demoglobe";
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="h-1/3">
        <Hero />
      </section>
      <section className="h-1/4 py-8 lg:py-16">
        <MacbookScroll />
      </section>
      <section className={styles["about-testimonials-wrapper"]}>
        <About />
        <Testimonials />
      </section>
      <section className="py-8 lg:py-16">
        <Pricing />
      </section>
      <section className="py-8 lg:py-16">
        <GlobeDemo />
      </section>
    </main>
  );
}
