using System;
using System.Collections.Generic;

namespace Api.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Experiencias = new HashSet<Experiencias>();
            Inscricao = new HashSet<Inscricao>();
        }

        public int IdUsuario { get; set; }
        public string NomeCompleto { get; set; }
        public string Celular { get; set; }
        public string Cpf { get; set; }
        public string NomePersonalidade { get; set; }
        public string Curso { get; set; }
        public byte[] Curriculo { get; set; }
        public byte[] Foto { get; set; }
        public string Descricao { get; set; }
        public bool TemExperiencias { get; set; }
        public int IdAcesso { get; set; }
        public int IdEndereco { get; set; }
        public int IdAreaAtuacao { get; set; }
        public int IdPreferenciasTrabalho { get; set; }

        public virtual Acesso IdAcessoNavigation { get; set; }
        public virtual AreaAtuacao IdAreaAtuacaoNavigation { get; set; }
        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual PreferenciasTrabalho IdPreferenciasTrabalhoNavigation { get; set; }
        public virtual ICollection<Experiencias> Experiencias { get; set; }
        public virtual ICollection<Inscricao> Inscricao { get; set; }
    }
}
