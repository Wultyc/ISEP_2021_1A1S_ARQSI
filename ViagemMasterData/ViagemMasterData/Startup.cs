using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ViagemMasterData.Infrastructure;
using ViagemMasterData.Infrastructure.Shared;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.Service;


namespace ViagemMasterData
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200",
                                            "http://redemasterdata.viajantes2.tk",
                                            "http://importglx.viajantes2.tk",
                                            "http://viajantes2.tk")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
            });

            var connection = Configuration.GetConnectionString("ViagemMD");
            services.AddDbContext<BaseContext>(options =>
                options.UseSqlServer(connection)
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);

            services.AddMvc();
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<VehicleService>();
            services.AddTransient<TripService>();
            services.AddTransient<TripScheduleService>();
            services.AddTransient<TripulantService>();
            services.AddTransient<TripulantServiceService>();
            services.AddTransient<VehicleServiceService>();
            services.AddTransient<WorkBlockService>();

            services.AddTransient(typeof(IRepository<>), typeof(BaseRepository<>));

        }
    }
}
