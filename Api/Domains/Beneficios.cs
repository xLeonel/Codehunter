using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Beneficios
    {
        public int IdBeneficios { get; set; }
        public string NomeBeneficios { get; set; }
        public int? IdVaga { get; set; }

        public virtual Vaga IdVagaNavigation { get; set; }
    }
}
