import client, {ResponseData} from './client'
import {AxiosInstance} from 'axios'
import { SeasonsResponse, SeasonsTableResponse} from '@/api/responses/games'

class SeasonsService {

   client: AxiosInstance

   constructor(client: AxiosInstance) {
      this.client = client
   }

   getSeasons(): Promise<SeasonsResponse> {
      return this.client.get('/seasons').then((response: ResponseData) => response.data as SeasonsResponse)
   }


   getSeasonsTable(seasonUuid?: string, sortName?: string): Promise<SeasonsTableResponse> {
      let path = '/seasons/table'
      if (seasonUuid) {
         path += ('/' + seasonUuid)
      }
      if (sortName) {
         path += ('?sort=' + sortName)
      }

      return this.client.get(path).then((response: ResponseData) => response.data as SeasonsTableResponse)
   }
}

export default new SeasonsService(client)