using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class StatusInscricao
    {
        public StatusInscricao()
        {
            Inscricao = new HashSet<Inscricao>();
        }

        public int IdStatusInscricao { get; set; }
        public string StatusInscricao1 { get; set; }

        public virtual ICollection<Inscricao> Inscricao { get; set; }
    }
}
