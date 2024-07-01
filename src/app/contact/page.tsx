import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import UserTable from "@/components/table-person";
import ContactTable from "@/components/table-contact";

export default async function Contacts() {
  const contacts = await prisma.contact.findMany();

  return (
    <div>
      <div className="flex justify-end items-center pt-16">
        <Link href="contact/create">
          <Button>
            Registrar contacto
          </Button>
        </Link>
      </div>
      <div className="flex min-h-screen flex-col items-center pb-24 ">
        <h1 className="text-3xl font-bold mb-10">Contactos</h1>
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
}
