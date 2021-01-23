using ViagemMasterData.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripScheduleId : EntityId
    {
        [JsonConstructor]
        public TripScheduleId(Guid value) : base(value)
        {
        }

        public TripScheduleId(String value) : base(value)
        {
        }

        protected override object createFromString(string text)
        {
            return new Guid(text);
        }

        public override String AsString()
        {
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }
}
