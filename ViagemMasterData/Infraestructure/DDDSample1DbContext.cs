using Microsoft.EntityFrameworkCore;
using DDDNetCore.Models;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDNetCore.Domain.Vehicles;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    { 

        public DDDSample1DbContext(DbContextOptions<DDDSample1DbContext> options) : base(options)
        {

        }
        
        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Family> Families { get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.Entity<Vehicle>()
            .HasKey(o => new { o.Code });
        }
    }
}