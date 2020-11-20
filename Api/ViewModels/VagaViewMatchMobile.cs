using Api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class VagaMatchViewModelMobile
    {
        public int IdVaga { get; set; }
        public string Titulo { get; set; }
        public string DescricaoAtividades { get; set; }
        public string DescricaoRequisitos { get; set; }
        public string Localidade { get; set; }
        public string Empresa { get; set; }
        public string Remoto { get; set; }
        public string AreaAtuacaoVaga { get; set; }
        public string RegimeContratacao { get; set; }
        public string Salario { get; set; }
        public List<string> Beneficios { get; set; }
        public List<string> Tecnologia { get; set; }

    }
}
