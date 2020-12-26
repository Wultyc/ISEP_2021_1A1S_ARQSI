using DDDNetCore.Domain.Vehicles;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Repositories.IRepositories
{
    public interface IVehicleRepository : IRepository<Vehicle, VehicleId>
    {
    }
}
