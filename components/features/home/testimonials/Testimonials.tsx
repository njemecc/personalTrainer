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
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

const Testimonials = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-4/5 lg:w-3/5 flex-col xl:flex-row  lg:mt-20 flex m-auto justify-around items-center">
      <div className="text-justify tracking-tighter text-white w-full lg:w-2/4">
        <Reveal>
          <p className=" w-full p-regular-16 md:p-regular-22 mb-5">
            Taj posao je u potpunosti na meni, a tvoje je samo da se opustiš i
            uživaš na putu do postizanja svog željenog rezultata! Program je
            napravljen tako da dobijaš plan treninga i ishrane za svaki mesec.
            Ishranu i trening dobijaš u PDF formatu, s tim što vežbe pratiš
            preko svog naloga na mojoj online aplikaciji u kojoj je sve detaljno
            objašnjeno.
          </p>
        </Reveal>{" "}
        <Reveal>
          <p className="p-regular-16 md:p-regular-22 mb-5">
            Na tebi je kojim danima i u koje vreme ćeš trenirati, ali bih ti
            najviše preporučio da se pridržavaš pisanog plana jer ćes tako
            najbrže doći do željenog cilja. Takođe, tu sam za tebe u bilo koje
            doba dana ili noći ako imaš neku nedoumicu slobodno pitaj, a ja ću
            ti rado odgovoriti u najkraćem vremenskom roku.
          </p>
        </Reveal>
        <Reveal>
          <>
            <p className="p-regular-16 md:p-regular-22 mb-5">
              Pitanja mi možeš postaviti u WhatsApp grupi polaznika ili direktno
              meni u poruci.
            </p>
            <p className=" text-center mt-20 lg:mt-2 lg:text-left mb-2 p-bold-20 md:p-bold-20 text-primary ">
              Očekujem te{" "}
              <span className="text-white">
                da zajedno rušimo barijere i postižemo ciljeve!
              </span>
            </p>
          </>
        </Reveal>
      </div>

      <div className=" mt-2 flex flex-col  justify-around items-center h-screen">
        <h1 className="h3-bold text-white mt-20 md:mt-5 lg:mt-10">
          Zadovoljni <span className="text-gold">Klijenti</span>
        </h1>
        <Carousel
          plugins={[plugin.current]}
          className=" w-[250px] md:w-[330px] max-w-xs my-auto border-2 border-gold mt-10 md:mt-10"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name}>
                <div className="p-1 w-[250px] md:w-[330px]">
                  <Image
                    width={700}
                    height={800}
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
