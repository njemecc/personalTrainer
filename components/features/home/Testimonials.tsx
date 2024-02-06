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

const Testimonials = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="flex flex-col  justify-around items-center h-screen">
      <h1 className="h1-bold text-gold mt-10">Zadovoljni Klijenti</h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs my-auto border-2 border-gold"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name}>
              <div className="p-1 w-[330px]">
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
  );
};

export default Testimonials;
