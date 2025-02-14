import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const NavBar = () => {
  return (
    <header className="w-full border-b ">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-46 p-bold-20">
          Djura <span className="text-gold">Blažu</span>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"></UserButton>
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full hover:text-white" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
