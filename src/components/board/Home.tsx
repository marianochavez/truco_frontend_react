import {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import {PlayerContext} from "../../providers/PlayerProvider";
import {BoardContext} from "../../providers/GameProvider";
import {useForm} from "../../hooks/useForm";
import Appbar from "../ui/Appbar";

type TokenForm = {
  boardToken: string;
};

export const Home = () => {
  const currentPath = useLocation().pathname;
  const [formValues, handleInputChange] = useForm({
    boardToken: "",
  } as TokenForm);
  const {boardToken} = formValues as TokenForm;
  const [error, setError] = useState(false);
  const {player, isLogged, logout} = useContext(PlayerContext);
  const {
    board,
    isBoardCreated,
    isBoardJoined,
    leaveBoard,
    clearBoard,
    userCreateBoard,
    userJoinGame,
    checkBoard,
  } = useContext(BoardContext);

  const handleCreateBoard = async () => {
    await userCreateBoard(player.token);
  };

  const handleLogout = () => {
    leaveBoard(player.token);
    clearBoard();
    logout();
  };

  const handleJoinBoard = async () => {
    if (boardToken.length === 0) return;
    const res = await userJoinGame(player.token, boardToken.trim());

    !res ? setError(true) : setError(false);
    handleCheckBoard();
  };

  const handleCheckBoard = async () => {
    await checkBoard(player.token);
  };

  // CHECK BOARD EVERY 5 MILISECONDS
  useEffect(() => {
    if (isLogged && isBoardCreated) {
      const interval = setInterval(() => {
        handleCheckBoard();
      }, 500);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBoardCreated]);

  return (
    <>
      <Appbar />
      <div
        className="container animate__animated animate__fadeIn animate__slow"
        style={{padding: "2em"}}
      >
        {!isLogged && (
          <Link className="nes-btn is-warning" to="/login">
            Iniciar sesión
          </Link>
        )}
        {isLogged && !isBoardCreated && !isBoardJoined && currentPath == "/" && (
          <div className="container">
            <label htmlFor="token_field">Unirse a partida</label>
            <input
              className={`nes-input ${error && "animate__animated animate__shakeX is-error"}`}
              id="token_field"
              name="boardToken"
              placeholder="Ingresar código"
              type="text"
              value={boardToken}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
            />
            <button className="nes-btn is-warning" onClick={handleJoinBoard}>
              Unirme
            </button>
          </div>
        )}
        {isLogged && !isBoardJoined && isBoardCreated && (
          <div className="nes-container container animate__animated animate__rubberBand">
            <h4>Código del juego:</h4>
            <p style={{color: "red"}}>
              <span>
                <i className="nes-icon coin " />
              </span>{" "}
              {`${board.token}`}
              <span /> <i className="nes-icon coin " />
            </p>
            <p>Esperando jugador 2...</p>
          </div>
        )}
        {isLogged && !isBoardCreated && currentPath == "/" && (
          <button className="nes-btn is-success" onClick={handleCreateBoard}>
            Crear juego
          </button>
        )}
        {isBoardCreated && isBoardJoined && currentPath === "/" && (
          <Link className="nes-btn is-warning" to="/game">
            Ir al juego
          </Link>
        )}
        {isLogged && currentPath === "/" && (
          <button className="nes-btn is-error" onClick={() => handleLogout()}>
            {`Salir ${player?.name || "jugador 1"}`}
          </button>
        )}
      </div>
    </>
  );
};
