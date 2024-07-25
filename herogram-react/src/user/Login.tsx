import { Box, Typography, FormGroup, Button, Snackbar } from "@mui/material";
import ContainerBox from "../components/ContainerBox";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import config from "../../config.json";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../components/form/TextInput";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CurrentUser } from "../context";

const RegisterSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(4).max(200),
});

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

type SignUpSchemaType = z.infer<typeof RegisterSchema>;

function Login() {
  const [popup, setPopup] = useState("");
  const redirect = useNavigate();
  const { setCurrentUser } = useContext(CurrentUser);

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (e) => {
    const fetchRes = await fetch(config.API_BASE_URL + "/v1/login", {
      method: "POST",
      body: JSON.stringify(e),
      headers: myHeaders,
    });
    const data = await fetchRes.json();
    if (fetchRes.status == 200) {
      setPopup(data.message);
      setCurrentUser(data.data);
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
        Login
      </Typography>
      <Box className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email Address"
            placeholder="Email Address"
            register={register("email")}
            error={errors.email}
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Please enter a password"
            register={register("password")}
            error={errors.password}
          />
          <FormGroup className="mb-4">
            <Button variant="contained" size="large" type="submit">
              Login
            </Button>
          </FormGroup>
        </form>
      </Box>
      {popup && (
        <Snackbar
          open={true}
          autoHideDuration={100}
          message={popup}
          action={<></>}
        />
      )}
    </ContainerBox>
  );
}

export default Login;
