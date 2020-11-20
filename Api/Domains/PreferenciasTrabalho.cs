using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class PreferenciasTrabalho
    {
        public PreferenciasTrabalho()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int IdPreferenciasTrabalho { get; set; }
        public string Linkedin { get; set; }
        public string Github { get; set; }
        public string StackOverflow { get; set; }
        public string SitePessoal { get; set; }
        public string NivelIngles { get; set; }
        public string SituacaoProfissional { get; set; }
        public int IdRemoto { get; set; }
        public int IdRegimeContratacao { get; set; }

        public virtual RegimeContratacao IdRegimeContratacaoNavigation { get; set; }
        public virtual Remoto IdRemotoNavigation { get; set; }
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
