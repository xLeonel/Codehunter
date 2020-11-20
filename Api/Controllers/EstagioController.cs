using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Domains;
using Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wlniao;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(Roles = "2")] // ADM
    [ApiController]
    public class EstagioController : ControllerBase
    {
        private EstagiosRepository _internshipRepository { get; set; }
        public EstagioController()
        {
            _internshipRepository = new EstagiosRepository();
        }

        [HttpGet("ExportarCsv")]
        public async Task<IActionResult> Download()
        {
            _internshipRepository.ExportCSV();

            const string PATH = @"Csv\estagios.csv";

            string mimeType = MimeMapping.GetMimeMapping(PATH);

            var bytes = await System.IO.File.ReadAllBytesAsync(PATH);

            return File(bytes, mimeType, PATH);
        }

        [HttpPost]
        public IActionResult Add(Estagio internship)
        {
            try
            {
                internship.IdContratoNavigation.IdStatusContrato = 1;

                _internshipRepository.Add(internship);
                return Ok("Estágio Cadastrado com Sucesso");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("AllInternship")]
        public IEnumerable<Estagio> GetAll()
        {
            return _internshipRepository.AllEstagios();
        }

        [HttpGet("{id}")]
        public Estagio GetInternshipContracts(int id)
        {
            Estagio internship = _internshipRepository.GetInternshipContracts(id);

            return internship;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var obj = _internshipRepository.GetById(id);
                _internshipRepository.Delete(obj);

                return Ok("Estágio Deletado.");
            }
            catch
            {
                return BadRequest("Erro ao Deletar.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Estagio internship, int id)
        {
            try
            {
                bool intership = _internshipRepository.UpdateCascade(id, internship);

                if (intership == true)
                {
                    return Ok("Estágio Atualizado.");
                }
                return NotFound("Estágio Não Encontrado");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Erro ao Atualizar o Estágio ");
            }
        }
    }
}