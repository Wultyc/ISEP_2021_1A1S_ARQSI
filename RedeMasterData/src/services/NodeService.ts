import IService from './interface/IService'
import NodeDTO from '../dto/NodeDTO'
import NodeMapper from '../mappers/NodeMapper'

export class NodeService implements IService {
    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}