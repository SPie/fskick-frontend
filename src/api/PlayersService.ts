import client, {ResponseData} from './client'
import {AxiosInstance} from 'axios'
import { PlayersResponse } from '@/api/responses/players'

class PlayersService {

    client: AxiosInstance

    constructor(client: AxiosInstance) {
        this.client = client
    }

    getPlayers(sortName?: string): Promise<PlayersResponse> {
        let path = '/players'
        if (sortName) {
            path += ('?sort=' + sortName)
        }

        return this.client.get(path).then((response: ResponseData) => response.data as PlayersResponse)
    }
}

export default new PlayersService(client)
