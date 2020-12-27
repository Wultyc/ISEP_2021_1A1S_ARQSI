using DDDNetCore.Domain.Vehicles;
using DDDNetCore.DTOs;
using DDDNetCore.Repositories.IRepositories;
using DDDNetCore.Services.IServices;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleRepository _repo;

        public VehicleService(IUnitOfWork unitOfWork, IVehicleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<VehicleDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<VehicleDto> listDto = list.ConvertAll<VehicleDto>(ve => new VehicleDto{ Code = ve.Code, StartDate = ve.StartDate, LicencePlate = ve.LicencePlate, Vin = ve.Vin });
       
            return listDto; 

            //Not developed yet.
            //throw new NotImplementedException();
        }

        public async Task<VehicleDto> GetByIdAsync(VehicleId id)
        {
            var ve = await this._repo.GetByIdAsync(id);

            if (ve == null)
                return null;

            return new VehicleDto { Code = ve.Code, StartDate = ve.StartDate, LicencePlate = ve.LicencePlate, Vin = ve.Vin };
        }

        public async Task<VehicleDto> AddAsync(CreatingVehicleDto dto)
        {
            //var Vehicle = new Vehicle(dto.Description);

            //await this._repo.AddAsync(Vehicle);

            //await this._unitOfWork.CommitAsync();

            //return new VehicleDto { Id = Vehicle.Id.AsGuid(), Description = Vehicle.Description };

            // Not developed yet.
            throw new NotImplementedException();
        }

        public async Task<VehicleDto> UpdateAsync(VehicleDto dto)
        {
            //var Vehicle = await this._repo.GetByIdAsync(new VehicleId(dto.Id));

            //if (Vehicle == null)
            //    return null;

            //// change all field
            //Vehicle.ChangeDescription(dto.Description);

            //await this._unitOfWork.CommitAsync();

            //return new VehicleDto { Id = Vehicle.Id.AsGuid(), Description = Vehicle.Description };

            // Not developed yet.
            throw new NotImplementedException();
        }

        public async Task<VehicleDto> InactivateAsync(VehicleId id)
        {
            //var Vehicle = await this._repo.GetByIdAsync(id);

            //if (Vehicle == null)
            //    return null;

            //// change all fields
            //Vehicle.MarkAsInative();

            //await this._unitOfWork.CommitAsync();

            //return new VehicleDto { Id = Vehicle.Id.AsGuid(), Description = Vehicle.Description };

            // Not developed yet.
            throw new NotImplementedException();
        }

        public async Task<VehicleDto> DeleteAsync(VehicleId id)
        {
            //var Vehicle = await this._repo.GetByIdAsync(id);

            //if (Vehicle == null)
            //    return null;

            //if (Vehicle.Active)
            //    throw new BusinessRuleValidationException("It is not possible to delete an active Vehicle.");

            //this._repo.Remove(Vehicle);
            //await this._unitOfWork.CommitAsync();

            //return new VehicleDto { Id = Vehicle.Id.AsGuid(), Description = Vehicle.Description };

            // Not developed yet.
            throw new NotImplementedException();
        }
    }
}

