using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class TipoAcesso
    {
        public TipoAcesso()
        {
            Acesso = new HashSet<Acesso>();
        }

        public int IdAcesso { get; set; }
        public string TipoAcesso1 { get; set; }

        public virtual ICollection<Acesso> Acesso { get; set; }
    }
}
