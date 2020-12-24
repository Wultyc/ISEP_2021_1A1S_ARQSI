import LineDTO from '../dto/LineDTO'
import LineMapper from '../mappers/LineMapper'
import LineRepository from '../repository/LineRepository'

export default class LineService {

    dto: LineDTO
    mapper: LineMapper
    repository: LineRepository

    constructor(lineDTO: LineDTO = new LineDTO(), lineMapper: LineMapper = new LineMapper(), lineRepository: LineRepository = new LineRepository) {
        this.dto = lineDTO
        this.mapper = lineMapper
        this.repository = lineRepository
    }


}