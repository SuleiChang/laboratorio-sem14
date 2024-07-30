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
import { UpdateImage } from "@/actions/image-actions";
import { updateImageSchema } from "@/validations/imageSchema";
import { useRouter } from 'next/navigation';

// Definimos el tipo ImageFormData basado en el schema de actualización
type ImageFormData = z.infer<typeof updateImageSchema>;

interface FormUpdateImageProps {
    image: {
        name: string;
        imageUrl: string;
    };
    id: string;
}

export function FormUpdateImage({ image, id }: FormUpdateImageProps) {
  const router = useRouter();
  const form = useForm<ImageFormData>({
    resolver: zodResolver(updateImageSchema),
    defaultValues: {
        name: image.name,
    }
  });

  const onSubmit: SubmitHandler<ImageFormData> = async (data) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', data.name);
    if (data.imageFile) {
        formData.append('imageFile', data.imageFile);
    }
    
    try {
        const result = await UpdateImage(formData);
        if (result.success) {
            toast.success("Imagen actualizada");
            router.push('/images'); // Redirige a la página de imágenes
        } else {
            toast.error(result.error || "Error al actualizar la imagen");
        }
    } catch (error) {
        console.error("Error al actualizar la imagen:", error);
        toast.error("Error al actualizar la imagen");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-screen w-full m-auto flex-col">
        <Card className="max-w-4xl m-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Actualizar Imagen</CardTitle>
            <CardDescription>
              Actualiza la información de la imagen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la imagen</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Archivo de imagen (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className="w-full" type="submit">
              Actualizar Imagen
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}