import { Footer } from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
