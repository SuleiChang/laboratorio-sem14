"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { createUser } from "@/actions/register-actions";

// Define el esquema de validación
export const userSchema = z.object({
  username: z.string({
    required_error: "El username es obligatorio.",
}).min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string({
    required_error: "El correo es obligatorio.",
}).email("Correo electrónico inválido"),
  password: z.string({
    required_error: "El password es obligatorio.",
}).min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type UserFormData = z.infer<typeof userSchema>;

export function RegisterForm() {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      await createUser(data);
      toast.success("Usuario registrado exitosamente");
    } catch (error) {
      toast.error("Error al registrar usuario");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-screen w-full m-auto flex-col">
        <Card className="max-w-4xl m-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Registro de Usuario</CardTitle>
            <CardDescription>
              Crea una nueva cuenta de usuario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className="w-full" type="submit">
              Registrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}