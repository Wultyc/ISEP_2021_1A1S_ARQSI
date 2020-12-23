import LineDTO from '../dto/LineDTO'
import LineMapper from '../mappers/LineMapper'
import Result from '../utils/Result'

export default class LineService {

    dto: LineDTO
    mapper: LineMapper
    result!: Result

    constructor(lineDTO: LineDTO = new LineDTO(), lineMapper: LineMapper = new LineMapper()) {
        this.dto = lineDTO
        this.mapper = lineMapper
    }


}