/* eslint-disable no-console */
import React, {createContext} from "react";
import {useState, useEffect} from "react";

import {createPlayer, Response, signIn, singOut} from "../helpers/authApi";

export interface Player {
  id: number;
  token: string;
  name: string;
  username: string;
}

interface Props {
  children: React.ReactNode;
}

interface PlayerContext {
  player: Player;
  isLogged: boolean;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => Promise<Response>;
  register: (
    username: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => Promise<Response>;
}

export const PlayerContext = createContext<PlayerContext>({
  player: {
    id: 0,
    token: "",
    name: "",
    username: "",
  },
  isLogged: false,
  login: () => Promise.resolve({status: "ERROR", data: ""}),
  logout: () => Promise.resolve({status: "ERROR", data: ""}),
  register: () => Promise.resolve({status: "ERROR", data: ""}),
});

export const PlayerProvider = ({children}: Props) => {
  const [player, setPlayer] = useState<Player>(JSON.parse(localStorage.getItem("player") || "{}"));
  const [isLogged, setIsLogged] = useState<boolean>(
    player?.id === 0 || Object.entries(player).length === 0 ? false : true,
  );

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem("player") || "{}");

    if (playerData) setPlayer(playerData);
  }, []);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  const login = async (username: string, password: string) => {
    const res = await signIn(username, password);

    if (res.status == "OK") {
      setPlayer({
        id: res.data.id,
        username: res.data.username,
        name: res.data.name,
        token: res.data.token,
      });
      setIsLogged(true);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const logout = async () => {
    const res = await singOut(player.token);

    if (res.status == "OK") {
      setPlayer({
        id: 0,
        username: "",
        name: "",
        token: "",
      });
      setIsLogged(false);
    } else {
      console.log(res.data);
    }

    return res;
  };

  const register = async (
    username: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) => {
    const res = await createPlayer(username, name, password, confirmPassword);

    if (res.status == "ERROR") {
      console.log(res.data);
    }

    return res;
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        isLogged,
        login,
        logout,
        register,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
