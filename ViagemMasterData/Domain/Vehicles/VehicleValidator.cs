using FluentValidation;
using System;

namespace ViagemMasterData.Domain.Vehicles

{
    public class VehicleValidator : AbstractValidator<VehicleDTO>
    {
        public VehicleValidator()
        {

            RuleFor(c => c)
                .NotNull()
                .OnAnyFailure(x =>
                {
                    throw new ArgumentNullException("Can't found the object.");
                });

            RuleFor(c => c.Code)
                .NotEmpty().WithMessage("Is necessary to inform the code.")
                .NotNull().WithMessage("Is necessary to inform the code.");

            RuleFor(c => c.LicencePlate)
                .NotEmpty().WithMessage("Is necessary to inform the licence plate.")
                .NotNull().WithMessage("Is necessary to inform the licence plate.");

            RuleFor(c => c.Vin)
                .NotEmpty().WithMessage("Is necessary to inform the vin.")
                .NotNull().WithMessage("Is necessary to inform the vin.");

            RuleFor(c => c.VehicleType)
                .NotEmpty().WithMessage("Is necessary to inform the vehicle type.")
                .NotNull().WithMessage("Is necessary to inform the vehicle type.");

            RuleFor(c => c.StartDate)
                .NotEmpty().WithMessage("Is necessary to inform the start date.")
                .NotNull().WithMessage("Is necessary to inform the start date.");

        }
    }
}

