using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Tecnologia
    {
        public int IdTecnologia { get; set; }
        public string NomeTecnologia { get; set; }
        public int? IdVaga { get; set; }

        public virtual Vaga IdVagaNavigation { get; set; }
    }
}
