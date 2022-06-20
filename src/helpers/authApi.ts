/* eslint-disable no-console */
import axios from "axios";

export interface Response {
  status: string;
  data: any;
}

export const getPlayer = async (): Promise<Response> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/players`);

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createPlayer = async (
  username: string,
  name: string,
  password: string,
  confirmPassword: string,
): Promise<Response> => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/players`, {
      username,
      name,
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const signIn = async (username: string, password: string): Promise<Response> => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/players/sign-in`, {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const singOut = async (token: string): Promise<Response> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/players/sign-out`,
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
