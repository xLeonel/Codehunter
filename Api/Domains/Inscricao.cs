using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Inscricao
    {
        public Inscricao()
        {
            Estagio = new HashSet<Estagio>();
        }

        public int IdInscricao { get; set; }
        public int IdUsuario { get; set; }
        public int IdVaga { get; set; }
        public int IdStatusInscricao { get; set; }

        public virtual StatusInscricao IdStatusInscricaoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual Vaga IdVagaNavigation { get; set; }
        public virtual ICollection<Estagio> Estagio { get; set; }
    }
}
