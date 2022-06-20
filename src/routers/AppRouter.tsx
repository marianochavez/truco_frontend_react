import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {Game} from "../components/board/Game";
import {Home} from "../components/board/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/">
          <Route element={<Game />} path="game" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            <main style={{padding: "1rem"}}>
              <p>No hay nada por aqui! 404 :(</p>
              <Link to="/">Ir al inicio</Link>
            </main>
          }
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
