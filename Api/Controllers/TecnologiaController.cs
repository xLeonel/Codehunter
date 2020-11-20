using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domains;
using Api.Interfaces;
using Api.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TecnologiaController : ControllerBase
    {

        private ITecnologiaRepository _tecnologiaRepository { get; set; }

        public TecnologiaController()
        {
            _tecnologiaRepository = new TecnologiasRepository();
        }

        [HttpGet]
        public IEnumerable<Tecnologia> GetAll()
        {
            return _tecnologiaRepository.GetAll();
        }

        [HttpGet("{id}")]
        public IEnumerable<Tecnologia> GetAllByVaga(int id)
        {
            return _tecnologiaRepository.GetAllByVaga(id);
        }
    }
}
