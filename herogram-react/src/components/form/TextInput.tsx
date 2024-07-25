import { FormGroup, TextField } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  type?: string;
};

function TextInput({ register, error, label, placeholder, type }: Props) {
  return (
    <FormGroup className="mb-4">
      <TextField
        className="w-full"
        label={label}
        variant="outlined"
        placeholder={placeholder}
        {...register}
        type={type}
      />
      {error && (
        <span className="error-message text-xs text-red-500 ">
          {error.message}
        </span>
      )}
    </FormGroup>
  );
}

export default TextInput;
