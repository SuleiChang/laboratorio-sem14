import { removeUser } from "@/actions/user-actions";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

export function ButtonDelete({ nPerCode }: { nPerCode: number }) {
  return (
    <form action={removeUser}>
      <input type="hidden" name="nPerCode" value={nPerCode} />
      <Button variant="destructive">
        <FaTrash />
      </Button>
    </form>
  );
}