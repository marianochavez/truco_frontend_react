import {Link, Outlet, useLocation} from "react-router-dom";
import {useContext} from "react";

import {PlayerContext} from "../../providers/PlayerProvider";

import WithSubnavigation from "./Appbar";

export const Navbar = () => {
  const {player, isLogged} = useContext(PlayerContext);
  const currentPath = useLocation().pathname;

  return (
    <>
      <WithSubnavigation />
      <nav className="nav-wrapper">
        <h2 className="animate__animated animate__bounce">
          <span>
            <i className="nes-logo" />
          </span>
          <span style={{color: "#6639A6"}}>T</span>a<span style={{color: "#3490DE"}}>T</span>e
          <span style={{color: "#6FE7DD"}}>T</span>i
        </h2>
        {isLogged && (
          <p className="nes-badge is-splited animate__animated animate__fadeIn animate__slow">
            <span className="is-primary">
              <i className="nes-icon heart is-small" />
              <i className="nes-icon is-half heart is-small" />
              <i className="nes-icon heart is-transparent is-small" />
            </span>
            <span className="is-dark">{`${player.name}`}</span>
          </p>
        )}
        <ul className="ul-nav">
          {currentPath !== "/" && (
            <li className="li-nav">
              <Link className="link" to="/">
                <p className="animate__animated animate__fadeIn animate__slow">Inicio</p>
              </Link>
            </li>
          )}
          {!isLogged && currentPath === "/" && (
            <li className="li-nav">
              <Link className="link" to="/register">
                <p className="animate__animated animate__fadeIn animate__slow">Registrarme</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
