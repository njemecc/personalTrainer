export const Pricing = () => {
  return (
    <div className="m-auto w-4/5 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-gold uppercase rounded-full bg-teal-accent-400">
            Naši trening planovi
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative">Izaberite</span>
          </span>{" "}
          plan koji vama najviše odgovara.
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Sve uplate se izvršavaju putem uplatnice.
        </p>
      </div>
      <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border-2  rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">1 mesec</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">7.990</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">Personalizovani Plan Treninga</div>
              <div className="text-gray-700">Personalizovani Plan Ishrane</div>
              <div className="text-gray-700">
                Monitoring I Korigovanje Plana
              </div>
              <div className="text-gray-700">Snimci Vežbi</div>
              <div className="text-gray-700">Podrška 24/7</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className=" inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gold rounded shadow-md hover:opacity-90 focus:shadow-outline focus:outline-none"
            >
              Započni
            </a>
            <p className="opacity-0 max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Sed ut unde omnis iste natus accusantium doloremque.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border-2 rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">3 meseca</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">20.990</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">Personalizovani Plan Treninga</div>
              <div className="text-gray-700">Personalizovani Plan Ishrane</div>
              <div className="text-gray-700">
                Monitoring I Korigovanje Plana
              </div>
              <div className="text-gray-700">Snimci Vežbi</div>
              <div className="text-gray-700">Podrška 24/7</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className=" inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gold rounded shadow-md hover:opacity-90 focus:shadow-outline focus:outline-none"
            >
              Započni
            </a>
            <p className="opacity-0 max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Sed ut unde omnis iste natus accusantium doloremque.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border-2 rounded shadow-sm sm:items-center hover:shadow">
          <div className="text-center">
            <div className="text-lg font-semibold">6 meseci</div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">39.990</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">Personalizovani Plan Treninga</div>
              <div className="text-gray-700">Personalizovani Plan Ishrane</div>
              <div className="text-gray-700">
                Monitoring I Korigovanje Plana
              </div>
              <div className="text-gray-700">Snimci Vežbi</div>
              <div className="text-gray-700">Podrška 24/7</div>
            </div>
          </div>
          <div>
            <a
              href="/"
              className=" inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gold rounded shadow-md hover:opacity-90 focus:shadow-outline focus:outline-none"
            >
              Započni
            </a>
            <p className="opacity-0 max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
              Sed ut unde omnis iste natus accusantium doloremque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
