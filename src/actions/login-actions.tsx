"use server";

import { loginSchema } from "@/app/users/login/form-login";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function loginUser(data: z.infer<typeof loginSchema>) {
  const { email, password } = data;

  try {
    // Verificar si ya hay una sesión activa
    const session = await getServerSession(authOptions);
    if (session) {
      return { success: true, message: "Ya has iniciado sesión" };
    }

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Si llegamos aquí, las credenciales son válidas
    return { success: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error al iniciar sesión");
  }
}