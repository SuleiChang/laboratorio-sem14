import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import UserTable from "@/components/table-person";

export default async function Users() {
  const usersFromPrisma = await prisma.person.findMany();

  const users = usersFromPrisma.map((user) => ({
    nPerCode: user.nPerCode,
    cPerLastname: user.cPerLastname,
    cPerName: user.cPerName,
    cPerAddress: user.cPerAddress,
    cPerDateBorn: user.cPerDateBorn.toISOString().split('T')[0], // Convertir a string en formato YYYY-MM-DD
    nPerYears: user.nPerYears,
    nPerSalary: user.nPerSalary.toFixed(2), // Convertir a string
    cPerRnd: user.cPerRnd,
    cPerState: user.cPerState,
    cPerSexo: user.cPerSexo,
    remember_token: user.remember_token,
  }));

  return (
    <div>
      <div className="flex justify-end items-center pt-16">
        <Link href="users/create">
          <Button>
            Registrar Persona
          </Button>
        </Link>
      </div>
      <div className="flex min-h-screen flex-col items-center pb-24 ">
        <h1 className="text-3xl font-bold mb-10">Personas</h1>
        <UserTable users={users} />
      </div>
    </div>
  );
}
