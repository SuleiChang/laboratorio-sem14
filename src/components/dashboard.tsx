"use client";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {session?.user ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bienvenido, {session.user.name || session.user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {session.user.email}</p>
              <p>ID: {session.user.id}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Usuarios totales: 100</p>
              <p>Visitas hoy: 50</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/users">
                <Button className="w-full">Ver usuarios</Button>
              </Link>
              <Link href="/settings">
                <Button className="w-full">Configuración</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent>
            <p className="my-5">Por favor, inicia sesión para ver el dashboard.</p>
            <Link href="/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}