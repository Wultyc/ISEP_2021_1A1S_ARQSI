using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs;
using ViagemMasterData.Service;

namespace ViagemMasterData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripulantsController : Controller
    {
        private readonly TripulantService _tripulantService;

        public TripulantsController(TripulantService tripulantService)
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

        // POST: api/vehicle
        [HttpPost]
        public async Task<TripulantDTO> PostVehicle([FromBody] CreateTripulantDTO createTripulant)
        {
            //try
            //{
                TripulantDTO tripulant = await _tripulantService.PostAsync(createTripulant);
                return tripulant;

            //}
            //catch (BusinessRuleValidationException ex)
            //{
            //    return new BadRequestObjectResult(ex.Message);
            //}
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
