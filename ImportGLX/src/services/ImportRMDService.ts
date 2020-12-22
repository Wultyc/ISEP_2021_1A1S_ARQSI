import IService from './interface/IService'
import GlxFileDto from '../dto/glxFileDto'
import StoreGlxRepository from '../repository/StoreGlxRepository'
import MasterDataRepository from '../repository/MasterDataRepository'

import IGlxDto from '../dto/interface/IGlxDto'
import vehicleTypeDTO from '../dto/VehicleTypeDto'
import NodeDto from '../dto/NodeDto'
import RouteDto from '../dto/RouteDto'
import LineDto from '../dto/LineDto'

import VehicleTypeMapper from '../mappers/VehicleTypeMapper'
import NodeMapper from '../mappers/NodeMapper'
import RouteMapper from '../mappers/RouteMapper'
import LineMapper from '../mappers/LineMapper'

import { config } from 'node-config-ts'
import logger from '../utils/Logger'

export default class StoreGLXService implements IService {

    storeGlxRepository: StoreGlxRepository
    glxDto: GlxFileDto
    network: any
    vehicleTypes: vehicleTypeDTO[] = []
    nodes: NodeDto[] = []
    routes: RouteDto[] = []
    lines: LineDto[] = []
    noRepositoryError: boolean

    constructor(glx: GlxFileDto, repo: StoreGlxRepository = new StoreGlxRepository) {
        this.glxDto = glx
        this.storeGlxRepository = repo
        this.noRepositoryError = true
    }

    async runService(): Promise<boolean> {
        this.storeGlxRepository.setFilepath(this.glxDto.filepath)
        const rawData: any = await this.storeGlxRepository.load()
        this.network = rawData.GlDocumentInfo.world[0].GlDocument[0].GlDocumentNetwork[0].Network[0]
        this.processNetwork()
        return this.noRepositoryError
    }

    private async processNetwork() {
        await this.processVehicleType()
        await this.processNodes()
        await this.processRoutes()
        await this.processLines()
    }

    private async processVehicleType() {
        new logger().log("Processing Vehicle Types")
        const vtmap = new VehicleTypeMapper()
        this.vehicleTypes = this.network.VehicleTypes[0].VehicleType.map(v => vtmap.mapFromGLX(v.$, new vehicleTypeDTO))
        await this.callRepository(config.endpoints.redeMasterData.vehicleType, this.vehicleTypes, new MasterDataRepository())
    }

    private async processNodes() {
        new logger().log("Processing Nodes")
        const nmap = new NodeMapper()
        this.nodes = this.network.Nodes[0].Node.map(v => nmap.mapFromGLX(v.$, new NodeDto))
        await this.callRepository(config.endpoints.redeMasterData.node, this.nodes, new MasterDataRepository())
    }

    private async processRoutes() {
        new logger().log("Processing Routes")
        const rmap = new RouteMapper()
        this.routes = this.network.Paths[0].Path.map(v => rmap.mapFromGLX(v, new RouteDto, this.nodes))
        await this.callRepository(config.endpoints.redeMasterData.route, this.routes, new MasterDataRepository())
    }

    private async processLines() {
        new logger().log("Processing Lines")
        const lmap = new LineMapper()
        this.lines = this.network.Lines[0].Line.map(v => lmap.mapFromGLX(v, new LineDto, this.routes))
        await this.callRepository(config.endpoints.redeMasterData.line, this.lines, new MasterDataRepository())
    }

    private async callRepository(endpoint: String, list:IGlxDto[], repository: MasterDataRepository){
        repository.setEndpoint(endpoint)
        repository.setList(list)
        if (this.noRepositoryError){
            this.noRepositoryError = await repository.save()
        }
    }
}