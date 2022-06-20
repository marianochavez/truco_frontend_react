/* eslint-disable no-console */
import {createContext, useEffect, useState} from "react";

import {Response} from "../helpers/authApi";
import {createGame, joinGame, leaveGame, dealCards, showGame} from "../helpers/boardApi";

interface PlayerGame {
  username: string;
  cards: string[];
}

interface Game {
  id: number;
  cards: string[];
  status: string;
  playerQuantity: number;
  round: number;
  player1: PlayerGame;
  player2: PlayerGame;
  player3: PlayerGame;
  player4: PlayerGame;
  player5: PlayerGame;
  player6: PlayerGame;
}

interface GameContext {
  game: Game;
  isGameCreated: boolean;
  isGameJoined: boolean;
  playerQuantity: number;
  clearGame: () => void;
  leave: (token: string) => Promise<Response>;
  playerCreateGame: (token: string, playerQuantity: number) => Promise<Response>;
  playerJoinGame: (token: string, isBoard: number) => Promise<Response>;
  checkGame: (token: string) => Promise<Response>;
  deal: (idBoard: number, token: string) => Promise<Response>;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<GameContext>({
  game: {
    id: 0,
    cards: [],
    status: "",
    playerQuantity: 0,
    round: 0,
    player1: {
      username: "",
      cards: [],
    },
    player2: {
      username: "",
      cards: [],
    },
    player3: {
      username: "",
      cards: [],
    },
    player4: {
      username: "",
      cards: [],
    },
    player5: {
      username: "",
      cards: [],
    },
    player6: {
      username: "",
      cards: [],
    },
  },
  isGameCreated: false,
  isGameJoined: false,
  playerQuantity: 0,
  clearGame: () => {},
  leave: () => Promise.resolve({status: "ERROR", data: ""}),
  playerCreateGame: () => Promise.resolve({status: "ERROR", data: ""}),
  playerJoinGame: () => Promise.resolve({status: "ERROR", data: ""}),
  checkGame: () => Promise.resolve({status: "ERROR", data: ""}),
  deal: () => Promise.resolve({status: "ERROR", data: ""}),
});

export const GameProvider = ({children}: Props) => {
  const [game, setGame] = useState<Game>(JSON.parse(localStorage.getItem("game") || "{}"));
  const [isGameCreated, setIsGameCreated] = useState<boolean>(
    game.id === 0 || Object.entries(game).length === 0 ? false : true,
  );
  const [isGameJoined, setIsGameJoined] = useState<boolean>(
    (game.status === "Playing" ? true : false) || false,
  );
  const [playerQuantity, setPlayerQuantity] = useState<number>(game.playerQuantity || 0);

  useEffect(() => {
    const gameData = JSON.parse(localStorage.getItem("game") || "{}");

    if (gameData) setGame(gameData);
  }, []);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(game));
  }, [game]);

  const playerCreateGame = async (token: string, playerQuantity: number) => {
    if (isGameCreated) return {status: "ERROR", data: "Game already created"};

    const res = await createGame(token, playerQuantity);

    if (res.status === "OK") {
      setGame(res.data);
      setIsGameCreated(true);
      setPlayerQuantity(playerQuantity);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const playerJoinGame = async (token: string, idBoard: number) => {
    const res = await joinGame(token, idBoard);

    if (res.status === "OK") {
      setGame(res.data);
      setIsGameJoined(true);
      setIsGameCreated(true);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const clearGame = () => {
    setIsGameCreated(false);
    setIsGameJoined(false);
    setGame({
      id: 0,
      cards: [],
      status: "",
      round: 0,
      playerQuantity: 0,
      player1: {
        username: "",
        cards: [],
      },
      player2: {
        username: "",
        cards: [],
      },
      player3: {
        username: "",
        cards: [],
      },
      player4: {
        username: "",
        cards: [],
      },
      player5: {
        username: "",
        cards: [],
      },
      player6: {
        username: "",
        cards: [],
      },
    });
    setPlayerQuantity(0);
  };

  const leave = async (token: string) => {
    if (game.id !== 0) {
      const res = await leaveGame(game.id, token);

      if (res.status === "OK") {
        setIsGameJoined(false);
        setIsGameCreated(false);
        clearGame();
      } else {
        console.log(res.data);
      }

      return res;
    }

    return {status: "ERROR", data: ""};
  };

  const checkGame = async (token: string) => {
    const res = await showGame(game.id, token);

    if (res.status === "OK") {
      setGame(res.data);
      if (res.data.status === "Playing") setIsGameJoined(true);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const deal = async (idBoard: number, token: string) => {
    const res = await dealCards(idBoard, token);

    if (res.status === "OK") {
      setGame(res.data);
    } else {
      console.log(res.data);
    }

    return res;
  };

  return (
    <GameContext.Provider
      value={{
        game,
        isGameCreated,
        isGameJoined,
        playerQuantity,
        clearGame,
        leave,
        playerCreateGame,
        playerJoinGame,
        checkGame,
        deal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
