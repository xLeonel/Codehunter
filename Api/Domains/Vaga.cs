using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Vaga
    {
        public Vaga()
        {
            Beneficios = new HashSet<Beneficios>();
            Inscricao = new HashSet<Inscricao>();
            Tecnologia = new HashSet<Tecnologia>();
        }

        public int IdVaga { get; set; }
        public string Titulo { get; set; }
        public string DescricaoAtividades { get; set; }
        public string DescricaoRequisitos { get; set; }
        public string Localidade { get; set; }
        public DateTime DataPostada { get; set; }
        public DateTime DataValidadeVaga { get; set; }
        public int IdEmpresa { get; set; }
        public int IdAreaAtuacao { get; set; }
        public int IdRemoto { get; set; }
        public int IdRegimeContratacao { get; set; }

        public virtual AreaAtuacao IdAreaAtuacaoNavigation { get; set; }
        public virtual Empresa IdEmpresaNavigation { get; set; }
        public virtual RegimeContratacao IdRegimeContratacaoNavigation { get; set; }
        public virtual Remoto IdRemotoNavigation { get; set; }
        public virtual ICollection<Beneficios> Beneficios { get; set; }
        public virtual ICollection<Inscricao> Inscricao { get; set; }
        public virtual ICollection<Tecnologia> Tecnologia { get; set; }

    }
}
