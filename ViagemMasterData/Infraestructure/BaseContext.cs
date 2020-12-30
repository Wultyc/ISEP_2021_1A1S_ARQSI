using Microsoft.EntityFrameworkCore;
using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.Domain.TripSchedules;
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
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripSchedule> TripSchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>(new VehicleDBContext().Configure);
            modelBuilder.Entity<Trip>(new TripDBContext().Configure);
            modelBuilder.Entity<TripSchedule>(new TripScheduleDBContext().Configure);
        }
    }
}