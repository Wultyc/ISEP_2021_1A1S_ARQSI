import IGlxDto from '../interface/IGlxDto'

export default class NodeDTO implements IGlxDto {
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
    status: any
}