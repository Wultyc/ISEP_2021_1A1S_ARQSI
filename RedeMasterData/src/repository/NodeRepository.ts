import IRepository from './interface/IRepository'
import Node from '../models/mongo/Node'
import NodeDTO from '../dto/NodeDTO'
import { Model } from 'mongoose';

export default class NodeRepository implements IRepository{

    save(dto: NodeDTO, callback):void {
        const newNode = new Node(dto);
        newNode.save(callback)
        console.log(callback)
    }

    load(query: any, sort: any, callback):void {
        Node.find(query, callback).sort(sort)
    }

    loadById(id: string, callback):void {
        Node.findOne({ "_id": id }, callback);
    }

    delete(id: string, callback):void {
        Node.findByIdAndRemove(id, callback)
    }

}