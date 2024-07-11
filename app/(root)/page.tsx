"use client"

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
    <main>
      <section className="h-1/3">
        <Hero />
      </section>
      <section className="h-1/4">
      <MacbookScroll/>
      </section>
      <section className={styles["about-testimonials-wrapper"]}>
        <About />
        <Testimonials />
      </section>
      <section>
        <Pricing />
      </section>
      <section>
        <GlobeDemo/>
      </section>
    </main>
  );
}
