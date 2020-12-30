using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViagemMasterData.Domain.Vehicles;

namespace ViagemMasterData.Infrastructure.DBContext
{
    public class VehicleDBContext : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.ToTable("Vehicle");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .IsRequired()
                .HasColumnName("Id");

        }
    }
}