"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { testimonials } from "@/constants";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const Testimonials = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-4/5 lg:w-3/5 flex-col xl:flex-row lg:mt-20 flex m-auto justify-around items-center gap-12 lg:gap-16 py-12 lg:py-16">
      <div className="text-justify tracking-tighter text-white w-full lg:w-2/4">
        <Reveal>
          <p className="w-full p-regular-16 md:p-regular-22 mb-6 text-lg lg:text-xl leading-relaxed drop-shadow-lg">
            Sertifikovani personalni trener sa iskustvom u radu sa različitim
            profilima vežbača. Fokus je na individualnom pristupu, prilagođenom
            svakom klijentu prema njegovim ciljevima i mogućnostima. Do sada je
            kroz treninge prošlo preko 100 ljudi koji su postigli vidljive i
            dugoročne rezultate – bilo da je reč o jačanju tela, poboljšanju
            kondicije ili gubitku viška kilograma.
          </p>
        </Reveal>
        <Reveal>
          <p className="p-regular-16 md:p-regular-22 mb-6 text-lg lg:text-xl leading-relaxed drop-shadow-lg">
            Treninzi su zasnovani na funkcionalnim vežbama, kombinaciji snage i
            mobilnosti, uz naglasak na postepeni napredak i održivost rezultata.
            Cilj je pronaći balans između efikasnog vežbanja i svakodnevnog
            života, bez ekstremnih metoda i kratkotrajnih rešenja.
          </p>
        </Reveal>
        <Reveal>
          <>
            <p className="p-regular-16 md:p-regular-22 mb-6 text-lg lg:text-xl leading-relaxed drop-shadow-lg">
              Nije važno odakle počinjete – važno je gde želite da stignete.
              Zajedno ćemo pomeriti granice i ostvariti vaše ciljeve!
            </p>
            <p className="text-center mt-12 lg:mt-6 lg:text-left mb-2 p-bold-20 md:p-bold-24 text-gold font-bold text-2xl lg:text-3xl drop-shadow-lg">
              Kontaktirajte me danas{" "}
              <span className="text-white">
                i napravite prvi korak ka boljem sebi!
              </span>
            </p>
          </>
        </Reveal>
      </div>

      <div className="mt-2 flex flex-col justify-around items-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
        <h1 className="h3-bold text-white mt-10 md:mt-5 lg:mt-10 mb-8 text-3xl lg:text-4xl font-bold drop-shadow-lg">
          Zadovoljni <span className="text-gold">Klijenti</span>
        </h1>
        <Carousel
          plugins={[plugin.current]}
          className="w-[250px] md:w-[330px] max-w-xs my-auto border-2 border-gold rounded-lg shadow-2xl mt-10 md:mt-10 overflow-hidden"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="relative h-[500px] md:h-[650px]"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    fill
                    className="object-contain w-full h-full rounded"
                    src={`/assets/testimonials/${testimonial.name}`}
                    alt={testimonial.name}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
