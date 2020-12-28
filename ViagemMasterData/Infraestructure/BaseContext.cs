using Microsoft.EntityFrameworkCore;
using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.Infrastructure.DBContext;

namespace ViagemMasterData.Infrastructure
{
    public class BaseContext : DbContext
    { 

        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        {

        }

        public BaseContext() { }

        public DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>(new VehicleDBContext().Configure);
        }
    }
}