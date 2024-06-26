"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { createUser } from "@/actions/user-actions";
import { userSchema } from "@/validations/personSchema"; // Asegúrate de importar el esquema de validación

type Inputs = {
  cPerLastname: string;
  cPerName: string;
  cPerAddress: string;
  cPerDateBorn: string;
  nPerYears: number;
  nPerSalary: number;
  cPerRnd: string;
  cPerState: "0" | "1";
  cPerSexo: string;
  remember_token: string;
};
export function FormCreatePerson() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Convierte los datos a FormData
    const formData = new FormData();
    formData.append("cPerLastname", data.cPerLastname);
    formData.append("cPerName", data.cPerName);
    formData.append("cPerAddress", data.cPerAddress);
    formData.append("cPerDateBorn", data.cPerDateBorn);
    formData.append("nPerYears", data.nPerYears.toString());
    formData.append("nPerSalary", data.nPerSalary.toString());
    formData.append("cPerRnd", data.cPerRnd);
    formData.append("cPerState", data.cPerState);
    formData.append("cPerSexo", data.cPerSexo);
    formData.append("remember_token", data.remember_token);

    await createUser(formData);
  };

  return (
    <div className="flex min-h-screen w-full m-auto flex-col pb-24 pt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-2xl m-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Crear Persona</CardTitle>
            <CardDescription>
              Rellena el formulario para realizar el registro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerLastname">Apellido:</Label>
                <Input
                  type="text"
                  id="cPerLastname"
                  {...register("cPerLastname")}
                />
                {errors.cPerLastname && (
                  <p className="text-red-500">{errors.cPerLastname.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerName">Nombre:</Label>
                <Input type="text" id="cPerName" {...register("cPerName")} />
                {errors.cPerName && (
                  <p className="text-red-500">{errors.cPerName.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerAddress">Dirección:</Label>
                <Input
                  type="text"
                  id="cPerAddress"
                  {...register("cPerAddress")}
                />
                {errors.cPerAddress && (
                  <p className="text-red-500">{errors.cPerAddress.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerDateBorn">Fecha de Nacimiento:</Label>
                <Input
                  type="date"
                  id="cPerDateBorn"
                  {...register("cPerDateBorn")}
                />
                {errors.cPerDateBorn && (
                  <p className="text-red-500">{errors.cPerDateBorn.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="nPerYears">Años:</Label>
                <Input type="number" id="nPerYears" {...register("nPerYears")} />
                {errors.nPerYears && (
                  <p className="text-red-500">{errors.nPerYears.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="nPerSalary">Salario:</Label>
                <Input
                  type="number"
                  step="0.01"
                  id="nPerSalary"
                  {...register("nPerSalary")}
                />
                {errors.nPerSalary && (
                  <p className="text-red-500">{errors.nPerSalary.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerRnd">RND:</Label>
                <Input type="text" id="cPerRnd" {...register("cPerRnd")} />
                {errors.cPerRnd && (
                  <p className="text-red-500">{errors.cPerRnd.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerState">Estado:</Label>
                <Controller
                  name="cPerState"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger id="cPerState">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">Activo</SelectItem>
                        <SelectItem value="0">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.cPerState && (
                  <p className="text-red-500">{errors.cPerState.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="cPerSexo">Sexo:</Label>
                <Input type="text" id="cPerSexo" {...register("cPerSexo")} />
                {errors.cPerSexo && (
                  <p className="text-red-500">{errors.cPerSexo.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="remember_token">Token:</Label>
                <Input
                  type="text"
                  id="remember_token"
                  {...register("remember_token")}
                />
                {errors.remember_token && (
                  <p className="text-red-500">{errors.remember_token.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className="w-full" type="submit">
              Crear
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div>{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
}
