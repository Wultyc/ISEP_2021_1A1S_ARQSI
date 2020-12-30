using ViagemMasterData.Domain.Trips;
using ViagemMasterData.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ViagemMasterData.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TripController : Controller
    {

        private readonly TripService _tripService;

        public TripController(TripService tripService)
        {
            _tripService = tripService;
        }

        // GET: api/trip
        [HttpGet]
        public IActionResult GetTrips()
        {
            try
            {
                return new ObjectResult(_tripService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/trip/5
        [HttpGet("{id}")]
        public IActionResult GetTrip([FromRoute] string id)
        {
            try
            {
                TripDTO trip = _tripService.Get(id);
                return new ObjectResult(trip);
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

        // POST: api/trip/adhoc
        [HttpPost("/adhoc")]
        public async Task<IActionResult> PostAdHocTrip([FromBody] CreateTripAdHocDTO createTripAdHoc)
        {
            try
            {
                TripDTO trip = await _tripService.PostAdHocAsync(createTripAdHoc);
                return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);

            }
            catch (BusinessRuleValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // POST: api/trip
        [HttpPost]
        public async Task<IActionResult> PostTrip([FromBody] CreateTripDTO createTrip)
        {
            try
            {
                TripDTO trip = await _tripService.PostAsync(createTrip);
                return CreatedAtAction(nameof(GetTrip), new { id = trip.Id }, trip);

            }
            catch (BusinessRuleValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // DELETE: api/trip/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTrip([FromRoute] string id)
        {
            try
            {
                _tripService.Delete(id);

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
