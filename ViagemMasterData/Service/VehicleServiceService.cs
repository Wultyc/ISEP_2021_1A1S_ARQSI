using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Infraestructure;
using ViagemMasterData.Mappers;

namespace ViagemMasterData.Service
{
    public class VehicleServiceService
    {
        private readonly VehicleServiceMapper vehicleServiceMapper = new VehicleServiceMapper();
        
        private readonly IRepository<Schema.VehicleService> _repository;
    }
}
