using ViagemMasterData.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ViagemMasterData.Infrastructure.Shared
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {

        private readonly BaseContext _context;

        public BaseRepository(BaseContext context)
        {
            _context = context;
        }

        public void Insert(T obj)
        {
            _context.Add(obj);
            _context.SaveChanges();
        }

        public void Update(T obj)
        {
            _context.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }

        public IList<T> Select()
        {
            return _context.Set<T>().ToList();
        }

        public T Select(dynamic id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Delete(dynamic id)
        {
            _context.Set<T>().Remove(Select(id));
            _context.SaveChanges();
        }
    }
}