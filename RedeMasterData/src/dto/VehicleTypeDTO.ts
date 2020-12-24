import IDto from './interface/IDto'

export default class VehicleTypeDTO implements IDto{
    id = null
    description = null
    autonomy = null
    costPerKilometer = null
    averageCost = null
    averageSpeed = null
    fuelType = null
}