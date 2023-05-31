import { Iplayer } from "./Iplayer";

export interface IgameState {
    onGoingGame: string | null,
    players: Iplayer[],
    turn: string,
    playerCount: number,
    filledCount: number,
    winMsg: null | string[],
    drawMsg: string,
    board: string[][]
}
