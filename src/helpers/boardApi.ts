/* eslint-disable no-console */
import axios from "axios";

import {Response} from "./authApi";

export const createGame = async (token: string, playerQuantity: number): Promise<Response> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games`,
      {
        player_quantity: playerQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const joinGame = async (token: string, gameId: number): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${gameId}/join-game`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const leaveGame = async (gameId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${gameId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const showGame = async (gameId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const dealCards = async (gameId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${gameId}/deal`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const playCard = async (
  gameId: number,
  token: string,
  player: string,
  card: string,
): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${gameId}/play-card`,
      {
        player: player,
        card: card,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
