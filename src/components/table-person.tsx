"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { ButtonDelete } from "./button-delete";
import { format, parseISO } from 'date-fns';

interface User {
  nPerCode: number;
  cPerLastname: string;
  cPerName: string;
  cPerAddress: string;
  cPerDateBorn: string;
  nPerYears: number;
  nPerSalary: string;
  cPerRnd: string;
  cPerState: string;
  cPerSexo: string | null;
  remember_token: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <Table>
      <TableCaption>Registro de usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Código</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Fecha de Nacimiento</TableHead>
          <TableHead>Años</TableHead>
          <TableHead>Salario</TableHead>
          <TableHead>RND</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Sexo</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.nPerCode}>
            <TableCell className="font-medium">{user.nPerCode}</TableCell>
            <TableCell>{user.cPerLastname}</TableCell>
            <TableCell>{user.cPerName}</TableCell>
            <TableCell>{user.cPerAddress}</TableCell>
            <TableCell>{format(parseISO(user.cPerDateBorn), 'PPP')}</TableCell>
            <TableCell>{user.nPerYears}</TableCell>
            <TableCell>{user.nPerSalary}</TableCell>
            <TableCell>{user.cPerRnd}</TableCell>
            <TableCell>{user.cPerState}</TableCell>
            <TableCell>{user.cPerSexo}</TableCell>
            <TableCell>{user.remember_token}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/users/update/${user.nPerCode}`}>
                  <Button variant="outline">
                    <FaEdit className="h-4 w-4" />
                  </Button>
                </Link>
                <ButtonDelete nPerCode={user.nPerCode} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

}
