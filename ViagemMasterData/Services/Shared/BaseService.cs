using ViagemMasterData.Infrastructure.Shared;
using ViagemMasterData.Domain.Shared;
using System;
using FluentValidation;
using System.Collections.Generic;

 namespace ViagemMasterData.Services.Shared
 {   
    public class BaseService<T> where T : class
    {

        private readonly IRepository<T> _repository;

        public BaseService(IRepository<T> repository)
        {
            _repository = repository;
        }

        public T Post<V>(T obj) where V : AbstractValidator<T>
        {
            Validate(obj, Activator.CreateInstance<V>());

            _repository.Insert(obj);
            return obj;
        }

        public T Put<V>(T obj) where V : AbstractValidator<T>
        {
            Validate(obj, Activator.CreateInstance<V>());

            _repository.Update(obj);
            return obj;
        }

        public void Delete(string id)
        {
            if (id.Length != 0)
                throw new ArgumentException("The id can't be zero.");

            _repository.Delete(id);
        }

        public IList<T> Get() => _repository.Select();

        public T Get(string id)
        {
            if (id.Length != 0)
                throw new ArgumentException("The id can't be zero.");

            return _repository.Select(id);
        }

        private void Validate(T obj, AbstractValidator<T> validator)
        {
            if (obj == null)
                throw new Exception("Registros não detectados!");

            validator.ValidateAndThrow(obj);
        }

    }
}