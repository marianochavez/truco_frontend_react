import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as LinkChakra,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";

import {useForm} from "../../hooks/useForm";
import {PlayerContext} from "../../providers/PlayerProvider";
import Appbar from "../ui/Appbar";

interface LoginFormProps {
  lUsername: string;
  lPassword: string;
}

export default function Login() {
  const [formValues, handleInputChange] = useForm({
    lUsername: "",
    lPassword: "",
  } as LoginFormProps);
  const navigate = useNavigate();
  const {isLogged, login} = useContext(PlayerContext);
  const [error, setError] = useState("");

  const {lUsername, lPassword} = formValues as LoginFormProps;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await login(lUsername, lPassword);

    if (res.status === "OK") {
      navigate("/");
    } else {
      setError(res.data);
    }
  };

  if (isLogged) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Appbar />
      <Flex align={"center"} bg={"gray.50"} justify={"center"} minH={"100vh"}>
        <Stack maxW={"lg"} mx={"auto"} px={6} py={12} spacing={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Ingresa a tu cuenta</Heading>
            {!error && (
              <Text color={"gray.600"} fontSize={"lg"}>
                para disfrutar de una partida de truco ✌️
              </Text>
            )}
            {error && (
              <Text color={"red.500"} fontSize={"lg"}>
                {error}
              </Text>
            )}
          </Stack>
          <Box bg={"white"} boxShadow={"lg"} p={8} rounded={"lg"}>
            <form onSubmit={(e) => handleLogin(e)}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    required
                    autoComplete="off"
                    name="lUsername"
                    type="text"
                    value={lUsername}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    autoComplete="off"
                    name="lPassword"
                    type="password"
                    value={lPassword}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    align={"start"}
                    direction={{base: "column", sm: "row"}}
                    justify={"space-between"}
                  >
                    <Link to="/register">
                      <Text align={"center"}>
                        No tienes cuenta? <LinkChakra color={"blue.400"}>Registrarme</LinkChakra>
                      </Text>
                    </Link>
                  </Stack>
                  <Button
                    _hover={{
                      bg: "blue.500",
                    }}
                    bg={"blue.400"}
                    color={"white"}
                    type="submit"
                  >
                    Ingresar
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
