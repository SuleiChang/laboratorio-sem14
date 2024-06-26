import prisma from "@/lib/prisma";
import { FormUpdatePerson } from "./form-update-person";
import { redirect } from "next/navigation";

export default async function UserUpdate({params}: {
  params: {
    id: string
  }
})
 {
  const user = await prisma.person.findFirst({
    where: {
      nPerCode: parseInt(params.id)
    }
  })
  console.log(user)

  if (!user) {
    redirect("/")
  }

  return (
    <div>
      <FormUpdatePerson user={user} />
    </div>
  );

}