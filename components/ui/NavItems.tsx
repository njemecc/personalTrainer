"use client";

import { headerLinks } from "@/constants";
import { Protect, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathName = usePathname();
  const { user } = useUser();

  const isSurveyCompleted = Boolean(user?.publicMetadata?.isSurveyCompleted);

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-2 md:gap-5 md:flex-row">
      {headerLinks
        .filter((link) => {
          if (link.route === "/plan" || link.route === "/ishrana") {
            return isSurveyCompleted; // Prikazuj "Moj plan" i "Ishrana" samo ako je survey završen
          }

          if (link.route === "/survey") {
            return !isSurveyCompleted; // Prikazuj "Anketa" samo ako NIJE završena
          }

          return true; // Sve ostale rute prikazuj normalno
        })
        .map((link) => {
          const isActive = pathName === link.route;

          return (
            <li key={link.route} className="w-full">
              {link.route !== "/admin" ? (
                <Link
                  href={
                    link.route === "/plan" || link.route === "/ishrana"
                      ? `${link.route}/${user?.publicMetadata?.userId}`
                      : link.route
                  }
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap text-base font-medium ${
                    isActive
                      ? "bg-gold text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <Protect role="org:king">
                  <Link
                    href={link.route}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap text-base font-medium ${
                      pathName === link.route
                        ? "bg-gold text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </Protect>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default NavItems;
