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

export const joinGame = async (token: string, idBoard: number): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${idBoard}/join-game`,
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

export const leaveGame = async (boardId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${boardId}/leave`,
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

export const showGame = async (boardId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/games/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const dealCards = async (boardId: number, token: string): Promise<Response> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/games/${boardId}/deal`,
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
