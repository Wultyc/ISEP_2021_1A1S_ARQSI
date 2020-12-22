import IRepository from './interface/IRepository'
import IGlxDto from '../dto/interface/IGlxDto'
import logger from '../utils/Logger'
import axios from 'axios'

export default class MasterDataRepository implements IRepository{
    
    endpoint: String
    list: IGlxDto[]

    constructor(){
        this.endpoint = ""
        this.list = []
    }

    setEndpoint(endpoint: String){
        this.endpoint = endpoint
    }

    setList(list: IGlxDto[]){
        this.list = list
    }

    async save():Promise<boolean>{
        for (let index = 0; index < this.list.length; index++) {
            const entity = this.list[index]
            try{
                const entityResponse = await axios.post(this.endpoint as string, entity.data)
                this.list[index].system_id = entityResponse.data.id
                this.list[index].status = "OK"
                new logger().log("Record successfully imported", "glx_id", this.list[index].glx_id)
            } catch (e) {
                this.list[index].status = {"Error": e}
                new logger().logError({message:"Error importing record",details:e}, "glx_id", this.list[index].glx_id)
                return false
            }
        }

        return true
    }

}