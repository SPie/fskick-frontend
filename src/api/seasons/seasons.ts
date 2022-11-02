import {get} from '../client';
import {PlayerStats, Season} from '../types';

export interface SeasonsResponse {
  seasons: Season[]
}

export const getSeasons = async (): Promise<SeasonsResponse> => {
  return await get('/seasons').then(response => response.data);
};

export interface SeasonsTableResponse {
  season: Season;
  playerStats: PlayerStats[];
}

export const getSeasonsTable = async (season?: string, sortName?: string): Promise<SeasonsTableResponse> => {
  let path = '/seasons/table';
  if (season) {
    path += ('/' + season);
  }
  if (sortName) {
    path += ('?sort=' + sortName)
  }

  return await get(path).then(response => response.data);
};