using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain;

namespace ViagemMasterData.Domain.TripulantServices
{
    public class TripulantServiceValidator : AbstractValidator<TripulantServices>
    {
        public TripulantServiceValidator()
        {

            RuleFor(c => c)
                .NotNull()
                .OnAnyFailure(x =>
                {
                    throw new ArgumentNullException("Can't found the object.");
                });

            RuleFor(c => c.TripulantId)
                .NotEmpty().WithMessage("Is necessary to inform the Tripulant Id.")
                .NotNull().WithMessage("Is necessary to inform the Tripulant Id.");

            RuleFor(c => c.Date)
                .NotEmpty().WithMessage("Is necessary to inform the date.")
                .NotNull().WithMessage("Is necessary to inform the date.");
        }
    }
}
