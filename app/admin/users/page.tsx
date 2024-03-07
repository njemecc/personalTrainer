import UsersTable from "@/components/features/admin/users/UsersTable";
import { getAllUsers } from "@/lib/actions/user.actions";

const page = async () => {
  const users = await getAllUsers();

  return (
    <div className="w-full">
      <h2 className="text-center text-xl ">
        Lista <span className="text-gold">klijenata</span>
      </h2>
      <UsersTable data={users} />
    </div>
  );
};

export default page;
