using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Empresa
    {
        public Empresa()
        {
            Vaga = new HashSet<Vaga>();
        }

        public int IdEmpresa { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public int NumColaboradores { get; set; }
        public string Cnpj { get; set; }
        public string NomeRepresentante { get; set; }
        public byte[] Foto { get; set; }
        public string Celular { get; set; }
        public string Descricao { get; set; }
        public int IdAcesso { get; set; }
        public int IdEndereco { get; set; }
        public int IdAreaAtuacao { get; set; }

        public virtual Acesso IdAcessoNavigation { get; set; }
        public virtual AreaAtuacao IdAreaAtuacaoNavigation { get; set; }
        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
