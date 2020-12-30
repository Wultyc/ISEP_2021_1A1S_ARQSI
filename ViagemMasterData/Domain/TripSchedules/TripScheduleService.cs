using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Domain.Trips;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripScheduleService
    {

        private readonly IRepository<Schema.TripSchedule> _repository;
        public TripScheduleService(IRepository<Schema.TripSchedule> repository)
        {
            _repository = repository;
        }

        public void PostAsync(TripDTO tripDTO)
        {


        }
    }
}
