using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.VehicleServices
{
    public class VehicleServiceId : EntityId
    {
        [JsonConstructor]
        public VehicleServiceId(Guid value) : base(value)
        {
        }

        public VehicleServiceId(String value) : base(value)
        {
        }

        protected override object createFromString(string text)
        {
            return new Guid(text);
        }

        public override String AsString()
        {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }
}
