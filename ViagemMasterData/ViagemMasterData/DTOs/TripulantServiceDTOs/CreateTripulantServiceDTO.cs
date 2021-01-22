using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.DTOs.TripulantServiceDTOs
{
    public class CreateTripulantServiceDTO
    {

        public string TripulantId { get; set; }
        public DateTime Date { get; set; }

        public CreateTripulantServiceDTO(string tripulantId, DateTime date)
        {
            this.TripulantId = tripulantId;
            this.Date = date;
        }
    }
}
