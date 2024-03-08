import { UserColumnParams } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<UserColumnParams>[] = [
  {
    accessorKey: "username",
    header: "Korisničko ime",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_active",
    header: "Aktivan",
    cell: (value) => (value.getValue() ? "Da" : "Ne"),
  },
  {
    accessorKey: "created_at",
    //@ts-ignore
    cell: (value) => value.getValue().toString().substring(0, 16),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum registracije
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "opcije",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opcije</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Kopiraj email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/users/${user._id}`}>📁 Detalji </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>🗑️ Obriši klijenta</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
