using DDDNetCore.Domain.Vehicles;
using DDDNetCore.Models;
using DDDNetCore.Repositories.IRepositories;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Repositories
{
    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>, IVehicleRepository
    {
        public VehicleRepository(DDDSample1DbContext context) : base(context.Vehicles)
        {

        }
    }
}
