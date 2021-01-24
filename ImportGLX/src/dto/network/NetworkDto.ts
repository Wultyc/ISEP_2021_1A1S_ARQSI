import IDto from '../interface/IDto'
import LineDTO from './LineDto'
import NodeDTO from './NodeDto'
import RouteDTO from './RouteDto'
import VehicleTypeDTO from './VehicleTypeDto'

export default class NetworkDTO implements IDto {
    nodes: NodeDTO[]
    vehicleTypes: VehicleTypeDTO[]
    routes: RouteDTO[]
    lines: LineDTO[]
}