using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.TripulantServiceDTOs;
using ViagemMasterData.Infraestructure;
using ViagemMasterData.Mappers;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Service
{
    public class TripulantServiceService
    {
        private readonly TripulantServiceMapper tripulantServiceMapper = new TripulantServiceMapper();
        
        private readonly IRepository<Schema.TripulantService> _repository;

        private readonly IRepository<Schema.Tripulant> _repositoryT;


        public TripulantServiceService(IRepository<Schema.TripulantService> repository, IRepository<Schema.Tripulant> repositoryT)
        {
            _repository = repository;
            _repositoryT = repositoryT;
        }

        public async Task<TripulantServiceDTO> PostAsync(CreateTripulantServiceDTO createTripulantServiceDTO)
        {

            TripulantServiceDTO tripulantServiceDTO = tripulantServiceMapper.GetDTOFromCreateDTO(createTripulantServiceDTO);

            Domain.TripulantServices.TripulantServices tripulantServiceDomain = tripulantServiceMapper.GetDomainFromTripulantServiceDTO(tripulantServiceDTO);

            await tripulantServiceDomain.Validate();

            _repository.Insert(tripulantServiceMapper.GetSchemaFromDomain(tripulantServiceDomain));

            tripulantServiceDTO = tripulantServiceMapper.GetDTOFromDomain(tripulantServiceDomain);
            return tripulantServiceDTO;
        }

        public TripulantServiceDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.TripulantService tripulantService = _repository.Select(id);
            if (tripulantService == null)
            {
                return null;
            }
            return tripulantServiceMapper.GetDTOFromSchema(tripulantService);
        }

        public IList<TripulantServiceDTO> Get()
        {
            IList<Schema.TripulantService> tripulantServiceList = _repository.Select();
            IList<TripulantServiceDTO> tripulantServiceDTOList = new List<TripulantServiceDTO>();
            
            foreach (Schema.TripulantService tripulantService in tripulantServiceList)
            {
                Tripulant trip = _repositoryT.Select(tripulantService.TripulantId);
                tripulantService.Tripulant = new Tripulant(trip.Id, trip.Name, trip.BirthDate, trip.LicenceNr, trip.LicenceExpires);
                tripulantServiceDTOList.Add(tripulantServiceMapper.GetDTOFromSchema(tripulantService));
            }

            return tripulantServiceDTOList;
        }
    }
}
