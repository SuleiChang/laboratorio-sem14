import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import FormUpdateContact from "./form-update-contact";

export default async function UserUpdate({params}: {
  params: {
    id: string
  }
})
 {
    const id = parseInt(params.id)
  const contact = await prisma.contact.findFirst({
    where: {
      id: id
    }
  })

  if (!contact) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 text-3xl font-bold">
      <FormUpdateContact contact={contact} id={id} />
    </div>
  );

}