using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.DTOs.TripulantServiceDTOs;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Mappers
{
    public class TripulantServiceMapper
    {
        public TripulantServiceMapper() { }
        public TripulantServiceDTO GetDTOFromSchema(Schema.TripulantService tripulantService)
        {
            return new TripulantServiceDTO(tripulantService.Id.ToString().ToUpper(),
                tripulantService.TripulantId, tripulantService.Tripulant, tripulantService.Date);
        }

        public Domain.TripulantServices.TripulantServices GetDomainFromTripulantServiceDTO(TripulantServiceDTO tripulantServiceDTO)
        {
            return new Domain.TripulantServices.TripulantServices(tripulantServiceDTO.Id, tripulantServiceDTO.TripulantId, tripulantServiceDTO.Date);
        }

        public Schema.TripulantService GetSchemaFromDomain(Domain.TripulantServices.TripulantServices tripulantServices)
        {
            return new Schema.TripulantService(tripulantServices.Id.Value.ToString(), tripulantServices.TripulantId.Value.ToString(), tripulantServices.Date);
        }

        public TripulantServiceDTO GetDTOFromCreateDTO(CreateTripulantServiceDTO createTripulantServiceDTO)
        {
            return new TripulantServiceDTO(null, createTripulantServiceDTO.TripulantId, null, createTripulantServiceDTO.Date);
        }

        public TripulantServiceDTO GetDTOFromDomain(Domain.TripulantServices.TripulantServices tripulantServices)
        {
            return new TripulantServiceDTO(tripulantServices.Id.Value.ToString(), tripulantServices.TripulantId.Value.ToString(), null, tripulantServices.Date);
        }

    }
}
