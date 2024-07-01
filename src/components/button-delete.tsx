import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

interface PropsDeleteButton {
  label: string,
  nPerCode: number,
  functionRemove: (formData: FormData) => void;
}

export function ButtonDelete({ nPerCode, functionRemove, label }: PropsDeleteButton) {
  return (
    <form action={functionRemove}>
      <input type="hidden" name={label} value={nPerCode} />
      <Button variant="destructive">
        <FaTrash />
      </Button>
    </form>
  );
}