"use server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/validations/contactSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function CreateContact(data: z.infer<typeof contactSchema>) {
    const {
        email,
        mailMessage,
        mailSubject,
        name,
      } = data;

      await prisma.contact.create({
        data: {
            email,
            mailMessage,
            mailSubject,
            name,
        },
      });
      redirect("/contact");
}

export async function UpdateContact(id: number, data: z.infer<typeof contactSchema>) {
    const {
        email,
        mailMessage,
        mailSubject,
        name,
      } = data;

      await prisma.contact.update({
        where: {
            id: id
        },
        data: {
            email,
            mailMessage,
            mailSubject,
            name,
        },
      });
      redirect("/contact");
}

export async function removeContact(formData: FormData) {
    const id = formData.get("id")?.toString();
  
    if (!id) {
      return;
    }
  
    await prisma.contact.delete({
      where: {
        id: parseInt(id),
      },
    });
  
    revalidatePath("/contact");
  }