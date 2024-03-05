import { CreateUserParams } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CreateUserParams>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Registration Date",
  },
];
