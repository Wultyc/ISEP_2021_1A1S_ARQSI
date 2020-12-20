import IDto from './interface/IDto'

export default class NodeDTO implements IDto {
    node!: {
        system_id: String
        glx_id: String
        data: {
            shortName: String
            name: String
            longitude: String
            latitude: String
            collectionNode: boolean
            surrenderNode: boolean
        }
    } 
    status: String = "Not Processed"
}