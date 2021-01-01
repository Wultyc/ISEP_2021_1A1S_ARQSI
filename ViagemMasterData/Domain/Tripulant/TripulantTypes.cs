using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.Tripulant
{
    public class TripulantTypes : IValueObject
    {
        public string TripulantTypeId { get; set; }
        public TripulantTypes (string id)
        {
            this.TripulantTypeId = id;
        }
    }
}
