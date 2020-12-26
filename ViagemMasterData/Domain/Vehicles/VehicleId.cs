using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DDDNetCore.Domain.Vehicles
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

        public override string AsString()
        {
            throw new NotImplementedException();
        }

        protected override object createFromString(string text)
        {
            throw new NotImplementedException();
        }
    }
}
