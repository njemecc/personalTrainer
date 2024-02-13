"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { useDynamicText } from "./useDynamicText";

export const Hero = () => {
  const { text } = useDynamicText();

  return (
    <div
      className={`${styles["hero-wrapper"]} h-full relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0lg:mb-0`}
    >
      <div className=" inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0"></div>
      <div className=" mt-32 mx-auto my-auto relative w-full justify-center flex flex-col lg:items-end  max-w-xl px-4 lg:mx-auto md:ml-auto md:mr-0 md:mb-auto md:mt-20 md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 ml-10 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-teal-accent-400">
            Novi Program
          </p>
          <h2 className="text-5xl text-primary mb-5 sm:w-2/4 md:w-full  md:text-6xl  font-bold tracking-tight  sm:text-4xl sm:leading-none">
            {text}
            {/* Dosta sa
            <br className="md:block" />
            Izgovorima.{" "} */}
            <span className="inline-block text-deep-purple-accent-400"></span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gold md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
            modi et velit consectetur. Unde perferendis illum reprehenderit
            delectus, assumenda aliquam.
          </p>
          <div className="flex items-center">
            <a
              href="/"
              className="p-regular-20 hover:bg-white font-semibold hover:text-black inline-flex items-center justify-center h-12 px-6 mr-6  tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Započnimo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
