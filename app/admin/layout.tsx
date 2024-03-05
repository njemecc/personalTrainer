import AdminLayout from "@/components/features/admin/AdminLayout";
import { MobileAdminNavbar } from "@/components/features/admin/MobileAdminNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
};

export default layout;
