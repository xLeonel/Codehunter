using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Contrato
    {
        public Contrato()
        {
            Estagio = new HashSet<Estagio>();
        }

        public int IdContrato { get; set; }
        public DateTime? Inicio { get; set; }
        public DateTime? Previsto { get; set; }
        public DateTime? Efetivado { get; set; }
        public int? IdStatusContrato { get; set; }

        public virtual StatusContrato IdStatusContratoNavigation { get; set; }
        public virtual ICollection<Estagio> Estagio { get; set; }
    }
}
