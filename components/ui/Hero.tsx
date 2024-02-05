export const Hero = () => {
  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>

        <img
          className=" object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
          src="/assets/images/stoji-hero1.jpg"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-gold uppercase rounded-full bg-teal-accent-400">
            Nov program
          </p>
          <h2 className=" text-black mb-5  md:text-6xl font-bold tracking-tight  sm:text-4xl sm:leading-none">
            Dosta sa
            <br className="hidden md:block" />
            Izgovorima.{" "}
            <span className="inline-block text-deep-purple-accent-400"></span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gold md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            molestiae id aperiam corrupti aliquam quaerat saepe quas! Soluta
            nisi aperiam facilis suscipit nostrum inventore iste totam
            similique, ut, quia quaerat officiis asperiores voluptatum vel
            delectus itaque qui? Ad, perspiciatis officiis fugiat voluptate
            molestiae alias ea rem, eos ratione facilis nobis?
          </p>
          <div className="flex items-center">
            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Započnimo
            </a>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              O meni
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
