using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class RegimeContratacao
    {
        public RegimeContratacao()
        {
            PreferenciasTrabalho = new HashSet<PreferenciasTrabalho>();
            Vaga = new HashSet<Vaga>();
        }

        public int IdRegimeContratacao { get; set; }
        public string NomeRegimeContratacao { get; set; }
        public string ExpectativaSalario { get; set; }

        public virtual ICollection<PreferenciasTrabalho> PreferenciasTrabalho { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
