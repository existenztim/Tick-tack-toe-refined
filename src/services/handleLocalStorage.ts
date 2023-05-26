import { Iplayer } from '../models/Iplayer';

export const checkPlayers: string | null = localStorage.getItem('players');

export const removePlayers = () => {
  localStorage.removeItem('players');
};

export const addUser = (array: Iplayer[], player: Iplayer) => {
  const playersInfo = [...array];
  playersInfo.push(player);
  localStorage.setItem('players', JSON.stringify(playersInfo));
};
