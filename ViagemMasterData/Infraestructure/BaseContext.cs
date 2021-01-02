using Microsoft.EntityFrameworkCore;
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
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<VehicleService> VehicleServices { get; set; }
        public virtual DbSet<WorkBlock> WorkBlocks { get; set; }
        public virtual DbSet<WorkBlockTrip> WorkBlockTrips { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:arqsi-viajantes2.database.windows.net,1433;Initial Catalog=Viajantes2VMD;Persist Security Info=False;User ID=jorge;Password=29UY^X&rUJo3;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Trip>(entity =>
            {
                entity.ToTable("Trip");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LineId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RouteId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TripSchedule>(entity =>
            {
                entity.ToTable("TripSchedule");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NodeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TripId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.TripSchedules)
                    .HasForeignKey(d => d.TripId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TripSched__TripI__32767D0B");
            });

            modelBuilder.Entity<Tripulant>(entity =>
            {
                entity.ToTable("Tripulant");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

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
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.TripulantId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Tripulant)
                    .WithMany(p => p.TripulantServices)
                    .HasForeignKey(d => d.TripulantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tripulant__Tripu__3A179ED3");
            });

            modelBuilder.Entity<TripulantType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TripulantId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TripulantTypeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Tripulant)
                    .WithMany(p => p.TripulantTypes)
                    .HasForeignKey(d => d.TripulantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tripulant__Tripu__373B3228");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("Vehicle");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LicencePlate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.VehicleTypeId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Vin)
                    .IsRequired()
                    .HasMaxLength(17)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VehicleService>(entity =>
            {
                entity.ToTable("VehicleService");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.VehicleId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.VehicleServices)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__VehicleSe__Vehic__3CF40B7E");
            });

            modelBuilder.Entity<WorkBlock>(entity =>
            {
                entity.ToTable("WorkBlock");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TripulantServiceId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.VehicleServiceId)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.TripulantService)
                    .WithMany(p => p.WorkBlocks)
                    .HasForeignKey(d => d.TripulantServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WorkBlock__Tripu__41B8C09B");

                entity.HasOne(d => d.VehicleService)
                    .WithMany(p => p.WorkBlocks)
                    .HasForeignKey(d => d.VehicleServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WorkBlock__Vehic__40C49C62");
            });

            modelBuilder.Entity<WorkBlockTrip>(entity =>
            {
                entity.HasKey(e => new { e.TripId, e.WorkBlockId });

                entity.ToTable("WorkBlockTrip");

                entity.Property(e => e.TripId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.WorkBlockId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.WorkBlockTrips)
                    .HasForeignKey(d => d.TripId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WorkBlock__TripI__44952D46");

                entity.HasOne(d => d.WorkBlock)
                    .WithMany(p => p.WorkBlockTrips)
                    .HasForeignKey(d => d.WorkBlockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WorkBlock__WorkB__4589517F");
            });

            //OnModelCreatingPartial(modelBuilder);
        }

        //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
