using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Endereco
    {
        public Endereco()
        {
            Empresa = new HashSet<Empresa>();
            Usuario = new HashSet<Usuario>();
        }

        public int IdEndereco { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Localidade { get; set; }
        public string Uf { get; set; }

        public virtual ICollection<Empresa> Empresa { get; set; }
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
