using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemMasterData.Domain.Shared;
using ViagemMasterData.DTOs.TripulantServiceDTOs;
using ViagemMasterData.Service;

namespace ViagemMasterData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripulantServiceController : Controller
    {
        private readonly TripulantServiceService _tripulantServiceService;

        public TripulantServiceController(TripulantServiceService tripulantServiceService)
        {
            _tripulantServiceService = tripulantServiceService;
        }

        [HttpGet]
        public IActionResult GetTripulantServices()
        {
            try
            {
                return new ObjectResult(_tripulantServiceService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostTripulantService([FromBody] CreateTripulantServiceDTO createTripulantService)
        {
            try
            {
                TripulantServiceDTO tripulantService = await _tripulantServiceService.PostAsync(createTripulantService);
                return Ok(new ObjectResult(tripulantService));

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
