import IService from './interface/IService'
import LineDTO from '../dto/LineDTO'
import LineMapper from '../mappers/LineMapper'

export default class LineService implements IService {

    lineDTO: LineDTO
    lineMapper: LineMapper

    constructor(lineDTO:LineDTO = new LineDTO(), lineMapper:LineMapper = new LineMapper()){
        this.lineDTO = lineDTO
        this.lineMapper = lineMapper
    }

    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}