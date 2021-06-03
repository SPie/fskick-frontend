import client, {ResponseData} from './client'
import {AxiosInstance} from 'axios'
import {SeasonsTableResponse} from '@/api/responses/games'

class SeasonsService {

   client: AxiosInstance

   constructor(client: AxiosInstance) {
      this.client = client
   }

   getSeasonsTable(): Promise<SeasonsTableResponse> {
      return this.client.get("/seasons/table").then((response: ResponseData) => response.data as SeasonsTableResponse)
   }
}

export default new SeasonsService(client)