using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Schema;

namespace ViagemMasterData.DTOs.TripulantServiceDTOs
{
    public class TripulantServiceDTO
    {
        public string Id { get; set; }
        public string TripulantId { get; set; }
        public DateTime Date { get; set; }

        public TripulantServiceDTO(string id, string tripulantId, DateTime date)
        {
            this.Id = id;
            this.TripulantId = tripulantId;
            this.Date = date;
        }
    }
}
