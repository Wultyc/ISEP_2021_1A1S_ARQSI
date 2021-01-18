import IDto from './interface/IDto'

export default class NodeDTO implements IDto{
    id: String
    shortName: String
    name: String
    longitude: String
    latitude: String
    collectionNode: boolean
    surrenderNode: boolean
    tempoMaxParagem?: String
}