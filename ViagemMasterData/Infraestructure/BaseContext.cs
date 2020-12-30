using Microsoft.EntityFrameworkCore;
using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.Domain.Trips;
using ViagemMasterData.Domain.TripSchedules;
using ViagemMasterData.Infrastructure.DBContext;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Infrastructure
{
    public class BaseContext : DbContext
    {

        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        {

        }

        public BaseContext() { }

        public virtual DbSet<Trip> Trips { get; set; }
        public virtual DbSet<TripSchedule> TripSchedules { get; set; }
        public virtual DbSet<Tripulant> Tripulants { get; set; }
        public virtual DbSet<TripulantService> TripulantServices { get; set; }
        public virtual DbSet<TripulantType> TripulantTypes { get; set; }
        public virtual DbSet<Schema.Vehicle> Vehicles { get; set; } /* -- using the schema*/
        public virtual DbSet<Schema.VehicleService> VehicleServices { get; set; }
        public virtual DbSet<WorkBlock> WorkBlocks { get; set; }
        //public DbSet<Domain.Vehicles.Vehicle> Vehicles { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:arqsi-viajantes2.database.windows.net,1433;Initial Catalog=Viajantes2VMD;Persist Security Info=False;User ID=jorge;Password=29UY^X&rUJo3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // future work, use configuration files 
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Trip>(entity =>
            {
                entity.ToTable("Trip");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LineId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.RouteId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.WorkBlockId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<TripSchedule>(entity =>
            {
                entity.ToTable("TripSchedule");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.NodeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TripId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Tripulant>(entity =>
            {
                entity.ToTable("Tripulant");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.LicenceExpires).HasColumnType("datetime");

                entity.Property(e => e.LicenceNr)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<TripulantService>(entity =>
            {
                entity.ToTable("TripulantService");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.TripulantId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<TripulantType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TripulantId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TripulantTypeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Tripulant)
                    .WithMany(p => p.TripulantTypes)
                    .HasForeignKey(d => d.TripulantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tripulant__Tripu__69FBBC1F");
            });

            //modelBuilder.Entity<Domain.Vehicles.Vehicle>(new VehicleDBContext().Configure);


            modelBuilder.Entity<Schema.Vehicle>(entity =>
            {
                entity.ToTable("Vehicle");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LicencePlate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.VehicleTypeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Vin)
                    .IsRequired()
                    .HasMaxLength(17)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Schema.VehicleService>(entity =>
            {
                entity.ToTable("VehicleService");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.VehicleId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<WorkBlock>(entity =>
            {
                entity.ToTable("WorkBlock");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TripulantServiceId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.VehicleServiceId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .IsFixedLength(true);
            });

        }

    }
}
