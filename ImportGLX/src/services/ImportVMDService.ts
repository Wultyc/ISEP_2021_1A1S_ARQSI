import IService from './interface/IService'
import GlxFileDto from '../dto/glxFileDto'
import StoreGlxRepository from '../repository/StoreGlxRepository'
import MasterDataRepository from '../repository/MasterDataRepository'

import IGlxDto from '../dto/interface/IGlxDto'
import NetworkDTO from '../dto/network/NetworkDto'
import ScheduleDto from '../dto/trip/ScheduleDto'
import TripDto from '../dto/trip/TripDto'

import TripMapper from '../mappers/schedule/TripMapper'

import { config } from 'node-config-ts'
import logger from '../utils/Logger'

export default class ImportVMDService implements IService {

    storeGlxRepository: StoreGlxRepository
    glxDto: GlxFileDto
    network: NetworkDTO
    schedule: any;
    trips: TripDto[] = []
    noRepositoryError: boolean

    constructor(glx: GlxFileDto, network:NetworkDTO, repo: StoreGlxRepository = new StoreGlxRepository) {
        this.glxDto = glx
        this.network = network
        this.storeGlxRepository = repo
        this.noRepositoryError = true
    }
    exportData(): ScheduleDto{
        return {dummy:""}
    }

    async runService(): Promise<boolean> {
        this.storeGlxRepository.setFilepath(this.glxDto.filepath)
        const rawData: any = await this.storeGlxRepository.load()
        this.schedule = rawData.GlDocumentInfo.world[0].GlDocument[0].GlDocumentSchedule[0].Schedule[0]
        this.processSchedule()
        return this.noRepositoryError
    }

    private async processSchedule() {
        await this.processTrips()
    }

    private async processTrips() {
        new logger().log("Processing Vehicle Types")
        const tmap = new TripMapper()
        this.trips = this.schedule.Trips[0].Trip.map(v => tmap.mapFromGLX(v, new TripDto, this.network.routes, this.network.lines))
        await this.callRepository(config.endpoints.viagemMasterData.trip, this.trips, new MasterDataRepository())
    }

    private async callRepository(endpoint: String, list:IGlxDto[], repository: MasterDataRepository){
        repository.setEndpoint(endpoint)
        repository.setList(list)
        if (this.noRepositoryError){
            this.noRepositoryError = await repository.save()
        }
    }
}