using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class AreaAtuacao
    {
        public AreaAtuacao()
        {
            Empresa = new HashSet<Empresa>();
            Usuario = new HashSet<Usuario>();
            Vaga = new HashSet<Vaga>();
        }

        public int IdAreaAtuacao { get; set; }
        public string NomeAreaAtuacao { get; set; }

        public virtual ICollection<Empresa> Empresa { get; set; }
        public virtual ICollection<Usuario> Usuario { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
