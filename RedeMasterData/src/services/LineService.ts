import LineDTO from '../dto/LineDTO'
import LineMapper from '../mappers/LineMapper'
import LineRepository from '../repository/LineRepository'
import Result from '../utils/Result'

export default class LineService {

    dto: LineDTO
    mapper: LineMapper
    repository: LineRepository
    result!: Result

    constructor(lineDTO: LineDTO = new LineDTO(), lineMapper: LineMapper = new LineMapper(), lineRepository: LineRepository = new LineRepository) {
        this.dto = lineDTO
        this.mapper = lineMapper
        this.repository = lineRepository
    }


}