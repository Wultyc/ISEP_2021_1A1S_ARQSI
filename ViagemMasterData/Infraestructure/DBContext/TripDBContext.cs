using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Infrastructure.DBContext
{
    public class TripDBContext : IEntityTypeConfiguration<Trip>
    {
        public void Configure(EntityTypeBuilder<Trip> builder)
        {
            builder.ToTable("Trip");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .IsRequired()
                .HasColumnName("Id");
        }
    }
}