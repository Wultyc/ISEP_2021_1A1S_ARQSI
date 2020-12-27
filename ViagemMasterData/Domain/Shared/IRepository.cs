using ViagemMasterData.Domain.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace ViagemMasterData.Domain.Shared
{
    public interface IRepository<T> where T : class
    {

        void Insert(T obj);

        void Update(T obj);

        void Delete(dynamic id);

        T Select(dynamic id);

        IList<T> Select();
    }
}