import {PlayerStats, PlayerStatsWithAttendances} from './types';
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

export interface PlayersResponseWithAttendances {
  playerStats: PlayerStatsWithAttendances[];
}

export interface PlayerResponse {
  player: PlayerStatsWithAttendances;
}

export const getPlayer = async (uuid: string, sortName?: string): Promise<PlayerResponse> => {
  let path = '/players/' + uuid;
  if (sortName) {
    path += ('?sort=' + sortName);
  }

  return await get(path).then((response: PlayersResponseWithAttendances) => {
    return {player: response.playerStats[0]}
  });
}