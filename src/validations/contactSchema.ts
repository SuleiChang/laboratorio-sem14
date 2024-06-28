import { z } from "zod";

export const contactSchema = z.object({
    name: z
    .string({
      required_error: "El nombre es obligatorio.",
    })
    .min(3, { message: "El nombre debería ser más largo" })
    .max(50, { message: "El nombre debe tener menos de 50 caracteres" }),
    email: z.string({required_error: "El correo es obligatorio"}).email({message: "Ingresa un correo válido, por favor."}),
    mailSubject: z
    .string({
      required_error: "El asunto es obligatorio.",
    })
    .min(3, { message: "El asunto debería ser más largo" })
    .max(50, { message: "El asunto debe tener menos de 50 caracteres" }),
    mailMessage: z
    .string({
      required_error: "La descripción es obligatorio.",
    })
    .min(3, { message: "La descripción debería ser más largo" })
    .max(250, { message: "La descripción debe tener menos de 250 caracteres" }),
})