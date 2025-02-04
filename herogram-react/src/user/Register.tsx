import { Box, Typography, FormGroup, Button, Snackbar } from "@mui/material";
import ContainerBox from "../components/ContainerBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import config from "../../config.json";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../components/form/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterSchema = z.object({
  full_name: z.string().min(4).max(200),
  email: z.string().email().max(200),
  password: z.string().min(4).max(200),
});

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

type SignUpSchemaType = z.infer<typeof RegisterSchema>;

export default function Register() {
  const [popup, setPopup] = useState("");
  const redirect = useNavigate();

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (e) => {
    const fetchRes = await fetch(config.API_BASE_URL + "/v1/register", {
      method: "POST",
      body: JSON.stringify(e),
      headers: myHeaders,
    });
    const data = await fetchRes.json();
    if (fetchRes.status == 200) {
      setPopup(data.message);

      setTimeout(function () {
        redirect("/login", { replace: true });
      }, 2000);
    } else {
      setPopup(data.message || "Something Went wrong");
    }
  };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(RegisterSchema) });

  return (
    <ContainerBox>
      <Typography variant="h1" className="text-center !text-5xl">
        Register
      </Typography>
      <Box className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="Please enter Your full name"
            register={register("full_name")}
            error={errors.full_name}
          />
          <TextInput
            label="Email Address"
            placeholder="Email Address"
            register={register("email")}
            error={errors.email}
          />
          <TextInput
            label="Password"
            placeholder="Please enter a password"
            register={register("password")}
            error={errors.password}
          />
          <FormGroup className="mb-4">
            <Button variant="contained" size="large" type="submit">
              Create Account
            </Button>
          </FormGroup>
        </form>
      </Box>
      {popup && (
        <Snackbar
          open={true}
          autoHideDuration={100}
          // onClose={}
          message={popup}
          action={<></>}
        />
      )}
    </ContainerBox>
  );
}
