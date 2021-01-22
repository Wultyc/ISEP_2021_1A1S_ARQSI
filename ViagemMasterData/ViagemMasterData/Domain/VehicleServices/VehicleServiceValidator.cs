using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain;

namespace ViagemMasterData.Domain.VehicleServices
{
    public class VehicleServiceValidator : AbstractValidator<VehicleServices>
    {
        public VehicleServiceValidator()
        {

            RuleFor(c => c)
                .NotNull()
                .OnAnyFailure(x =>
                {
                    throw new ArgumentNullException("Can't found the object.");
                });

            RuleFor(c => c.VehicleId)
                .NotEmpty().WithMessage("Is necessary to inform the Vehicle Id.")
                .NotNull().WithMessage("Is necessary to inform the Vehicle Id.");

            RuleFor(c => c.Date)
                .NotEmpty().WithMessage("Is necessary to inform the date.")
                .NotNull().WithMessage("Is necessary to inform the date.");
        }
    }
}
