"use client"
import NavBar from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="w-full">
      <NavBar />
      <h1 className="text-lg md:text-2xl text-center mt-10 ">
        Dobrodošao na svoj trening 🏋️‍♂️
      </h1>
      <div className="mt-20">{children}</div>
      <div className="mt-[180rem]">
        <Footer />
      </div>
    </div>
  );
};

export default layout;
