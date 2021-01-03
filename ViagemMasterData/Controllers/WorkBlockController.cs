using ViagemMasterData.Domain.WorkBlocks;
using ViagemMasterData.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using ViagemMasterData.Service;
using ViagemMasterData.DTOs.WorkBlockDTOs;

namespace ViagemMasterData.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class WorkBlockController : Controller
    {

        private readonly WorkBlockService _workBlockService;

        public WorkBlockController(WorkBlockService workBlockService)
        {
            _workBlockService = workBlockService;
        }

        // GET: api/workBlock
        [HttpGet]
        public IActionResult GetWorkBlocks()
        {
            try
            {
                return new ObjectResult(_workBlockService.Get());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/workBlock/5
        [HttpGet("{id}")]
        public IActionResult GetWorkBlock([FromRoute] string id)
        {
            try
            {
                WorkBlockDTO workBlock = _workBlockService.Get(id);
                if (workBlock == null)
                {
                    return NotFound("Id Not Found: " + id);
                }
                return new ObjectResult(workBlock);
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

        // POST: api/workBlock
        [HttpPost]
        public IActionResult PostWorkBlock([FromBody] CreateWorkBlockDTO createWorkBlock)
        {
            try
            {
                List<WorkBlockDTO> workBlockList = _workBlockService.PostAsync(createWorkBlock);
                return new ObjectResult(workBlockList);

            }
            catch (BusinessRuleValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        // DELETE: api/workBlock/5
        [HttpDelete("{id}")]
        public IActionResult DeleteWorkBlock([FromRoute] string id)
        {
            try
            {
                _workBlockService.Delete(id);

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
