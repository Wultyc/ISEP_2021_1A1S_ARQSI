using FluentValidation;
using System;

namespace ViagemMasterData.Domain.WorkBlocks
{
    public class WorkBlockValidator : AbstractValidator<WorkBlock>
    {
        public WorkBlockValidator()
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

            RuleFor(c => c.VehicleServiceId)
                .NotEmpty().WithMessage("Is necessary to inform the vehicle service identifier.")
                .NotNull().WithMessage("Is necessary to inform the vehicle service identifier.");

            // don't validate tripuplantServiceId

            RuleFor(c => c.StartTime)
                .NotEmpty().WithMessage("Is necessary to inform the trip start time.")
                .NotNull().WithMessage("Is necessary to inform the trip start time.");

            // don't validate trip end time
        }

    }
}

