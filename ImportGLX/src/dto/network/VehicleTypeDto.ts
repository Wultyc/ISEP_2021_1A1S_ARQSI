import IGlxDto from '../interface/IGlxDto'

export default class VehicleTypeDTO implements IGlxDto {
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
    status: any
}