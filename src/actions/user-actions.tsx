"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const cPerLastname = formData.get("cPerLastname")?.toString();
  const cPerName = formData.get("cPerName")?.toString();
  const cPerAddress = formData.get("cPerAddress")?.toString();
  const cPerDateBorn = formData.get("cPerDateBorn")?.toString();
  const nPerYears = parseInt(formData.get("nPerYears")?.toString() || "0", 10);
  const nPerSalary = parseFloat(formData.get("nPerSalary")?.toString() || "0");
  const cPerRnd = formData.get("cPerRnd")?.toString();
  const cPerState = formData.get("cPerState")?.toString();
  const cPerSexo = formData.get("cPerSexo")?.toString();
  const remember_token = formData.get("remember_token")?.toString();


  if (cPerLastname && cPerName && cPerAddress && cPerDateBorn && cPerRnd && cPerState && cPerSexo && remember_token) {
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
}}

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

export async function updateUser(formData: FormData) {
  const nPerCode = formData.get("nPerCode")?.toString();
  const cPerLastname = formData.get("cPerLastname")?.toString();
  const cPerName = formData.get("cPerName")?.toString();
  const cPerAddress = formData.get("cPerAddress")?.toString();
  const cPerDateBorn = formData.get("cPerDateBorn")?.toString();
  const nPerYears = parseInt(formData.get("nPerYears")?.toString() || "0", 10);
  const nPerSalary = parseFloat(formData.get("nPerSalary")?.toString() || "0");
  const cPerRnd = formData.get("cPerRnd")?.toString();
  const cPerState = formData.get("cPerState")?.toString();
  const cPerSexo = formData.get("cPerSexo")?.toString();
  const remember_token = formData.get("remember_token")?.toString();

  if (
    !nPerCode || !cPerLastname || !cPerName || !cPerAddress || 
    !cPerDateBorn || isNaN(nPerYears) || isNaN(nPerSalary) || 
    !cPerRnd || !cPerState || !cPerSexo || !remember_token
  ) {
    return;
  }

  await prisma.person.update({
    where: {
      nPerCode: parseInt(nPerCode),
    },
    data: {
      cPerLastname,
      cPerName,
      cPerAddress,
      cPerDateBorn: new Date(cPerDateBorn), // Convertir a Date
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