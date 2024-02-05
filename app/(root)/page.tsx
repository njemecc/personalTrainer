import { Hero } from "@/components/ui/Hero";
import { Hero2 } from "@/components/features/home/Hero2";
import { Pricing } from "@/components/features/home/Pricing";

export default function HomePage() {
  return (
    <main>
      <section className="h-screen">
        <Hero2 />
        <Pricing />
      </section>
    </main>
  );
}
