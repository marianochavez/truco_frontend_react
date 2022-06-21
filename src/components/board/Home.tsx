import {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Button, Input, Select, Stack, Text, VStack} from "@chakra-ui/react";

import {PlayerContext} from "../../providers/PlayerProvider";
import {GameContext} from "../../providers/GameProvider";
import {useForm} from "../../hooks/useForm";
import Appbar from "../ui/Appbar";

type TokenForm = {
  boardId: number;
  playerQuantity: any;
};

export const Home = () => {
  const currentPath = useLocation().pathname;
  const [formValues, handleInputChange] = useForm({
    boardId: 0,
    playerQuantity: 0,
  } as TokenForm);
  const {boardId, playerQuantity} = formValues as TokenForm;
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
    const res = await playerJoinGame(player.token, boardId);

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
      <VStack marginTop={5} spacing={2}>
        {currentPath === "/" && <Text fontSize={"4xl"}>Bienvenido {player.name}!</Text>}
        {/* LOGIN */}
        {!isLogged && (
          <Box>
            <Link to="/login">
              <Button colorScheme={"facebook"}>Iniciar sesión</Button>
            </Link>
          </Box>
        )}
        {/* CREAR PARTIDA */}
        {isLogged && !isGameCreated && !isGameJoined && currentPath === "/" && (
          <Stack direction={["column", "row"]}>
            <Select
              name="playerQuantity"
              placeholder="Cantidad de jugadores"
              value={playerQuantity}
              onChange={handleInputChange as React.ChangeEventHandler<any>}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </Select>
            <Button colorScheme={"purple"} onClick={handleCreateGame}>
              Crear partida
            </Button>
          </Stack>
        )}
        {/* MOSTRAR ID DE PARTIDA CREADA */}
        {isLogged && !isGameJoined && isGameCreated && (
          <Box border={"1px"} borderRadius={"2px"} padding={2}>
            <Text color={"yellow.800"}>ID de la partida: {`${game.id}`}</Text>
            <Text>Esperando jugadores...</Text>
          </Box>
        )}
        {/* UNIRSE A PARTIDA */}
        {isLogged && !isGameCreated && !isGameJoined && currentPath === "/" && (
          <Box alignItems="center" display="flex" justifyContent="center" maxW={200}>
            <Input
              borderColor={error ? "red.500" : "white"}
              id="id_field"
              name="boardId"
              type="number"
              value={boardId}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
            <Button colorScheme={"green"} marginLeft={2} onClick={handleJoinGame}>
              Unirme
            </Button>
          </Box>
        )}
        {}
        {/* IR AL JUEGO */}
        {isGameCreated && isGameJoined && currentPath === "/" && (
          <Box>
            <Link to="/game">
              <Button colorScheme={"purple"}>Ir al juego</Button>
            </Link>
          </Box>
        )}
        {/* LOGOUT */}
        {isLogged && currentPath === "/" && (
          <Box>
            <Button colorScheme={"yellow"} onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Box>
        )}
      </VStack>
    </>
  );
};
