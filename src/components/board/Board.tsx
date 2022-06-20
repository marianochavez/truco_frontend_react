import {useContext, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {BoardContext} from "../../providers/GameProvider";
import {PlayerContext} from "../../providers/PlayerProvider";

import {Square} from "./Square";

export const Board = () => {
  const navigate = useNavigate();
  const {board, squares, winner, isBoardCreated, isBoardJoined, playIn, clearBoard, checkWinner} =
    useContext(BoardContext);
  const {player} = useContext(PlayerContext);

  useEffect(() => {
    checkWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  const handlePlay = (index: number) => {
    playIn(index, player);
  };

  const handleReset = () => {
    clearBoard();
    navigate("/");
  };

  if (!isBoardCreated || !isBoardJoined) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container main-cointainer animate__animated animate__fadeIn animate__slow">
      <p
        className={`nes-balloon from-right nes-pointer ${
          winner && "animate__animated animate__tada"
        }`}
      >
        {!winner && `${board.turn === "X" ? board.X || "..." : board.O || "..."},es tu turno!`}
        {winner && winner !== "Empate" && `Ganaste ${winner}!`}
        {winner && winner === "Empate" && "Empate!"}
      </p>

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            return (
              <Square
                key={index}
                value={squares[index]}
                winner={winner}
                onClick={() => handlePlay(index)}
              />
            );
          })}
      </div>
      <div className="container">
        {winner && (
          <button className="nes-btn is-warning" onClick={handleReset}>
            Volver a jugar
          </button>
        )}
      </div>
    </div>
  );
};
