import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Container} from "@chakra-ui/react";

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
      <Container pt={8}>
        <Flex
          align={"center"}
          bg="white"
          border="1px"
          borderRadius="10px"
          borderWidth="3px"
          justify={"center"}
          p={8}
        >
          <Stack maxW={"lg"} mx={"auto"} spacing={8}>
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
            <Box bg={"white"} rounded={"lg"}>
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
                          No tienes cuenta? <span style={{color: "blue"}}>Registrarme</span>
                        </Text>
                      </Link>
                    </Stack>
                    <Button colorScheme="yellow" type="submit">
                      Ingresar
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </>
  );
}
