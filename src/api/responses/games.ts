import {Season} from '@/models/games'
import {PlayerStats} from '@/models/players'

export interface SeasonsTableResponse {
    season: Season
    playerStats: PlayerStats[]
}