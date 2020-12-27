using ViagemMasterData.Domain.Vehicles;
using ViagemMasterData.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ViagemMasterData.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : Controller
    {

        private readonly VehicleService _vehicleService;

        public VehicleController(VehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        // GET: api/vehicle
        [HttpGet]
        public IActionResult GetVehicles()
        {
            try
            {
                return new ObjectResult(_vehicleService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/vehicle/5
        [HttpGet("{code}")]
        public IActionResult GetVehicle([FromRoute] string code)
        {
            try
            {
                VehicleDTO vehicle = _vehicleService.Get(code);
                return new ObjectResult(vehicle);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST: api/vehicle
        [HttpPost]
        public IActionResult PostVehicle([FromBody] CreateVehicleDTO createVehicle)
        {
            // TODO
            // String vehicleType = _vehicleTypeService.Get(vehicle.VehicleType);
            String vehicleType = "to do";

            if (vehicleType != null)
            {

                VehicleDTO vehicle = _vehicleService.Post(createVehicle);
                return CreatedAtAction(nameof(GetVehicle), new { code = vehicle.Code }, vehicle);
            }
            else
            {
                return new BadRequestObjectResult("Vehicle Type not found.");
            }
        }

        // PUT: api/vehicle
        [HttpPut]
        public IActionResult PutVehicle([FromBody] VehicleDTO vehicle)
        {
            try
            {
                _vehicleService.Put(vehicle);
                return Ok(new ObjectResult(vehicle));
            }
            catch (ArgumentNullException ex)
            {
                return NotFound(ex);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE: api/vehicle/5
        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle([FromRoute] string id)
        {
            try
            {
                _vehicleService.Delete(id);

                return Ok(new NoContentResult());
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }

}
