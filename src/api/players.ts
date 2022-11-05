import {PlayerStats} from './types';
import {get} from './client';

export interface PlayersResponse {
  playerStats: PlayerStats[]
}

export const getPlayers = async (sortName?: string): Promise<PlayersResponse> => {
  let path = '/players';
  if (sortName) {
    path += ('?sort=' + sortName);
  }

  return await get(path).then();
}