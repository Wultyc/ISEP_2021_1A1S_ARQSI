using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.VehicleServiceDTOs;
using ViagemMasterData.Service;

namespace ViagemMasterData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleServiceController : Controller
    {
        private readonly VehicleServiceService _vehicleServiceService;

        public VehicleServiceController(VehicleServiceService vehicleServiceService)
        {
            _vehicleServiceService = vehicleServiceService;
        }

        [HttpGet]
        public IActionResult GetVehicleServices()
        {
            try
            {
                return new ObjectResult(_vehicleServiceService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostVehicleService([FromBody] CreateVehicleServiceDTO createVehicleService)
        {
            try
            {
                VehicleServiceDTO vehicleService= await _vehicleServiceService.PostAsync(createVehicleService);
                return Ok(new ObjectResult(vehicleService));

            }
            catch (BusinessRuleValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
