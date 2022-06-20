import {useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

import {UserContext} from "../../providers/PlayerProvider";
import {BoardContext} from "../../providers/GameProvider";

import {Square} from "./Square";

export const Historical = () => {
  const {player, isLogged} = useContext(UserContext);
  const {getHistorical} = useContext(BoardContext);
  const [historical, setHistorical] = useState<any[]>([]);
  const [showBoard, setShowBoard] = useState(historical[0]);
  const username1 = player[parseInt(Object.keys(player)[0])].username;

  useEffect(() => {
    const historial = getHistorical(username1, "");

    historial.then((res) => {
      const historialFilter = res.data
        .filter((board: any) => board.state !== "Playing")
        .sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

      setHistorical(historialFilter);
      setShowBoard(historialFilter[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLogged) return <Navigate replace to="/" />;

  const handleInputChange = (e: any) => {
    if (e.target.name === "username") {
      const historial = getHistorical(username1, e.target.value);

      historial.then((res) => {
        const historialFilter = res.data
          .filter((board: any) => board.state !== "Playing")
          .sort((a: any, b: any) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });

        setHistorical(historialFilter);
        setShowBoard(historialFilter[0]);
      });
    }

    if (e.target.name === "boardId") {
      setShowBoard(
        historical.find((board: any) => board.id === parseInt(e.target.value)) || historical[0],
      );
    }
  };

  return (
    <div
      className="container animate__animated animate__fadeIn animate__slow"
      style={{marginBottom: "1em"}}
    >
      <h4>
        <i className="nes-icon trophy is-s" />
        Historial
        <i className="nes-icon trophy" />
      </h4>
      {historical.length === 0 && <p style={{margin: "1em"}}>No hay partidas registradas!</p>}
      {historical.length > 0 && (
        <div className="container animate__animated animate__fadeIn animate__slow">
          <div style={{margin: "10px"}}>
            <input
              className="nes-input"
              name="username"
              placeholder="Contrincante..."
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div style={{margin: "10px"}}>
            <input
              className="nes-input"
              name="boardId"
              placeholder="ID de partida..."
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="nes-container">
            <p>{`Partida: ${showBoard.id}`}</p>
            <p>{`Ganador: ${showBoard.winner === null ? "Ninguno" : showBoard.winner}`}</p>
            <p>{`Fecha: ${new Date(showBoard.created_at).toLocaleString()}`}</p>
            {showBoard.winner === null && <p>Abandonada!</p>}
            <div className="grid ">
              {showBoard.table.map((square: any, index: number) => {
                return (
                  <Square key={index} value={square} winner={showBoard.winner} onClick={() => {}} />
                );
              })}
            </div>
          </div>
          <hr />
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-centered">
              <thead>
                <tr>
                  <th>Tabla</th>
                  <th>Ganador</th>
                </tr>
              </thead>
              <tbody>
                {historical.map((historial) => (
                  <tr key={historial.id}>
                    <td>{historial.id}</td>
                    <td>{historial.winner ? historial.winner : "Abandonada"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
