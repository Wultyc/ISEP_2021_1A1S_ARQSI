import IDto from './interface/IDto'

export default class VehicleTypeDTO implements IDto {
    system_id: String
    glx_id: String
    data: {
        description: String
        autonomy: Number
        costPerKilometer: Number
        averageCost: Number
        averageSpeed: Number
        fuelType: String
    }
    status: String = "Not Processed"
}