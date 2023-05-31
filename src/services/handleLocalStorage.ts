import { Iplayer } from '../models/Iplayer';
import { IgameState } from '../models/IgameState';
export interface LocalStorageItem {
  key: keyof IgameState;
  value: { value: IgameState[keyof IgameState] };
}

export const checkPlayers: string | null = localStorage.getItem('players');

export const removePlayers = () => {
  localStorage.removeItem('players');
};

export const addUser = (array: Iplayer[], player: Iplayer) => {
  const playersInfo = [...array];
  playersInfo.push(player);
  localStorage.setItem('players', JSON.stringify(playersInfo));
};

export const updateLocalstorage = (array:any) => {
 console.log(array);
}
