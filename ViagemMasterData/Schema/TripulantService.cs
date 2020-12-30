using System;
using System.Collections.Generic;

#nullable disable

namespace ViagemMasterData.Schema
{
    public partial class TripulantService
    {
        public string Id { get; set; }
        public string TripulantId { get; set; }
        public DateTime Date { get; set; }
    }
}
