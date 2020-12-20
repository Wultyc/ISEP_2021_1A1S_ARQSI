import IService from './interface/IService'
import GlxFileDto from '../dto/glxFileDto'
import StoreGlxRepository from '../repository/StoreGlxRepository'

import vehicleTypeDTO from '../dto/VehicleTypeDto'
import NodeDto from '../dto/NodeDto'
import RouteDto from '../dto/RouteDto'
import LineDto from '../dto/LineDto'

import VehicleTypeMapper from '../mappers/VehicleTypeMapper'
import NodeMapper from '../mappers/NodeMapper'
import RouteMapper from '../mappers/RouteMapper'
import KineMapper from '../mappers/LineMapper'

import util from 'util'
import LineMapper from '../mappers/LineMapper'

export default class StoreGLXService implements IService {
    
    storeGlxRepository: StoreGlxRepository
    glxDto: GlxFileDto
    network: any
    vehicleTypes:vehicleTypeDTO[] = []
    nodes: NodeDto[] = []
    routes: RouteDto[] = []
    lines: LineDto[] = []

    constructor(glx: GlxFileDto, repo: StoreGlxRepository = new StoreGlxRepository){
        this.glxDto = glx
        this.storeGlxRepository = repo
    }

    async runService():Promise<boolean>{
        this.storeGlxRepository.setFilepath(this.glxDto.filepath)
        const rawData:any = await this.storeGlxRepository.load()
        this.network = rawData.GlDocumentInfo.world[0].GlDocument[0].GlDocumentNetwork[0].Network[0]
        this.processNetwork()
        return true
    }

    private processNetwork(){
        this.processVehicleType()
        this.processNodes()
        this.processRoutes()
        this.processLines()
    }
    
    private processVehicleType(){
        const vtmap = new VehicleTypeMapper()
        this.vehicleTypes = this.network.VehicleTypes[0].VehicleType.map(v => vtmap.mapFromGLX(v.$, new vehicleTypeDTO))
    }

    private processNodes(){
        const nmap = new NodeMapper()
        this.nodes = this.network.Nodes[0].Node.map(v => nmap.mapFromGLX(v.$, new NodeDto))
    }

    private processRoutes(){
        const rmap = new RouteMapper()
        this.routes = this.network.Paths[0].Path.map(v => rmap.mapFromGLX(v, new RouteDto, this.nodes))
        console.log(util.inspect(this.routes, {showHidden: false, depth: null}))
    }
    
    private processLines(){
        const lmap = new LineMapper()
        this.lines = this.network.Lines[0].Line.map(v => lmap.mapFromGLX(v, new LineDto, this.routes))
        console.log(util.inspect(this.lines, {showHidden: false, depth: null}))
    }
}