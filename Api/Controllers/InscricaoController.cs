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

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class InscricaoController : ControllerBase
    {
        CodehunterContext ctx = new CodehunterContext();
        private IInscricaoRepository _inscricaoRepository { get; set; }
        public InscricaoController()
        {
            _inscricaoRepository = new InscricoesRepository();
        }

        [Authorize(Roles = "2")]
        [HttpGet]
        public IEnumerable<Inscricao> Get()
        {
            return _inscricaoRepository.GetAll();
        }

        [Authorize(Roles = "1")]
        [HttpGet("VerificarInscricao/{idVaga}")]
        public bool VerificarInscricaoByUser(int idVaga)
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return _inscricaoRepository.VerificarInscricao(id, idVaga);
        }

        [Authorize(Roles = "2")]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (_inscricaoRepository.GetById(id) != null)
            {
                return Ok(_inscricaoRepository.GetById(id));
            }
            else
            {
                return BadRequest("Usuario não encontrado.");
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("UserByInscricoes/{id}")]
        public IEnumerable<InscricaoEmpresaViewModel> GetUserInscritos(int id)
        {
            return _inscricaoRepository.GetUsuariosPorInscricao(id);
        }

        [Authorize(Roles = "2")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Inscricao inscricao)
        {
            try
            {
                var inscricaoDatabase = ctx.Inscricao.FirstOrDefault(I => I.IdInscricao == id);

                Inscricao inscricaoBanco = new Inscricao()
                {
                    IdInscricao = id,
                    IdUsuario = inscricaoDatabase.IdUsuario,
                    IdVaga = inscricaoDatabase.IdVaga,
                    IdStatusInscricao = inscricao.IdStatusInscricao
                };

                _inscricaoRepository.Update(inscricaoBanco);


                return Ok("Inscricao atualizado.");
            }
            catch
            {
                return BadRequest("Erro ao atualizar a inscricao ");

            }
        }

        [Authorize(Roles = "2")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var inscricao = _inscricaoRepository.GetById(id);

                _inscricaoRepository.Delete(inscricao);

                return Ok("Inscricao Deletado.");
            }
            catch
            {
                return BadRequest("Erro ao deletar a inscricao.");
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Inscricao inscricao)
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                inscricao.IdUsuario = id;

                inscricao.IdStatusInscricao = 1;

                _inscricaoRepository.Add(inscricao);

                return Ok("Inscricao atualizado.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok("Erro ao cadastrar o inscricao");
            }
        }
    }
}
