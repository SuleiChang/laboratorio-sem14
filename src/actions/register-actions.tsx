"use server";
import prisma from "@/lib/prisma";
import { userSchema } from "@/app/users/register/form-register";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function createUser(data: z.infer<typeof userSchema>) {
  const { username, email, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  revalidatePath("/users");
  redirect("/users");
}

export async function updateUser(id: string, data: z.infer<typeof userSchema>) {
  const { username, email, password } = data;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  await prisma.user.update({
    where: {
      id: id
    },
    data: {
      username,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  revalidatePath("/users");
  redirect("/users");
}

export async function removeUser(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/users");
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}