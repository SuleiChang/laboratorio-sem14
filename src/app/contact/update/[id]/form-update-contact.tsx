"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactSchema } from "@/validations/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/actions/send-email";
import { UpdateContact } from "@/actions/contact-actions";

interface FormUpdateContactProps {
    contact: z.infer<typeof contactSchema>;
    id: number;
  }

function FormUpdateContact({ contact, id }: FormUpdateContactProps) {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
        name: contact.name,
        email: contact.email,
        mailSubject: contact.mailSubject,
        mailMessage: contact.mailMessage,
    }
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    console.log(data);
    try {
      const result = await sendEmail({
        from: data.email, // Suponiendo que el correo del remitente es el del formulario
        to: "ccortegana@unitru.edu.pe", // Cambia esto al destinatario real
        subject: data.mailSubject,
        text: data.mailMessage,
        html: `
        <h1>Hola, soy ${data.name}!</h1>
        <p>${data.mailMessage}</p>`,
      });
      console.log("Email enviado correctamente.");
      if (result.messageId) await UpdateContact(id , data);
      form.reset()
    } catch (error: any) {
      console.error("Error al enviar el email: %s", error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Actualizar información</CardTitle>
            <CardDescription>
              Rellena el formulario para actualizar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mailSubject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Asunto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mailMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mensaje" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default FormUpdateContact;
