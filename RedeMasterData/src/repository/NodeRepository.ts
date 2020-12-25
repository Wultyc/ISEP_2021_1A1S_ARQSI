import IRepository from './interface/IRepository'
import Node from '../models/mongo/Node'
import NodeDTO from '../dto/NodeDTO'
import { Result } from '../core/logic/Result';

export default class NodeRepository implements IRepository {

    async save(dto: NodeDTO): Promise<Result<NodeDTO>> {
        let mongoError: any = ""
        const newNode = new Node(dto);
        const repositoryResult = await newNode.save().catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async load(query: any, sort: any): Promise<Result<NodeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Node.find(query).sort(sort).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async loadById(id: string): Promise<Result<NodeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Node.findOne({ "_id": id }).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

    async delete(id: string): Promise<Result<NodeDTO>> {
        let mongoError: any = ""
        const repositoryResult = await Node.findByIdAndRemove(id).catch((error) => {
            mongoError = error
        });

        if (!repositoryResult) {
            return Result.fail<any>({error:mongoError.message})
        }

        return Result.ok<any>(repositoryResult)
    }

}