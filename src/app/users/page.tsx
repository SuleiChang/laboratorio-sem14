import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import UserTable from "./user-table";

export default async function Users() {
  const usersFromPrisma = await prisma.user.findMany();

  const users = usersFromPrisma.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
  }));

  return (
    <div>
      <div className="flex justify-end items-center pt-16">
        <Link href="/users/create">
          <Button>
            Register User
          </Button>
        </Link>
      </div>
      <div className="flex min-h-screen flex-col items-center pb-24 ">
        <h1 className="text-3xl font-bold mb-10">Users</h1>
        <UserTable users={users} />
      </div>
    </div>
  );
}