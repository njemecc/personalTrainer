import PricingCard from "./PricingCard";

export const Pricing = () => {
  return (
    <div className="m-auto w-4/5 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-xl mb-12 md:mx-auto sm:text-center lg:max-w-2xl md:mb-16">
        <div className="mb-6">
          <p className="inline-block px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-gold shadow-lg">
            Naši trening planovi
          </p>
        </div>
        <h2 className="max-w-lg mb-6 text-4xl lg:text-5xl font-bold leading-tight tracking-tight sm:text-5xl md:mx-auto drop-shadow-lg">
          <span className="relative inline-block text-white">
            <span className="relative text-black">Izaberite</span>
          </span>{" "}
          <span className="text-gold">plan koji vama najviše odgovara.</span>
        </h2>
        <p className="text-base text-black md:text-lg lg:text-xl">
          Sve uplate se izvršavaju putem uplatnica.
        </p>
      </div>
      <div className="grid max-w-md gap-8 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 md:grid-cols-2 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        <PricingCard duration="1 mesec" price="20" />
        <PricingCard duration="2 meseca" price="35" />
        <PricingCard duration="3 meseca" price="50" />
      </div>
    </div>
  );
};
