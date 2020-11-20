using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private IEmpresaRepository _empresaRepository { get; set; }

        public EmpresaController()
        {
            _empresaRepository = new EmpresasRepository();    
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Add(Empresa empresa)
        {
            try
            {
                bool emailExiste = _empresaRepository.VerifyEmail(empresa.IdAcessoNavigation.Email, out string emailBanco);

                if (!emailExiste)
                {
                    empresa.IdAcessoNavigation.IdTipoAcesso = 3;
                    _empresaRepository.Add(empresa);
                    return Ok("Cadastrado com sucesso");
                }
                else
                {
                    string error = $"Email já cadastrado. Entre em contato com {emailBanco}, para solicitar um acesso.";
                    return BadRequest(error);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "3")]
        [HttpPost("Filial")]
        public IActionResult AddFilial(Empresa empresa)
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                var empresaBanco = _empresaRepository.GetById(id);

                empresa.RazaoSocial = empresaBanco.RazaoSocial;

                // 02.468.861/0001-24

                var cnpjBanco = empresaBanco.Cnpj.Split("/");

                var cnpj = empresa.Cnpj.Split("/");

                if (cnpj[0] == cnpjBanco[0])
                {
                    empresa.IdAcessoNavigation.IdTipoAcesso = 3;

                    _empresaRepository.Add(empresa);

                    return Ok("Cadastrado com sucesso");
                }
                else
                {
                    return BadRequest("Cnpj inválido");
                }
              
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("Filial")]
        public IActionResult GetFilial()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            var empresaBanco = _empresaRepository.GetById(id);

            var cnpjBanco = empresaBanco.Cnpj.Split("/");

            var filial = _empresaRepository.GetFilial(cnpjBanco[0], id);

            if (filial.Count() != 0)
            {
                return Ok(filial);
            }
            else
            {
                return NotFound(filial);
            }
        }

        [Authorize(Roles = "2")]
        [HttpGet("AllEmpresas")]
        public IEnumerable<Empresa> GetAll()
        {
            return _empresaRepository.AllEmpresas(); 
        }

        [Authorize(Roles = "3")]
        [HttpGet("Vagas")]
        public IEnumerable<Vaga> GetVagasPorEmpresa()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return _empresaRepository.GetVagasPorEmpresa(id);
        }

        [Authorize(Roles = "3")]
        [HttpPut]
        public IActionResult Update(Empresa empresa)
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _empresaRepository.UpdateCascata(id, empresa);
                return Ok("Atualizado com sucesso");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Erro ao atualizar");
            }
        }

        [Authorize(Roles = "3")]
        [HttpDelete]
        public IActionResult Delete()
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _empresaRepository.DeleteCascata(id);

                return Ok("Deletado com sucesso");
            }
            catch
            {
                return BadRequest("Erro ao deletar");
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet]
        public IActionResult GetById()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            if (_empresaRepository.GetById(id) != null)
            {
                return Ok(_empresaRepository.EmpresaComplete(id));
            }
            else
            {
                return BadRequest("Empresa não encontrada");
            }
        }
    }
}
