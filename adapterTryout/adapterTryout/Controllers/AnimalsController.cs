using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using adapterTryout.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace adapterTryout.Controllers
{
    [Route("api/animal")]
    public class AnimalsController : Controller
    {
        private readonly IAnimalService _animalService;

        public AnimalsController(IAnimalService animalService)
        {
            _animalService = animalService;
        }

        // GET api/values
        [HttpGet("")]
        public ActionResult Get()
        {
            var animals = _animalService.GetAll();
            return Ok(animals);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(Guid id)
        {
            var animal = _animalService.Get(id);
            return Ok(animal);
        }
    }
}
