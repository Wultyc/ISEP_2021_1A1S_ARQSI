import IService from './interface/IService'
import LineDTO from '../dto/LineDTO'
import LineMapper from '../mappers/LineMapper'

export class LineService implements IService {
    runService(): boolean | Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}