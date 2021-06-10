import {Season} from '@/models/games'
import {PlayerStats} from '@/models/players'

export interface SeasonsResponse {
    seasons: Season[]
}

export interface SeasonsTableResponse {
    season: Season
    playerStats: PlayerStats[]
}