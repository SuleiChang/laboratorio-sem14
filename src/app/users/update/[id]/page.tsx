import prisma from "@/lib/prisma";
import { FormUpdatePerson } from "./form-update-person";
import { redirect } from "next/navigation";

// Asegúrate de definir el tipo de usuario que espera tu componente
interface User {
  nPerCode: number;
  cPerLastname: string;
  cPerName: string;
  cPerAddress: string;
  cPerDateBorn: string;
  nPerYears: string;
  nPerSalary: string;
  cPerRnd: string;
  cPerState: "0" | "1";
  cPerSexo: string;
  remember_token: string;
}

export default async function UserUpdate({ params }: { params: { id: string } }) {
  const user = await prisma.person.findFirst({
    where: {
      nPerCode: parseInt(params.id)
    }
  });

  if (!user) {
    redirect("/");
  }

  console.log(user)
  // Convertir Date a string y asegurar que cPerState sea "0" o "1"
  const formattedUser: User = {
    ...user,
    cPerDateBorn: user.cPerDateBorn.toISOString(), // Convertir a string
    nPerYears: user.nPerYears.toString(), // Convertir a cadena
    nPerSalary: user.nPerSalary.toString(), // Convertir a cadena
    cPerState: user.cPerState === "1" ? "1" : "0", // Asegurar que sea "0" o "1"
  };

  return (
    <div>
      <FormUpdatePerson user={formattedUser} />
    </div>
  );
}
