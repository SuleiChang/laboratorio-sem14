"use server";
import prisma from "@/lib/prisma";
import { userSchema } from "@/validations/personSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createUser(data: z.infer<typeof userSchema>) {
  const {
    cPerLastname,
    cPerName,
    cPerAddress,
    cPerDateBorn,
    nPerYears,
    nPerSalary,
    cPerRnd,
    cPerState,
    cPerSexo,
    remember_token,
  } = data;

  if (
    cPerLastname &&
    cPerName &&
    cPerAddress &&
    cPerDateBorn &&
    cPerRnd &&
    cPerState &&
    cPerSexo &&
    remember_token
  ) {
    await prisma.person.create({
      data: {
        cPerLastname,
        cPerName,
        cPerAddress,
        cPerDateBorn: new Date(cPerDateBorn),
        nPerYears,
        nPerSalary,
        cPerRnd,
        cPerState,
        cPerSexo,
        remember_token,
      },
    });

    redirect("/users");
  } else {
    console.error("Missing required fields");
  }
}

export async function removeUser(formData: FormData) {
  const nPerCode = formData.get("nPerCode")?.toString();

  if (!nPerCode) {
    return;
  }

  await prisma.person.delete({
    where: {
      nPerCode: parseInt(nPerCode),
    },
  });

  revalidatePath("/");
}

export async function updateUser(data: z.infer<typeof userSchema>) {
  const {
    nPerCode,
    cPerLastname,
    cPerName,
    cPerAddress,
    cPerDateBorn,
    nPerYears,
    nPerSalary,
    cPerRnd,
    cPerState,
    cPerSexo,
    remember_token,
  } = data;

  await prisma.person.update({
    where: {
      nPerCode: nPerCode,
    },
    data: {
      cPerLastname,
      cPerName,
      cPerAddress,
      cPerDateBorn: new Date(cPerDateBorn),
      nPerYears,
      nPerSalary,
      cPerRnd,
      cPerState,
      cPerSexo,
      remember_token,
    },
  });

  redirect("/users");
}