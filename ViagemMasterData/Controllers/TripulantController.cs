using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.TripulantDTOs;
using ViagemMasterData.Service;

namespace ViagemMasterData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripulantController : Controller
    {
        private readonly TripulantServiceService _tripulantService;

        public TripulantController(TripulantServiceService tripulantService)
        {
            _tripulantService = tripulantService;
        }

        // GET: api/vehicle
        [HttpGet]
        public IActionResult GetVehicles()
        {
            try
            {
                return new ObjectResult(_tripulantService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/vehicle/5
        [HttpGet("{Id}")]
        public IActionResult GetVehicle([FromRoute] string id)
        {
            try
            {
                TripulantDTO tripulant = _tripulantService.Get(id);
                if (tripulant == null)
                {
                    return NotFound("Id Not Found: " + id);
                }
                return new ObjectResult(tripulant);
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

        // POST: api/tripulant
        [HttpPost]
        public async Task<IActionResult> PostVehicle([FromBody] CreateTripulantDTO createTripulant)
        {
            try
            {
                TripulantDTO tripulant = await _tripulantService.PostAsync(createTripulant);
                return Ok(new ObjectResult(tripulant));

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

        // PUT: api/vehicle
        [HttpPut]
        public async Task<IActionResult> PutVehicle([FromBody] TripulantDTO tripulant)
        {
            try
            {
                await _tripulantService.Put(tripulant);
                return Ok(new ObjectResult(tripulant));
            }
            catch (ArgumentNullException ex)
            {
                return NotFound(ex);
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

        // DELETE: api/vehicle/5
        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle([FromRoute] string id)
        {
            try
            {
                _tripulantService.Delete(id);

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
