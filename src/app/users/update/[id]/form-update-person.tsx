"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateUser } from "@/actions/user-actions";
import { userSchema, userSchemaUpdate } from "@/validations/personSchema";
import { format, parseISO, add } from 'date-fns';
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { z } from "zod";

// Asegurarnos de que `user` se derive del esquema de Zod
export function FormUpdatePerson({ user }: { user: z.infer<typeof userSchemaUpdate> }) {
  const form = useForm<z.infer<typeof userSchemaUpdate>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nPerCode: user.nPerCode,
      cPerLastname: user.cPerLastname,
      cPerName: user.cPerName,
      cPerAddress: user.cPerAddress,
      cPerDateBorn: user.cPerDateBorn ? add(parseISO(user.cPerDateBorn), { hours: 5 }).toISOString() : '',
      nPerYears: user.nPerYears.toString(),
      nPerSalary: user.nPerSalary.toString(),
      cPerRnd: user.cPerRnd,
      cPerState: user.cPerState,
      cPerSexo: user.cPerSexo,
      remember_token: user.remember_token,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof userSchemaUpdate>> = async (data) => {
    await updateUser(data);
  };

  return (
    <div className="flex min-h-screen w-full m-auto flex-col pb-24 pt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-2xl m-auto">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Actualizar Persona</CardTitle>
              <CardDescription>
                Rellena el formulario para actualizar los datos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input type="hidden" name="nPerCode" value={user.nPerCode} />
              <div className="grid w-full items-center gap-4">
                <div className="flex w-full gap-x-5">
                  <FormField
                    control={form.control}
                    name="cPerName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cPerLastname"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-x-5">
                <FormField
                  control={form.control}
                  name="cPerAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cPerDateBorn"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="my-1">Fecha de Nacimiento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(parseISO(field.value), 'PPP')
                              ) : (
                                <span>Seleccione una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString())}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-x-5">
                <FormField
                  control={form.control}
                  name="nPerYears"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Años</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nPerSalary"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Salario</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="cPerRnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RND</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full gap-x-5">
                <FormField
                    control={form.control}
                    name="cPerState"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value.toString()}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger id="cPerState">
                              <SelectValue placeholder="Seleccione un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Activo</SelectItem>
                              <SelectItem value="0">Inactivo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cPerSexo"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Sexo</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger id="cPerSexo">
                              <SelectValue placeholder="Seleccione un estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Femenino">Femenino</SelectItem>
                              <SelectItem value="Masculino">Masculino</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="remember_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex w-full">
              <Button className="w-full" type="submit">
                Actualizar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
