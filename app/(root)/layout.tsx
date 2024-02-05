import NavBar from "@/components/ui/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default layout;
