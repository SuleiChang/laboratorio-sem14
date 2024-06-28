import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Laboratorio
        </h1>
      </Link>

      <div className="flex gap-x-2 items-center">
        <Link href="/" className={buttonVariants({ variant: "secondary", class:"hover:text-emerald-200" })}>
          Inicio
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: "secondary", class:"hover:text-emerald-200" })}>
          Contacto
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;