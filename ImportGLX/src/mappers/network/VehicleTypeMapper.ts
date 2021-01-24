import IGlxMapper from '../interface/IGlxMapper'
import vehicleTypeDto from '../../dto/network/VehicleTypeDto'

export default class VehicleTypeMapper implements IGlxMapper {
    
    fuelTypeMap = {
        "23": "Gasoleo",
        "20": "GPL",
        "50": "Hidrogenio",
        "75": "Eletrico",
        "1": "Gasolina"
    }
    
    mapFromGLX(glx_entry:any, dto: vehicleTypeDto): vehicleTypeDto {
        dto = {
            system_id: "",
            glx_id: glx_entry.key,
            data: {
                description: glx_entry.Name,
                autonomy: glx_entry.Autonomy,
                costPerKilometer: glx_entry.Cost,
                averageCost: glx_entry.Consumption,
                averageSpeed: glx_entry.AverageSpeed,
                fuelType: this.fuelTypeMap[glx_entry.EnergySource]
            },
            status: "Not Processed"
        }
        return dto
        }
    }

     