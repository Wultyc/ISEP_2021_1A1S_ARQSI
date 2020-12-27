using DDDNetCore.Domain.Vehicles;
using DDDNetCore.DTOs;
using DDDNetCore.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly VehicleService _service;

        public VehiclesController(VehicleService service)
        {
            _service = service;
        }

        //GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Vehicles/5
        [Route("api/Vehicles/{Id}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetById(string id)
        {
            Console.WriteLine(id);
            var prod = await _service.GetByIdAsync(new VehicleId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }
    }
}
