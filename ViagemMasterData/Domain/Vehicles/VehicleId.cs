using ViagemMasterData.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ViagemMasterData.Domain.Vehicles
{
    public class VehicleId : EntityId
    {
        [JsonConstructor]
        public VehicleId(Guid value) : base(value)
        {
        }

        public VehicleId(String value) : base(value)
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
