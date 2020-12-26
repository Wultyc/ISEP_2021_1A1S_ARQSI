import IDto from './interface/IDto'

export default class VehicleTypeDTO implements IDto{
    id: String
    description: String
    autonomy: Number
    costPerKilometer: Number
    averageCost: Number
    averageSpeed: Number
    fuelType: String
}