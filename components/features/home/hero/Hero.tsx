"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { useDynamicText } from "./useDynamicText";
import Link from "next/link";

export const Hero = () => {
  const { text } = useDynamicText();

  return (
    <div
      className={`${styles["hero-wrapper"]} h-full relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0lg:mb-0`}
    >
      <div className=" inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0"></div>
      <div className="mt-40 mx-auto my-auto relative w-full justify-center flex flex-col lg:items-end  max-w-xl px-4 lg:mx-auto md:ml-auto md:mr-0 md:mb-auto md:mt-20 md:px-0 lg:px-8 lg:max-w-screen-xl z-10">
        <div className="mb-16 ml-4 md:ml-6 lg:ml-10 lg:my-40 lg:max-w-lg lg:pr-5 animate-fade-in">
          <p className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-gold shadow-lg backdrop-blur-sm">
            Novi Program
          </p>
          <h2 className="text-4xl sm:text-5xl text-primary mb-6 sm:w-2/4 md:w-full md:text-6xl lg:text-7xl font-bold tracking-tight sm:leading-tight md:leading-tight drop-shadow-2xl">
            {text}
            <span className="inline-block text-deep-purple-accent-400"></span>
          </h2>
          <p className="pr-5 mb-8 text-base text-black md:text-lg lg:text-xl font-medium leading-relaxed drop-shadow-lg">
            Da li ste spremni da preuzmete kontrolu nad svojim zdravljem,
            oblikujete telo iz snova i povećate nivo energije? Ovde počinje vaše
            putovanje ka boljoj verziji sebe!
          </p>
          <div className="flex items-center">
            <Link
              href="/survey"
              className="group relative inline-flex items-center justify-center h-14 px-8 text-base font-semibold text-white bg-gold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              <span className="relative z-10">Započnimo</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
