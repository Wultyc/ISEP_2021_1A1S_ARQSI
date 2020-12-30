using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViagemMasterData.Schema;

namespace ViagemMasterData.Infrastructure.DBContext
{
    public class TripScheduleDBContext : IEntityTypeConfiguration<TripSchedule>
    {
        public void Configure(EntityTypeBuilder<TripSchedule> builder)
        {
            builder.ToTable("TripSchedule");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .IsRequired()
                .HasColumnName("Id");
        }
    }
}