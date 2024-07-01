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
import { removeContact } from "@/actions/contact-actions";

interface Contact {
  id: number;
  name: string;
  email: string;
  mailSubject: string;
}

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <Table>
      <TableCaption>Lista de contactos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre del contacto</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Asunto</TableHead>
          <TableHead>Operaciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mailSubject}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/contact/update/${user.id}`}>
                  <Button variant="outline">
                    <FaEdit className="h-4 w-4" />
                  </Button>
                </Link>
                <ButtonDelete nPerCode={user.id} functionRemove={removeContact} label="id" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

}
