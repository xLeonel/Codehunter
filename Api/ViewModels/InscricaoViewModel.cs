using Api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class InscricaoViewModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string DescricaoAtividades { get; set; }
        public string DescricaoRequisitos { get; set; }
        public string Localidade { get; set; }
        public DateTime DataPostada { get; set; }
        public DateTime DataValidadeVaga { get; set; }
        public string AreaAtuacao { get; set; }
        public string Salario { get; set; }
        public string VagaRemota { get; set; }
        public string Empresa { get; set; }
        public string Situacao { get; set; }

        public ICollection<string> Tecnologia { get; set; }
        public ICollection<string> Beneficios { get; set; }

    } 
}
