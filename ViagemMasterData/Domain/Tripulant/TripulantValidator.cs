using FluentValidation;
using System;

namespace ViagemMasterData.Domain.Tripulant
{
    public class TripulantValidator : AbstractValidator<Tripulant>
    {
        public TripulantValidator()
        {
            RuleFor(c => c)
                .NotNull()
                .OnAnyFailure(x =>
                {
                    throw new ArgumentNullException("Can't found the object.");
                });

            //RuleFor(c => c.Id)
            //    .NotEmpty().WithMessage("Is necessary to inform the code.")
            //    .NotNull().WithMessage("Is necessary to inform the code.");

            RuleFor(c => c.Name)
                    .NotEmpty().WithMessage("Is necessary to inform the licence plate.")
                    .NotNull().WithMessage("Is necessary to inform the licence plate.");

            RuleFor(c => c.BirthDate)
                    .NotEmpty().WithMessage("Is necessary to inform the vin.")
                    .NotNull().WithMessage("Is necessary to inform the vin.");

            RuleFor(c => c.LicenceNr)
                    .NotEmpty().WithMessage("Is necessary to inform the vehicle type.")
                    .NotNull().WithMessage("Is necessary to inform the vehicle type.");

            RuleFor(c => c.LicenceExpires)
                    .NotEmpty().WithMessage("Is necessary to inform the start date.")
                    .NotNull().WithMessage("Is necessary to inform the start date.");
        }
    }
}
