import { pricingCardContent } from "@/constants";

type PricingCardProps = {
  duration: string;
  price: string;
};

const PricingCard = ({ duration, price }: PricingCardProps) => {
  return (
    <div className=" w-full flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border-2  rounded shadow-sm sm:items-center hover:shadow">
      <div className="text-center">
        <div className="text-lg font-semibold">{duration}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="mr-1 text-5xl font-bold">{price}</div>
        </div>
        <div className="mt-2 space-y-3">
          {pricingCardContent.map((content) => (
            <div className="text-gray-700">{content.text}</div>
          ))}
        </div>
      </div>
      <div>
        <a
          href="/"
          className=" md:w-[16rem] inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gold rounded shadow-md hover:opacity-90 focus:shadow-outline focus:outline-none"
        >
          Započni
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
