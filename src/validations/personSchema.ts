import { z } from "zod";

const state = ["1", "0"] as const;

export type State = (typeof state)[number];

export const mappedStates: { [key in State]: string } = {
  1: "Activo",
  0: "Inactivo",
};

export const userSchema = z.object({
  nPerCode: z.number(),
  cPerLastname: z
    .string({
      required_error: "El apellido es obligatorio.",
    })
    .min(3, { message: "El apellido debería ser más largo" })
    .max(200, { message: "El apellido debe tener menos de 200 caracteres" }),
  cPerName: z
    .string({
      required_error: "El nombre es obligatorio.",
    })
    .min(3, { message: "El nombre debería ser más largo" })
    .max(200, { message: "El nombre debe tener menos de 200 caracteres" }),
  cPerAddress: z
    .string({
      required_error: "La dirección es obligatoria.",
    })
    .min(3, { message: "La dirección es muy corta" })
    .max(200, { message: "La dirección debe tener menos de 200 caracteres" }),
  cPerDateBorn: z.string({
    required_error: "La fecha de nacimiento es obligatoria.",
  }).refine(
    (dob) => new Date(dob).toString() !== "Invalid Date",
    { message: "Por favor ingrese una fecha de nacimiento válida" }
  ),
  nPerYears: z
    .string({
      required_error: "La edad es obligatoria.",
    })
    .refine((val) => !isNaN(parseInt(val)), {
      message: "La edad debería ser un número",
    })
    .refine((val) => parseInt(val) >= 0, {
      message: "La edad no puede ser negativa",
    })
    .transform(Number),
  nPerSalary: z
    .string({
      required_error: "El salario es obligatorio.",
    })
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "El salario debería ser un número",
    })
    .refine((val) => parseFloat(val) <= 9999.99, {
      message: "El salario no puede ser mayor a 9999.99",
    })
    .transform(Number),
  cPerRnd: z
    .string({
      required_error: "El RND es obligatorio.",
    })
    .min(3, { message: "El RND debería ser más largo" })
    .max(50, { message: "El RND debe tener menos de 50 caracteres" }),
  cPerState: z.enum(state, {
    errorMap: () => ({ message: "Por favor seleccione un estado" }),
  }),
  cPerSexo: z
    .string({
      required_error: "El género de sexo es obligatorio.",
    })
    .min(1, { message: "El sexo es requerido" })
    .max(10, { message: "El sexo debe tener menos de 10 caracteres" }),
  remember_token: z
    .string({
      required_error: "El token es obligatorio.",
    })
    .min(3, { message: "El token debería ser más largo" })
    .max(100, { message: "El token debe tener menos de 100 caracteres" }),
});

export const userSchemaUpdate = z.object({
  nPerCode: z.number(),
  cPerLastname: z.string(),
  cPerName: z.string(),
  cPerAddress: z.string(),
  cPerDateBorn: z.string(),
  nPerYears: z.string(),
  nPerSalary: z.string(),
  cPerRnd: z.string(),
  cPerState: z.enum(["0", "1"]),
  cPerSexo: z.string(),
  remember_token: z.string(),
})