"use client";
import { Hero2 } from "@/components/features/home/Hero2";
import { Pricing } from "@/components/features/home/Pricing";

import About from "@/components/features/home/About";
import Testimonials from "@/components/features/home/Testimonials";

import ReactPlayer from "react-player/lazy";

export default function HomePage() {
  return (
    <main>
      <section className="h-1/3">
        <Hero2 />
      </section>
      <section
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),url(/assets/images/tiangle.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",

          clipPath: "polygon(100% 0, 100% 91%, 49% 100%, 0 89%, 0 0)",
        }}
      >
        <About />
        <Testimonials />
      </section>
      <section>
        <Pricing />
      </section>
    </main>
  );
}
