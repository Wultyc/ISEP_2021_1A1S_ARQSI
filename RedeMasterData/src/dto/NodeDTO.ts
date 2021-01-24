import IDto from './interface/IDto'

export default class NodeDTO implements IDto{
    id: String
    _id?: String | undefined
    shortName: String
    name: String
    longitude: String
    latitude: String
    collectionNode: boolean
    surrenderNode: boolean
    tempoMaxParagem?: String
}