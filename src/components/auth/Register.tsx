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
  Container,
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {register} = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {lUsername, lName, lPassword, lConfirmPassword} = formValues as RegisterFormProps;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (lPassword !== lConfirmPassword) {
      setError("Las contraseñas no coinciden");

      return;
    }

    const res = await register(lUsername, lName, selectedFile, lPassword, lConfirmPassword);

    setIsLoading(false);
    if (res.status == "OK") {
      navigate("/login");
    } else {
      setError(JSON.stringify(res.data, null, 2));
    }
  };

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
          className="animate__animated animate__fadeIn"
          justify={"center"}
          p={8}
        >
          <Stack maxW={"lg"} mx={"auto"} spacing={8}>
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
            <Box bg={"white"} rounded={"lg"}>
              <form onSubmit={(e) => handleRegister(e)}>
                <Stack spacing={4}>
                  <FormControl isRequired id="firstName">
                    <FormLabel>Usuario</FormLabel>
                    <Input
                      required
                      bg="gray.300"
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
                      bg="gray.300"
                      name="lName"
                      type="text"
                      value={lName}
                      onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    />
                  </FormControl>
                  <FormControl id="avatar">
                    <FormLabel>Imagen (500 x 500)</FormLabel>
                    <Input
                      border={"none"}
                      type="file"
                      onChange={handleFileChange as React.ChangeEventHandler<HTMLInputElement>}
                    />
                  </FormControl>
                  <FormControl isRequired id="password">
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup>
                      <Input
                        bg="gray.300"
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
                        bg="gray.300"
                        name="lConfirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={lConfirmPassword}
                        onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                      />
                    </InputGroup>
                  </FormControl>
                  <Stack pt={2} spacing={10}>
                    <Button
                      colorScheme="yellow"
                      isLoading={isLoading ? true : false}
                      loadingText={"Registrando..."}
                      type="submit"
                    >
                      Registrarme
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Link to="/login">
                      <Text align={"center"}>
                        Tienes cuenta? <span style={{color: "blue"}}>Ingresar</span>
                      </Text>
                    </Link>
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
