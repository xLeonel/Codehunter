using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Remoto
    {
        public Remoto()
        {
            PreferenciasTrabalho = new HashSet<PreferenciasTrabalho>();
            Vaga = new HashSet<Vaga>();
        }

        public int IdRemoto { get; set; }
        public string NomeRemoto { get; set; }

        public virtual ICollection<PreferenciasTrabalho> PreferenciasTrabalho { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
