import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link as LinkChakra,
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

import {useForm} from "../../hooks/useForm";
import {PlayerContext} from "../../providers/PlayerProvider";
import Appbar from "../ui/Appbar";

interface RegisterFormProps {
  lUsername: string;
  lName: string;
  lPassword: string;
  lConfirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, handleInputChange] = useForm({
    lUsername: "",
    lName: "",
    lPassword: "",
    lConfirmPassword: "",
  } as RegisterFormProps);
  const {register} = useContext(PlayerContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {lUsername, lName, lPassword, lConfirmPassword} = formValues as RegisterFormProps;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lPassword !== lConfirmPassword) {
      setError("Las contraseñas no coinciden");

      return;
    }
    const res = await register(lUsername, lName, lPassword, lConfirmPassword);

    if (res.status == "OK") {
      navigate("/login");
    } else {
      setError(JSON.stringify(res.data, null, 2));
    }
  };

  return (
    <>
      <Appbar />
      <Flex align={"center"} bg={"gray.50"} justify={"center"} minH={"100vh"}>
        <Stack maxW={"lg"} mx={"auto"} px={6} py={12} spacing={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Registrarme
            </Heading>
            {!error && (
              <Text color={"gray.600"} fontSize={"lg"}>
                para disfrutar de unas partidas de truco ✌️
              </Text>
            )}
            {error && (
              <Text color={"red.500"} fontSize={"lg"}>
                {error}
              </Text>
            )}
          </Stack>
          <Box bg={"white"} boxShadow={"lg"} p={8} rounded={"lg"}>
            <form onSubmit={(e) => handleRegister(e)}>
              <Stack spacing={4}>
                <FormControl isRequired id="firstName">
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    required
                    name="lUsername"
                    type="text"
                    value={lUsername}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </FormControl>
                <FormControl isRequired id="lastName">
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    required
                    name="lName"
                    type="text"
                    value={lName}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </FormControl>
                <FormControl isRequired id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      name="lPassword"
                      type={showPassword ? "text" : "password"}
                      value={lPassword}
                      onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="lConfirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={lConfirmPassword}
                      onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    />
                  </InputGroup>
                </FormControl>
                <Stack pt={2} spacing={10}>
                  <Button
                    _hover={{
                      bg: "blue.500",
                    }}
                    bg={"blue.400"}
                    color={"white"}
                    loadingText="Submitting"
                    size="lg"
                    type="submit"
                  >
                    Registrarme
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Link to="/login">
                    <Text align={"center"}>
                      Tienes cuenta? <LinkChakra color={"blue.400"}>Ingresar</LinkChakra>
                    </Text>
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
