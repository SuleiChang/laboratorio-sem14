import prisma from "@/lib/prisma";
import { FormUpdatePerson } from "./form-update-person";
import { redirect } from "next/navigation";

export default async function UserUpdate({ params }: {
  params: {
    id: string
  }
}) {
  const user = await prisma.person.findFirst({
    where: {
      nPerCode: parseInt(params.id)
    }
  });

  if (!user) {
    redirect("/");
  }

  // Convert cPerDateBorn to string
  const userWithCorrectState = {
    ...user,
    cPerDateBorn: user.cPerDateBorn.toISOString().split("T")[0],
    cPerState: user.cPerState === "1" ? 1 : 0,
  };

  return (
    <div>
      <FormUpdatePerson user={userWithCorrectState} />
    </div>
  );
}
