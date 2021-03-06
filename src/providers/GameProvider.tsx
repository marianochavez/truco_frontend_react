/* eslint-disable no-console */
import {createContext, useEffect, useState, useContext} from "react";

import {Response} from "../helpers/authApi";
import {
  createGame,
  joinGame,
  leaveGame,
  dealCards,
  showGame,
  playCard,
  goToDeck,
  burnCard,
} from "../helpers/boardApi";

import {PlayerContext} from "./PlayerProvider";

export interface Counters {
  counter_1: number;
  counter_2: number;
}

export interface PlayerGame {
  username: string;
  cards: string[];
  played_cards: string[];
}

export interface Member {
  member: "player_1" | "player_2" | "player_3" | "player_4" | "player_5" | "player_6" | null;
}

export interface Game {
  id: number;
  cards: string[];
  status: string;
  player_quantity: string;
  round: number;
  player_1: PlayerGame;
  player_2: PlayerGame;
  player_3: PlayerGame;
  player_4: PlayerGame;
  player_5: PlayerGame;
  player_6: PlayerGame;
  team_1: Member[];
  team_2: Member[];
}

interface GameContext {
  game: Game;
  isGameCreated: boolean;
  isGameJoined: boolean;
  currentPlayer: string;
  counter: Counters;
  clearGame: () => void;
  leave: (token: string) => Promise<Response>;
  playerCreateGame: (token: string, playerQuantity: number) => Promise<Response>;
  playerJoinGame: (token: string, idBoard: number, team: number) => Promise<Response>;
  playerPlayCard: (card: string) => Promise<Response>;
  checkGame: (token: string) => Promise<Response>;
  deal: (idBoard: number, token: string) => Promise<Response>;
  playerGoToDeck: () => Promise<Response>;
  playerBurnCard: (card: string) => Promise<Response>;
  incrementCounter: (counter: string) => void;
  decrementCounter: (counter: string) => void;
  resetCounter: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<GameContext>({
  game: {
    id: 0,
    cards: [],
    status: "",
    player_quantity: "",
    round: 0,
    player_1: {
      username: "",
      cards: [],
      played_cards: [],
    },
    player_2: {
      username: "",
      cards: [],
      played_cards: [],
    },
    player_3: {
      username: "",
      cards: [],
      played_cards: [],
    },
    player_4: {
      username: "",
      cards: [],
      played_cards: [],
    },
    player_5: {
      username: "",
      cards: [],
      played_cards: [],
    },
    player_6: {
      username: "",
      cards: [],
      played_cards: [],
    },
    team_1: [],
    team_2: [],
  },
  isGameCreated: false,
  isGameJoined: false,
  currentPlayer: "",
  counter: {
    counter_1: 0,
    counter_2: 0,
  },
  clearGame: () => {},
  leave: () => Promise.resolve({status: "ERROR", data: ""}),
  playerCreateGame: () => Promise.resolve({status: "ERROR", data: ""}),
  playerJoinGame: () => Promise.resolve({status: "ERROR", data: ""}),
  playerPlayCard: () => Promise.resolve({status: "ERROR", data: ""}),
  checkGame: () => Promise.resolve({status: "ERROR", data: ""}),
  deal: () => Promise.resolve({status: "ERROR", data: ""}),
  playerGoToDeck: () => Promise.resolve({status: "ERROR", data: ""}),
  playerBurnCard: () => Promise.resolve({status: "ERROR", data: ""}),
  incrementCounter: () => {},
  decrementCounter: () => {},
  resetCounter: () => {},
});

export const GameProvider = ({children}: Props) => {
  const [game, setGame] = useState<Game>(JSON.parse(localStorage.getItem("game") || "{}"));
  const {player} = useContext(PlayerContext);
  const [isGameCreated, setIsGameCreated] = useState<boolean>(
    game.id === 0 || Object.entries(game).length === 0 ? false : true,
  );
  const [isGameJoined, setIsGameJoined] = useState<boolean>(
    (game.status === "Playing" ? true : false) || false,
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    localStorage.getItem("currentPlayer") || "",
  );
  const [counter, setCounter] = useState<Counters>(
    JSON.parse(localStorage.getItem("counter") || "{}"),
  );

  useEffect(() => {
    const gameData = JSON.parse(localStorage.getItem("game") || "{}");

    if (gameData) setGame(gameData);
  }, []);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    const current = localStorage.getItem("currentPlayer") || "";

    if (current) setCurrentPlayer(current);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPlayer", currentPlayer);
  }, [currentPlayer]);

  useEffect(() => {
    const counterLocal = JSON.parse(localStorage.getItem("counter") || "{}");

    if (counterLocal) {
      setCounter(counterLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [counter]);

  const playerCreateGame = async (token: string, playerQuantity: number) => {
    if (isGameCreated) return {status: "ERROR", data: "Game already created"};

    const res = await createGame(token, playerQuantity);

    if (res.status === "OK") {
      setGame(res.data);
      setIsGameCreated(true);
      setCurrentPlayer(checkCurrentPlayer(res.data));
      resetCounter();
    } else {
      console.log(res.data);
    }

    return res;
  };

  const playerJoinGame = async (token: string, idBoard: number, team: number) => {
    const res = await joinGame(token, idBoard, team);

    if (res.status === "OK") {
      setGame(res.data);
      setIsGameCreated(true);
      setCurrentPlayer(checkCurrentPlayer(res.data));
      resetCounter();
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
      player_quantity: "",
      player_1: {
        username: "",
        cards: [],
        played_cards: [],
      },
      player_2: {
        username: "",
        cards: [],
        played_cards: [],
      },
      player_3: {
        username: "",
        cards: [],
        played_cards: [],
      },
      player_4: {
        username: "",
        cards: [],
        played_cards: [],
      },
      player_5: {
        username: "",
        cards: [],
        played_cards: [],
      },
      player_6: {
        username: "",
        cards: [],
        played_cards: [],
      },
      team_1: [],
      team_2: [],
    });
  };

  const leave = async (token: string) => {
    if (game.id !== 0) {
      const res = await leaveGame(game.id, token);

      if (res.status === "OK") {
        setIsGameJoined(false);
        setIsGameCreated(false);
        clearGame();
        setCurrentPlayer("");
        resetCounter();
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
      setCurrentPlayer(checkCurrentPlayer(res.data));
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

  const checkCurrentPlayer = (game: Game) => {
    if (game.player_1.username === player.username) return "player_1";
    if (game.player_2.username === player.username) return "player_2";
    if (game.player_3.username === player.username) return "player_3";
    if (game.player_4.username === player.username) return "player_4";
    if (game.player_5.username === player.username) return "player_5";
    if (game.player_6.username === player.username) return "player_6";

    return "";
  };

  const playerPlayCard = async (card: string) => {
    const res = await playCard(game.id, player.token, currentPlayer, card);

    if (res.status === "OK") {
      setGame(res.data);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const playerGoToDeck = async () => {
    const res = await goToDeck(game.id, player.token, currentPlayer);

    if (res.status === "OK") {
      setGame(res.data);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const playerBurnCard = async (card: string) => {
    const res = await burnCard(game.id, player.token, currentPlayer, card);

    if (res.status === "OK") {
      setGame(res.data);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const incrementCounter = (counterSel: string) => {
    const counterValue: any = counter[counterSel as keyof Counters];

    setCounter({...counter, [counterSel]: counterValue + 1});
  };

  const decrementCounter = (counterSel: string) => {
    const counterValue: any = counter[counterSel as keyof Counters];

    if (counterValue === 0) return;

    setCounter({...counter, [counterSel]: counterValue - 1});
  };

  const resetCounter = () => {
    setCounter({
      counter_1: 0,
      counter_2: 0,
    });
  };

  return (
    <GameContext.Provider
      value={{
        game,
        isGameCreated,
        isGameJoined,
        currentPlayer,
        counter,
        clearGame,
        leave,
        playerCreateGame,
        playerJoinGame,
        playerPlayCard,
        checkGame,
        deal,
        playerGoToDeck,
        playerBurnCard,
        incrementCounter,
        decrementCounter,
        resetCounter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
