import {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {GiCardJoker, GiCardPick, GiPokerHand} from "react-icons/gi";

import {PlayerContext} from "../../providers/PlayerProvider";
import {Game, GameContext} from "../../providers/GameProvider";
import {useForm} from "../../hooks/useForm";
import Appbar from "../ui/Appbar";

type TokenForm = {
  boardId: number;
  team: any;
  playerQuantity: any;
};

export const Home = () => {
  const currentPath = useLocation().pathname;
  const [formValues, handleInputChange] = useForm({
    boardId: 0,
    team: 0,
    playerQuantity: 0,
  } as TokenForm);
  const {boardId, playerQuantity, team} = formValues as TokenForm;
  const [error, setError] = useState(false);
  const {player, isLogged, logout} = useContext(PlayerContext);
  const {
    game,
    isGameCreated,
    isGameJoined,
    leave,
    clearGame,
    playerCreateGame,
    playerJoinGame,
    checkGame,
  } = useContext(GameContext);

  const handleCreateGame = async () => {
    if (playerQuantity === 0) return;

    await playerCreateGame(player.token, parseInt(playerQuantity));
  };

  const handleLogout = () => {
    leave(player.token);
    clearGame();
    logout();
  };

  const handleJoinGame = async () => {
    if (boardId === 0) return;
    if (team === 0) return;

    const res = await playerJoinGame(player.token, boardId, parseInt(team));

    res.status === "OK" ? setError(false) : setError(true);

    handleCheckGame();
  };

  const handleCheckGame = async () => {
    await checkGame(player.token);
  };

  // CHECK BOARD EVERY 5 MILISECONDS
  useEffect(() => {
    if (isLogged && isGameCreated) {
      const interval = setInterval(() => {
        handleCheckGame();
      }, 500);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameCreated]);

  return (
    <>
      <Appbar />
      <Container>
        {currentPath === "/" && (
          <VStack
            bg="green.300"
            border="2px"
            borderRadius="10px"
            className="animate__animated animate__fadeIn animate__slower"
            marginTop={5}
            p={4}
            spacing={2}
          >
            {currentPath === "/" && (
              <Flex alignItems="center" flexDir="row" justifyContent="center" pb={5}>
                <Image
                  border="1px"
                  mr={2}
                  src="https://res.cloudinary.com/chavedo/image/upload/v1655769658/mazo/7e.jpg"
                  w={10}
                />
                <Text fontSize={"4xl"} fontWeight="bold">
                  Bienvenido {`${player.name ? player.name : "al truco"} `}!
                </Text>
                <Image
                  border="1px"
                  ml={2}
                  src="https://res.cloudinary.com/chavedo/image/upload/v1655769658/mazo/7o.jpg"
                  w={10}
                />
              </Flex>
            )}
            {/* LOGIN */}
            {!isLogged && (
              <Box>
                <Link to="/login">
                  <Button colorScheme={"yellow"}>Iniciar sesión</Button>
                </Link>
              </Box>
            )}
            {/* CREAR PARTIDA */}
            {isLogged && !isGameCreated && !isGameJoined && currentPath === "/" && (
              <Stack direction={["column", "row"]}>
                <Select
                  bg="gray.300"
                  border="2px"
                  name="playerQuantity"
                  placeholder="Cantidad de jugadores"
                  value={playerQuantity}
                  onChange={handleInputChange as React.ChangeEventHandler<any>}
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                </Select>
                <Button
                  colorScheme={"yellow"}
                  pl={7}
                  pr={7}
                  rightIcon={<GiPokerHand size="30px" />}
                  onClick={handleCreateGame}
                >
                  Crear partida
                </Button>
              </Stack>
            )}
            {/* MOSTRAR ID DE PARTIDA CREADA */}
            {isLogged && !isGameJoined && isGameCreated && (
              <Box bg="gray.300" border={"2px"} borderRadius={"5px"} padding={4}>
                <Text color={"orange.900"}>ID de la partida: {`${game.id}`}</Text>
                <Text>Esperando jugadores...</Text>
                <Divider m={2} />
                <Flex>
                  <Box>
                    <VStack>
                      <Text fontSize="12px" fontWeight="bold">
                        EQUIPO 1
                      </Text>
                      {game.team_1
                        .filter((pl) => pl !== null)
                        .map((playerNum, index) => {
                          const player: any = game[playerNum as unknown as keyof Game];

                          return <Text key={index}>{player.username}</Text>;
                        })}
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box>
                    <VStack>
                      <Text fontSize="12px" fontWeight="bold">
                        EQUIPO 2
                      </Text>
                      {game.team_2
                        .filter((pl) => pl !== null)
                        .map((playerNum, index) => {
                          const player: any = game[playerNum as unknown as keyof Game];

                          return <Text key={index}>{player.username}</Text>;
                        })}
                    </VStack>
                  </Box>
                </Flex>
              </Box>
            )}
            {/* UNIRSE A PARTIDA */}
            {isLogged && !isGameCreated && !isGameJoined && currentPath === "/" && (
              <Box alignItems="center" display="flex" justifyContent="center" pt={3}>
                <FormControl>
                  <FormLabel fontWeight="bold">ID</FormLabel>
                  <Input
                    bg="gray.300"
                    border="1px"
                    borderColor={error ? "red.500" : "white"}
                    maxW="100px"
                    name="boardId"
                    type="number"
                    value={boardId}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Equipo</FormLabel>
                  <Select
                    bg="gray.300"
                    border="2px"
                    name="team"
                    placeholder="---------"
                    value={team}
                    onChange={handleInputChange as React.ChangeEventHandler<any>}
                  >
                    <option value={1}>Equipo 1</option>
                    <option value={2}>Equipo 2</option>
                  </Select>
                </FormControl>
                <Button
                  colorScheme={"yellow"}
                  marginLeft={2}
                  pl={8}
                  pr={8}
                  rightIcon={<GiCardPick size="20px" />}
                  onClick={handleJoinGame}
                >
                  Unirme
                </Button>
              </Box>
            )}
            {}
            {/* IR AL JUEGO */}
            {isGameCreated && isGameJoined && currentPath === "/" && (
              <Box alignItems="center" display="flex" flexDir="column" justifyContent="center">
                <Link to="/game">
                  <Button colorScheme={"yellow"}>Ir al juego</Button>
                </Link>
                <Divider m={4} />
                <Flex gap={4}>
                  <Box>
                    <VStack>
                      <Text fontSize="12px" fontWeight="bold">
                        EQUIPO 1
                      </Text>
                      {game.team_1
                        .filter((pl) => pl !== null)
                        .map((playerNum, index) => {
                          const player: any = game[playerNum as unknown as keyof Game];

                          return <Text key={index}>{player.username}</Text>;
                        })}
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box>
                    <VStack>
                      <Text fontSize="12px" fontWeight="bold">
                        EQUIPO 2
                      </Text>
                      {game.team_2
                        .filter((pl) => pl !== null)
                        .map((playerNum, index) => {
                          const player: any = game[playerNum as unknown as keyof Game];

                          return <Text key={index}>{player.username}</Text>;
                        })}
                    </VStack>
                  </Box>
                </Flex>
              </Box>
            )}
            {/* LOGOUT */}
            {isLogged && currentPath === "/" && (
              <Box pt={10}>
                <Button colorScheme={"red"} onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </Box>
            )}
          </VStack>
        )}
      </Container>
    </>
  );
};
