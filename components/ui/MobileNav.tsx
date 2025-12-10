"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle hover:opacity-80 transition-opacity">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={28}
            height={28}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-gradient-to-b from-white to-gray-50 md:hidden w-[280px] sm:w-[320px]">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-block text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              Djura <span className="text-gold">Blažu</span>
            </Link>
          </div>
          <Separator className="border border-gray-200 mb-6" />
          <div className="flex-1">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
