import IRepository from './interface/IRepository'
import IDto from '../dto/interface/IDto'
import axios from 'axios'

export default class MasterDataRepository implements IRepository{
    
    endpoint: String
    list: IDto[]

    constructor(){
        this.endpoint = ""
        this.list = <IDto>{}
    }

    setEndpoint(endpoint: String){
        this.endpoint = endpoint
    }

    setList(list: IDto[]){
        this.list = list
    }

    async save():Promise<boolean>{
        for (let index = 0; index < this.list.length; index++) {
            const entity = this.list[index]
            const entityResponse = await axios.post(this.endpoint as string, entity.data)
            this.list[index].system_id = entityResponse.data.id
            this.list[index].status = "OK"
        }

        return true
    }

}