using System;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Domain.Vehicles
{
    public class Vehicle : Entity<VehicleId>, IAggregateRoot
    {
        public string Code { get; set; }
        public string Matricula { get; set; }
        public string Vin { get; set; }
        public DateTime DataEntradaServico { get; set; }

        private Vehicle()
        {  
        }

        public Vehicle(string matricula, string vin, DateTime dataEntradaServico)
        {

            this.Code = new VehicleId(Guid.NewGuid()).ToString();
            this.Matricula = Matricula;
            this.Vin = vin;
            this.DataEntradaServico = dataEntradaServico;
        }

        //public void ChangeDescription(string description)
        //{
        //    if (!this.Active)
        //        throw new BusinessRuleValidationException("It is not possible to change the description to an inactive product.");
        //    this.Description = description;
        //}

        //public void ChangeCategoryId(CategoryId catId)
        //{
        //    if (!this.Active)
        //        throw new BusinessRuleValidationException("It is not possible to change the category of an inactive product.");
        //    if (catId == null)
        //        throw new BusinessRuleValidationException("Every product requires a category.");
        //    this.CategoryId = catId; ;
        //}
        //public void MarkAsInative()
        //{
        //    this.Active = false;
        //}
    }
}
