import PricingCard from "./PricingCard";

export const Pricing = () => {
  return (
    <div className="m-auto w-4/5 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-gold uppercase rounded-full bg-teal-accent-400">
            Naši trening planovi
          </p>
        </div>
        <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative">Izaberite</span>
          </span>{" "}
          plan koji vama najviše odgovara.
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Sve uplate se izvršavaju putem uplatnice.
        </p>
      </div>
      <div className="grid   max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        <PricingCard duration="1 mesec" price="7.990" />
        <PricingCard duration="3 meseca" price="20.990" />
        <PricingCard duration="6 meseci" price="39.990" />
      </div>
    </div>
  );
};
