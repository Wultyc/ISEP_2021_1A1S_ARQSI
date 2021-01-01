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
                    .NotEmpty().WithMessage("Is necessary to inform the name.")
                    .NotNull().WithMessage("Is necessary to inform the name.");

            RuleFor(c => c.BirthDate)
                    .NotEmpty().WithMessage("Is necessary to inform the Birth Date.")
                    .NotNull().WithMessage("Is necessary to inform the Birth Date.");

            RuleFor(c => c.LicenceNr)
                    .NotEmpty().WithMessage("Is necessary to inform the Licence Nr.")
                    .NotNull().WithMessage("Is necessary to inform the Licence Nr.");

            RuleFor(c => c.LicenceExpires)
                    .NotEmpty().WithMessage("Is necessary to inform the Licence Expires.")
                    .NotNull().WithMessage("Is necessary to inform the Licence Expires.");
        }
    }
}
