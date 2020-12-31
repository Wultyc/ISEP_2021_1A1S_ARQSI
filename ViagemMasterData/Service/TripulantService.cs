using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.Tripulant;
using ViagemMasterData.DTOs;
using ViagemMasterData.Mappers;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Service
{
    public class TripulantService
    {
        private readonly TripulantMapper TripulantMapper = new TripulantMapper();
        private readonly IRepository<Schema.Tripulant> _repository;
        private readonly IRepository<Schema.TripulantType> _tripTypeRepository;

        public TripulantService(IRepository<Schema.Tripulant> repository, IRepository<Schema.TripulantType> tripTypeRepository)
        {
            _repository = repository;
            _tripTypeRepository = tripTypeRepository;
        }

        public async Task<TripulantDTO> PostAsync(CreateTripulantDTO createTripulantDTO)
        {

            TripulantDTO tripulantDTO = TripulantMapper.GetTripulantDTOForCreateTripulantDTO(createTripulantDTO);

            var tripulantDomain = new Domain.Tripulant.Tripulant(tripulantDTO.Id, tripulantDTO.Name, tripulantDTO.BirthDate, tripulantDTO.LicenceNr, tripulantDTO.LicenceExpires, tripulantDTO.TripulantTypes);

            tripulantDomain.Validate(tripulantDomain);

            _repository.Insert(TripulantMapper.GetSchemaFromDomain(tripulantDomain));

            foreach(string id in createTripulantDTO.TripulantTypes)
            {
             _tripTypeRepository.Insert(new TripulantType(Guid.NewGuid().ToString().ToUpper(), tripulantDomain.Id.Value, id));
            }

            return tripulantDTO;
        }

        public async Task<TripulantDTO> Put(TripulantDTO TripulantDTO)
        {
            //Validate(TripulantDTO);

            ////bool validateTripulantType = await request.GetEntityForIdAsync("Tripulant-types", TripulantDTO.TripulantTypeId);

            //if (!validateTripulantType)
            //    throw new BusinessRuleValidationException("Tripulant-Type not found!");

            //_repository.Update(TripulantMapper.GetTripulantForTripulantDTO(TripulantDTO));
            return TripulantDTO;
        }

        public void Delete(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(id);
        }

        public IList<Schema.Tripulant> Get()
        {
            IList<Schema.Tripulant> TripulantList = _repository.Select();
            IList<TripulantDTO> TripulantDTOList = new List<TripulantDTO>();

            //foreach (Schema.Tripulant Tripulant in TripulantList)
            //{
            //    TripulantDTOList.Add(TripulantMapper.GetTripulantDTOForTripulant(Tripulant));
            //}

            return TripulantList;
        }

        public TripulantDTO Get(string id)
        {
            if (id.Length == 0)
                throw new ArgumentException("The id can't be zero.");

            Schema.Tripulant Tripulant = _repository.Select(id);
            if (Tripulant == null)
            {
                return null;
            }
            return TripulantMapper.GetTripulantDTOForTripulant(Tripulant);
        }

        //private static void Validate(TripulantDTO TripulantDTO)
        //{
        //    if (TripulantDTO == null)
        //        throw new Exception("Tripulant not detected!");

        //    TripulantValidator validator = new TripulantValidator();
        //    validator.ValidateAndThrow(TripulantDTO);
        //}
    }
}
