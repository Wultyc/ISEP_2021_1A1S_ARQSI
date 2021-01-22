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
        private readonly TripulantService _tripulantService;

        public TripulantController(TripulantService tripulantService)
        {
            _tripulantService = tripulantService;
        }

        // GET: api/tripulant
        [HttpGet]
        public IActionResult GetTripulants()
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

        // GET: api/tripulant/5
        [HttpGet("{Id}")]
        public IActionResult GetTripulant([FromRoute] string id)
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
        public async Task<IActionResult> PostTripulant([FromBody] CreateTripulantDTO createTripulant)
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

        // PUT: api/tripulant
        [HttpPut]
        public async Task<IActionResult> PutTripulant([FromBody] TripulantDTO tripulant)
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

        // DELETE: api/tripulant/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTripulant([FromRoute] string id)
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
