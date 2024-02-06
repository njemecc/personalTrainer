import { Hero2 } from "@/components/features/home/Hero2";
import { Pricing } from "@/components/features/home/Pricing";

import About from "@/components/features/home/About";
import Testimonials from "@/components/features/home/Testimonials";

export default function HomePage() {
  return (
    <main>
      <section className="h-screen">
        <Hero2 />
      </section>
      <section>
        <section>
          <Testimonials />
        </section>
        <About />
      </section>
      <section>
        <Pricing />
      </section>
    </main>
  );
}
