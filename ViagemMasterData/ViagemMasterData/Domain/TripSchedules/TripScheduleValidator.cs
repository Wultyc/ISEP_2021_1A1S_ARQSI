using FluentValidation;
using System;

namespace ViagemMasterData.Domain.TripSchedules
{
    public class TripScheduleValidator : AbstractValidator<TripSchedule>
    {
        public TripScheduleValidator()
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

            RuleFor(c => c.TripId)
                .NotEmpty().WithMessage("Is necessary to inform the trip identifier.")
                .NotNull().WithMessage("Is necessary to inform the trip identifier.");

            RuleFor(c => c.NodeId)
                .NotEmpty().WithMessage("Is necessary to inform the node identifier.")
                .NotNull().WithMessage("Is necessary to inform the node identifier.");

            RuleFor(c => c.NodeOrder)
                .NotEmpty().WithMessage("Is necessary to inform the node order.")
                .NotNull().WithMessage("Is necessary to inform the node order.");

            RuleFor(c => c.PassingTime)
                .NotEmpty().WithMessage("Is necessary to inform the node passing time.")
                .NotNull().WithMessage("Is necessary to inform the node passing time.");

        }
    }
}

