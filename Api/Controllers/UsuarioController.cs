using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.Repositories;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        private IInscricaoRepository _inscricaoRepository { get; set; }

        public UsuarioController()
        {
            _usuarioRepository = new UsuariosRepository();
            _inscricaoRepository = new InscricoesRepository();
        }

        [Authorize(Roles = "2")]
        [HttpGet("AllUsers")]
        public IEnumerable<UsuarioViewModel> GetAll()
        {
            return _usuarioRepository.AllUsers();
        }

        [Authorize(Roles = "1")]
        [HttpGet("Inscricao")]
        public IActionResult GetInscricaoByUser()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            var lista = _inscricaoRepository.GetInscricaoByUser(id);

            if (lista.Count() != 0)
            {
                return Ok(lista);
            }
            else
            {
                return NotFound("Usuario não possui inscrições.");
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("VagasMatch")]
        public IActionResult GetVagasMatch()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            var vagas = _usuarioRepository.VagaSugest(id);

            if (vagas.Count() != 0)
            {
                return Ok(vagas);
            }
            else
            {
                return NotFound("Nenhuma vaga compatível com o usuário.");
            }
        }

        [Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult GetByIdUser()
        {
            var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            if (_usuarioRepository.GetById(id) != null)
            {
                return Ok(_usuarioRepository.myUserComplete(id));
            }
            else
            {
                return BadRequest("Usuario não encontrado.");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post(Usuario usuario)
        {
            try
            {
                if (_usuarioRepository.IsAluno(usuario.IdAcessoNavigation.Email, out string curso))
                {
                    _ = usuario.Experiencias.Count() == 0 ? usuario.TemExperiencias = false : usuario.TemExperiencias = true;

                    usuario.Curso = curso;

                    usuario.IdAcessoNavigation.IdTipoAcesso = 1;

                    _usuarioRepository.Add(usuario);

                    return Ok("Cadastrado");

                }
                else
                {
                    return BadRequest("Email deve pertencer a um aluno.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok("Erro ao cadastrar o usuário");
            }
        }

        [AllowAnonymous]
        [HttpPost("IsAluno")]
        public string VerificarEmail(Usuario usuario)
        {
            try
            {
                if (_usuarioRepository.IsAluno(usuario.IdAcessoNavigation.Email, out string curso))
                {
                    return "true";
                }
                else
                {
                    return "false";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return "false";
            }
        }


        [AllowAnonymous]
        [HttpPost("Adm")]
        public IActionResult PostADM(Usuario usuario)
        {
            try
            {
                _ = usuario.Experiencias.Count() == 0 ? usuario.TemExperiencias = false : usuario.TemExperiencias = true;

                usuario.Curso = "adm";

                usuario.IdAcessoNavigation.IdTipoAcesso = 2;

                _usuarioRepository.Add(usuario);

                return Ok("Cadastrado");

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok("Erro ao cadastrar o usuário");
            }
        }

        [AllowAnonymous]
        [HttpPost("RecuperarSenha")]
        public IActionResult RecuperarSenha(Acesso acesso)
        {
            var result = _usuarioRepository.RecuperarSenha(acesso.Email);

            if (result)
            {
                return Ok("Email enviado com sucesso");
            }
            else
            {
                return BadRequest("Erro ao enviar o email");
            }
        }

        [Authorize(Roles = "1,2")]
        [HttpPut]
        public IActionResult Put(Usuario usuario)
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _usuarioRepository.UpdateCascata(id, usuario);

                return Ok("Usuário atualizado.");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Erro ao atualizar o Usuário ");
            }
        }

        [Authorize(Roles = "1,2")]
        [HttpDelete]
        public IActionResult Delete()
        {
            try
            {
                var id = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _usuarioRepository.DeleteCascata(id);

                return Ok("Usuário Deletado.");
            }
            catch
            {
                return BadRequest("Erro ao deletar.");
            }
        }
    }
}

