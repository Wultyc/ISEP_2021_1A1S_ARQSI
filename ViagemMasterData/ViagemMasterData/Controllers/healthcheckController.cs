using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViagemMasterData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class healthcheckController : Controller
    {

        [HttpGet]
        public string GetHealthy()
        {
                return "I'm alive";  
        }
    }
}
