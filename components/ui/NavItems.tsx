"use client";

import { headerLinks } from "@/constants";
import { Protect, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathName = usePathname();
  const { user } = useUser();

  const isSurveyCompleted = user?.publicMetadata?.isSurveyCompleted;

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks
        .filter((link) => {
          if (link.route === "/plan") {
            return isSurveyCompleted; // Prikazuj "Moj plan" samo ako je survey završen
          }

          if (link.route === "/survey") {
            return !isSurveyCompleted; // Prikazuj "Anketa" samo ako NIJE završena
          }

          return true; // Sve ostale rute prikazuj normalno
        })
        .map((link) => {
          const isActive = pathName === link.route;

          return (
            <li
              key={link.route}
              className={`${
                isActive && "text-primary-500"
              } flex-center p-medium-16 whitespace-nowrap transition-all duration-300  hover:text-gold hover:font-bold`}
            >
              {link.route !== "/admin" ? (
                <Link
                  href={
                    link.route === "/plan"
                      ? `/plan/${user?.publicMetadata?.userId}`
                      : link.route
                  }
                >
                  {link.label}
                </Link>
              ) : (
                <Protect role="org:king">
                  <Link href={link.route}>{link.label}</Link>
                </Protect>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default NavItems;
