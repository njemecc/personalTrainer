import { pricingCardContent } from "@/constants";
import Link from "next/link";

type PricingCardProps = {
  duration: string;
  price: string;
};

const PricingCard = ({ duration, price }: PricingCardProps) => {
  return (
    <div className="group w-full flex flex-col justify-between p-8 transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg sm:items-center hover:shadow-2xl hover:scale-105 hover:border-gold">
      <div className="text-center">
        <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
          {duration}
        </div>
        <div className="flex items-center justify-center mt-4 mb-6">
          <span className="text-gray-600 text-2xl lg:text-3xl mr-1">€</span>
          <div className="text-5xl lg:text-6xl font-bold text-gold">
            {new Intl.NumberFormat('de-DE', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(Number(price))}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {pricingCardContent.map((content, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-gray-700 text-left"
            >
              <span className="text-gold text-xl flex-shrink-0 mt-0.5">✓</span>
              <span className="text-base lg:text-lg">{content.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Link
          href="/survey"
          className="group/btn md:w-[16rem] inline-flex items-center justify-center w-full h-14 px-6 font-semibold tracking-wide text-white transition-all duration-300 bg-gold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        >
          <span>Započni</span>
          <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
