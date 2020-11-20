using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Acesso
    {
        public Acesso()
        {
            Empresa = new HashSet<Empresa>();
            Usuario = new HashSet<Usuario>();
        }

        public int IdAcesso { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int IdTipoAcesso { get; set; }

        public virtual TipoAcesso IdTipoAcessoNavigation { get; set; }
        public virtual ICollection<Empresa> Empresa { get; set; }
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
