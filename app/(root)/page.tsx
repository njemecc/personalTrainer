//styles
import styles from "./RootPage.module.css";

import { Hero } from "@/components/features/home/hero/Hero";
import { Pricing } from "@/components/features/home/pricing/Pricing";

import About from "@/components/features/home/about/About";
import Testimonials from "@/components/features/home/testimonials/Testimonials";
import { MacbookScroll } from "@/components/ui/macbookscrool";
import { Globe } from "@/components/ui/globe";

export default function HomePage() {

  const sampleData = [
    {
      order: 1,
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: "#ff5733",
    },
    // Add more data as needed
  ];
  
  const globeConfig = {
    pointSize: 2,
    globeColor: "#000000",
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
  };


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
        <Globe globeConfig={globeConfig} data={sampleData}/>
      </section>
    </main>
  );
}
