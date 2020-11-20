using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class StatusContrato
    {
        public StatusContrato()
        {
            Contrato = new HashSet<Contrato>();
        }

        public int IdStatusContrato { get; set; }
        public string StatusContrato1 { get; set; }

        public virtual ICollection<Contrato> Contrato { get; set; }
    }
}
