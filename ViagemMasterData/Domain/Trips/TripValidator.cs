using FluentValidation;
using System;

namespace ViagemMasterData.Domain.Trips
{
    public class TripValidator : AbstractValidator<Trip>
    {
        public TripValidator()
        {

            RuleFor(c => c)
                .NotNull()
                .OnAnyFailure(x =>
                {
                    throw new ArgumentNullException("Can't found the object.");
                });

            RuleFor(c => c.Id)
                .NotEmpty().WithMessage("Is necessary to inform the identifier.")
                .NotNull().WithMessage("Is necessary to inform the identifier.");

            RuleFor(c => c.LineId)
                .NotEmpty().WithMessage("Is necessary to inform the line identifier.")
                .NotNull().WithMessage("Is necessary to inform the line identifier.");

            RuleFor(c => c.RouteId)
                .NotEmpty().WithMessage("Is necessary to inform the route identifier.")
                .NotNull().WithMessage("Is necessary to inform the route identifier.");

            RuleFor(c => c.StartTime)
                .NotEmpty().WithMessage("Is necessary to inform the trip start time.")
                .NotNull().WithMessage("Is necessary to inform the trip start time.");

            RuleFor(c => c.EndTime)
                .NotEmpty().WithMessage("Is necessary to inform the trip end time.")
                .NotNull().WithMessage("Is necessary to inform the trip end time.");

        }

    }
}

