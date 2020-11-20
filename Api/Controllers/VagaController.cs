using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.Repositories;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(Roles = "3")]
    [ApiController]
    public class VagaController : ControllerBase
    {
        private IVagaRepository _vagaRepository { get; set; }
       
        public VagaController()
        {
            _vagaRepository = new VagasRepository();         
        }

        [HttpPost]
        public IActionResult Add(Vaga vaga)
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                vaga.IdEmpresa = id;

                _vagaRepository.Add(vaga);
                return Ok("Vaga cadastrada com sucesso");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("Erro ao cadastrar vaga");
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<VagaMatchViewModel> GetAll()
        {
            return _vagaRepository.GetAllPropsVagas();
        }


        [AllowAnonymous]
        [HttpGet("Mobile")]
        public IEnumerable<VagaMatchViewModelMobile> GetAllMobile()
        {
            return _vagaRepository.GetAllMobile();
        }


        [HttpGet("Empresa")]
        public IEnumerable<VagaMatchViewModelMobile> GetvagasPorEmpresa()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return _vagaRepository.GetVagasPorEmpresa(id);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Vaga vaga)
        {
            try
            {
                _vagaRepository.UpdateCascata(id, vaga);


                return Ok("Vaga atualizada com sucesso");
            }
            catch
            {
                return BadRequest("Erro ao atualizar vaga");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _vagaRepository.DeleteCascata(id);

                return Ok("Vaga deletada com sucesso");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Erro ao deletar vaga");
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (_vagaRepository.GetById(id) != null)
            {
                return Ok(_vagaRepository.GetPropsById(id));
            }
            else
            {
                return BadRequest("Vaga não encontrada");
            }
        }
    }
}
