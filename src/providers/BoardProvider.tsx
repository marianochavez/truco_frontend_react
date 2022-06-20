import {createContext, useEffect, useState} from "react";

import {createBoard, historical, joinGame, leave, play, show} from "../helpers/boardApi";

import {Player} from "./PlayerProvider";

interface Board {
  id: number;
  table: (string | null)[];
  state: string;
  winner: string | null;
  turn: string;
  token: string;
  myTurn: boolean;
  X: string;
  O: string;
}

interface BoardContext {
  board: Board;
  isBoardCreated: boolean;
  isBoardJoined: boolean;
  squares: (string | null)[];
  currentPlayer: string | null;
  winner: string | null;
  playIn: (index: number, players: Player) => void;
  clearBoard: () => void;
  checkWinner: () => void;
  getHistorical: (username1: string, username2: string) => Promise<any>;
  leaveBoard: (token: string) => Promise<any>;
  userCreateBoard: (token: string) => Promise<any>;
  userJoinGame: (token: string, boardToken: string) => Promise<any>;
  checkBoard: (token: string) => Promise<any>;
}

interface Props {
  children: React.ReactNode;
}

export const BoardContext = createContext<BoardContext>({
  board: {
    id: 0,
    table: [],
    state: "",
    winner: null,
    myTurn: false,
    turn: "",
    token: "",
    X: "",
    O: "",
  },
  isBoardCreated: false,
  isBoardJoined: false,
  squares: [],
  currentPlayer: null,
  winner: null,
  clearBoard: () => {},
  playIn: () => {},
  checkWinner: () => {},
  getHistorical: () => Promise.resolve(),
  leaveBoard: () => Promise.resolve(),
  userCreateBoard: () => Promise.resolve(),
  userJoinGame: () => Promise.resolve(),
  checkBoard: () => Promise.resolve(),
});

export const BoardProvider = ({children}: Props) => {
  const [board, setBoard] = useState<Board>(JSON.parse(localStorage.getItem("board") || "{}"));
  const [isBoardCreated, setIsBoardCreated] = useState<boolean>(board.id ? true : false);
  const [isBoardJoined, setIsBoardJoined] = useState<boolean>(
    (board.state === "Playing" ? true : false) || false,
  );
  const [squares, setSquares] = useState<(string | null)[]>(board.table || []);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(board.turn || null);
  const [winner, setWinner] = useState<string | null>(board.winner || null);

  useEffect(() => {
    const boardData = JSON.parse(localStorage.getItem("board") || "{}");

    if (boardData) setBoard(boardData);
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const userCreateBoard = async (token: string) => {
    if (isBoardCreated) return;

    const board = await createBoard(token);

    if (board) {
      setBoard(board.data);
      setIsBoardCreated(true);
      setCurrentPlayer(board.data.turn);

      return board;
    } else {
      return false;
    }
  };

  const userJoinGame = async (token: string, boardToken: string) => {
    const res = await joinGame(token, boardToken);

    if (res) {
      setBoard(res.data);
      setIsBoardJoined(true);
      setIsBoardCreated(true);

      return res;
    } else {
      return false;
    }
  };

  const playIn = async (index: number, player: Player) => {
    if (board.myTurn) {
      const playerTurn = player[parseInt(Object.keys(player)[0])];

      const playerPlay = await play(board.id, playerTurn.token, index);

      if (playerPlay?.board) {
        setBoard(playerPlay.board);
        setSquares(playerPlay.board.table);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const checkWinner = () => {
    if (board.winner) setWinner(board.winner);
  };

  const clearBoard = () => {
    setIsBoardCreated(false);
    setIsBoardJoined(false);
    setBoard({
      id: 0,
      table: [],
      state: "",
      winner: null,
      turn: "",
      token: "",
      myTurn: false,
      X: "",
      O: "",
    });
    setSquares([]);
    setCurrentPlayer(null);
    setWinner(null);
  };

  const getHistorical = async (username1: string, username2: string) => {
    const historicalBoards = await historical(username1, username2);

    if (historicalBoards) {
      return historicalBoards;
    }

    return [];
  };

  const leaveBoard = async (token: string) => {
    if (board.id) {
      await leave(board.id, token);
    } else {
      // eslint-disable-next-line no-console
      console.log("No board to leave");
    }
  };

  const checkBoard = async (token: string) => {
    const check = await show(board.id, token);

    if (check) {
      setBoard({...check.board, X: check.X, O: check.O});
      setSquares(check.board.table);
      if (check.board.state === "Playing") setIsBoardJoined(true);

      return check;
    } else {
      return false;
    }
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        isBoardCreated,
        isBoardJoined,
        currentPlayer,
        winner,
        squares,
        playIn,
        clearBoard,
        checkWinner,
        getHistorical,
        leaveBoard,
        userCreateBoard,
        userJoinGame,
        checkBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
