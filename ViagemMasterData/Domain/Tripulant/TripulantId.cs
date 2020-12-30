using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;

namespace ViagemMasterData.Domain.Tripulant
{
    public class TripulantId : EntityId, IValueObject

    {
        [JsonConstructor]
        public TripulantId(Guid value) : base(value)
        {
        }

        public TripulantId(String value) : base(value)
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
