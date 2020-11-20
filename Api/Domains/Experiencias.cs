using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Experiencias
    {
        public int IdExperiencias { get; set; }
        public string NomeEmpresa { get; set; }
        public string Cargo { get; set; }
        public DateTime? DateInicio { get; set; }
        public DateTime? DateFim { get; set; }
        public int? IdUsuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
