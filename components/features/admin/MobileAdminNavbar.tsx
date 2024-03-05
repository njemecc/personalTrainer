import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import AdminMainNav from "./AdminMainNav";
import AdminSidebar from "./AdminSidebar";
import Logo from "@/components/ui/Logo";
export function MobileAdminNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Dobrodošao Marko</SheetTitle>
          <SheetDescription>
            Ovde možeš upravljati korisnicima i koristiti svoje admin
            funkcionalnosti.
          </SheetDescription>
        </SheetHeader>
        <AdminMainNav variant="mobile" />
        <SheetFooter>
          <SheetClose asChild>
            <Button className="hover:text-white" type="submit">
              Zatvori
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
