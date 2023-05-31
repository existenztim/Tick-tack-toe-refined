import { Iplayer } from '../models/Iplayer';
import { IgameState } from '../models/IgameState';

export const checkPlayers: string | null = localStorage.getItem('players');
export const checkGameState: string | null = localStorage.getItem('gameState');

export const removePlayers = () => {
  localStorage.removeItem('players');
};

export const addUser = (array: Iplayer[], player: Iplayer) => {
  const playersInfo = [...array];
  playersInfo.push(player);
  localStorage.setItem('players', JSON.stringify(playersInfo));
};

export const updateLocalstorage = (state:IgameState) => {
  localStorage.setItem('gameState', JSON.stringify(state));
}
