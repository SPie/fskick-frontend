import client, {ResponseData} from './client'
import {AxiosInstance} from 'axios'
import { GamesCountResponse } from '@/api/responses/games'

class GamesService {

    client: AxiosInstance

    constructor(client: AxiosInstance) {
        this.client = client
    }

    getGamesCount(): Promise<GamesCountResponse> {
        return this.client.get('/games/count').then((response: ResponseData) => response.data as GamesCountResponse)
    }
}

export default new GamesService(client)
