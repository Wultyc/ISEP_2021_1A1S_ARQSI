using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.DTOs;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Mappers
{
    public class TripulantMapper
    {
        public TripulantMapper() { }

        public TripulantDTO GetTripulantDTOForTripulant(Schema.Tripulant tripulant)
        {
            var tripTypes = new ArrayList();
            //foreach (string tripType in tripulant.TripulantTypes)
            //{
            //   tripTypes.Add(tripType);
            //}

            return new TripulantDTO(tripulant.Id.ToString().ToUpper(),
                tripulant.Name, tripulant.BirthDate, tripulant.LicenceNr, tripulant.LicenceExpires, tripTypes);
        }

        //public Schema.Tripulant GetTripulantForTripulantDTO(TripulantDTO tripulantDTO)
        //{
        //    var tripTypes = new ArrayList();
        //    foreach (string tripType in tripulantDTO.TripulantTypes)
        //    {
        //        tripTypes.Add(tripType);
        //    }

        //    return new Schema.Tripulant(tripulantDTO.Id, tripulantDTO.Name, tripulantDTO.BirthDate, tripulantDTO.LicenceNr, tripulantDTO.LicenceExpires, tripTypes);
        //}
        public Schema.Tripulant GetSchemaFromDomain(Domain.Tripulant.Tripulant tripulant)
        {

            return new Schema.Tripulant(tripulant.Id.AsString(), tripulant.Name, tripulant.BirthDate, tripulant.LicenceNr, tripulant.LicenceExpires);
        }
    
        public TripulantDTO GetTripulantDTOForCreateTripulantDTO(CreateTripulantDTO createTripulantDTO)
        {
            var tripTypes = new ArrayList();
            foreach (string tripType in createTripulantDTO.TripulantTypes)
            {
                tripTypes.Add(tripType);
            }

            return new TripulantDTO(null,
                createTripulantDTO.Name, createTripulantDTO.BirthDate, createTripulantDTO.LicenceNr, createTripulantDTO.LicenceExpires, tripTypes);
        }
    }
}
