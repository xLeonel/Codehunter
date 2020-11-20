using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Estagio
    {
        public int IdEstagio { get; set; }
        public byte[] ContratoPdf { get; set; }
        public int? IdInscricao { get; set; }
        public int? IdContrato { get; set; }

        public virtual Contrato IdContratoNavigation { get; set; }
        public virtual Inscricao IdInscricaoNavigation { get; set; }
    }
}
