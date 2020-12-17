using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class EmpresasRepository : RepositoryBase<Empresa>, IEmpresaRepository
    {
        CodehunterContext ctx = new CodehunterContext();
        private IAcessoRepository _acessoRepository { get; set; }
        private IEnderecoRepository _enderecoRepository { get; set; }
        private IAreaAtuacaoRepository _areaAtuacaoRepository { get; set; }
        private IVagaRepository _vagaRepository { get; set; }

        public EmpresasRepository()
        {
            _acessoRepository = new AcessosRepository();
            _enderecoRepository = new EnderecosRepository();
            _areaAtuacaoRepository = new AreasAtuacaoRepository();
            _vagaRepository = new VagasRepository();

        }

        public Empresa Login(string email, string senha)
        {
            Empresa empresaBuscado = ctx.Empresa
                .Include(x => x.IdAcessoNavigation)
                .FirstOrDefault(x => x.IdAcessoNavigation.Email == email && x.IdAcessoNavigation.Senha == senha);

            if (empresaBuscado != null)
            {
                return empresaBuscado;
            }

            return null;
        }

        public bool VerifyEmail(string email, out string emailBanco)
        {
            var SplitEmail = email.Split("@");

            var acesso = ctx.Acesso.Where(a => a.IdTipoAcesso == 3).ToList();

            foreach (var item in acesso)
            {
                var emailSplitado = item.Email.Split("@");

                if (emailSplitado[1].ToLower() == SplitEmail[1].ToLower())
                {
                    emailBanco = item.Email;
                    return true;
                }
            }

            emailBanco = "vazio";
            return false;
        }

        public void UpdateCascata(int id, Empresa empresa)
        {
            using (var ctx = new CodehunterContext())
            {

                var empresaBanco = ctx.Empresa.FirstOrDefault(e => e.IdEmpresa == id);
                var acessoBanco = ctx.Acesso.FirstOrDefault(a => a.IdAcesso == empresaBanco.IdAcesso);


                if (empresa.NomeFantasia != null)
                {
                    empresaBanco.NomeFantasia = empresa.NomeFantasia;
                }

                if (empresa.NumColaboradores != 0)
                {
                    empresaBanco.NumColaboradores = empresa.NumColaboradores;

                }

                if (empresa.NomeRepresentante != null)
                {
                    empresaBanco.NomeRepresentante = empresa.NomeRepresentante;

                }

                if (empresa.Celular != null)
                {
                    empresaBanco.Celular = empresa.Celular;

                }

                if (empresa.Descricao != null)
                {
                    empresaBanco.Descricao = empresa.Descricao;

                }

                if (empresa.Foto != null)
                {
                    empresaBanco.Foto = empresa.Foto;

                }

                ctx.SaveChanges();



                if (empresa.IdAcessoNavigation != null)
                {
                    Acesso acesso = new Acesso
                    {
                        IdAcesso = empresaBanco.IdAcesso,
                        Email = acessoBanco.Email,
                        Senha = empresa.IdAcessoNavigation.Senha,
                        IdTipoAcesso = 3
                    };

                    _acessoRepository.Update(acesso); 
                }

                if (empresa.IdAreaAtuacaoNavigation != null)
                {
                    AreaAtuacao areaAtuacao = new AreaAtuacao
                    {
                        IdAreaAtuacao = empresaBanco.IdAreaAtuacao,
                        NomeAreaAtuacao = empresa.IdAreaAtuacaoNavigation.NomeAreaAtuacao
                    };

                    _areaAtuacaoRepository.Update(areaAtuacao); 
                }

                if (empresa.IdEnderecoNavigation != null)
                {
                    Endereco endereco = new Endereco
                    {
                        IdEndereco = empresaBanco.IdEndereco,
                        Cep = empresa.IdEnderecoNavigation.Cep,
                        Logradouro = empresa.IdEnderecoNavigation.Logradouro,
                        Complemento = empresa.IdEnderecoNavigation.Complemento,
                        Bairro = empresa.IdEnderecoNavigation.Bairro,
                        Localidade = empresa.IdEnderecoNavigation.Localidade,
                        Uf = empresa.IdEnderecoNavigation.Uf
                    };

                    _enderecoRepository.Update(endereco); 
                }


            }
        }

        public void DeleteCascata(int id)
        {
            Empresa empresa = GetById(id);

            var vagas = ctx.Vaga.Where(i => i.IdEmpresa == id).ToList();

            foreach (var item in vagas)
            {
                _vagaRepository.DeleteCascata(item.IdVaga);
            }

            Delete(empresa);

            Acesso acesso = _acessoRepository.GetById(empresa.IdAcesso);

            _acessoRepository.Delete(acesso);

            Endereco endereco = _enderecoRepository.GetById(empresa.IdEndereco);

            _enderecoRepository.Delete(endereco);

        }

        public IEnumerable<FilialViewModel> GetFilial(string cnpj, int id)
        {
            var empresas = ctx.Empresa
                .Include(e => e.IdAcessoNavigation)
                .Include(e => e.IdEnderecoNavigation)
                .Include(e => e.Vaga)
                .ToList();

            List<FilialViewModel> filial = new List<FilialViewModel>();

            foreach (var item in empresas)
            {
                var cnpjBanco = item.Cnpj.Split("/");

                if (cnpj == cnpjBanco[0])
                {
                    if (item.IdEmpresa != id)
                    {

                        FilialViewModel filialViewModel = new FilialViewModel
                        {

                            NomeFantasia = item.NomeFantasia,
                            RazaoSocial = item.RazaoSocial,
                            NumColaboradores = item.NumColaboradores,
                            Cnpj = item.Cnpj,
                            NomeRepresentante = item.NomeRepresentante,
                            Celular = item.Celular,
                            Descricao = item.Descricao,
                            Email = item.IdAcessoNavigation.Email,
                            Logradouro = item.IdEnderecoNavigation.Logradouro,
                            NumVagas = item.Vaga.Count()
                        };

                        filial.Add(filialViewModel);

                    }
                }
            }

            return filial;
        }

        public IEnumerable<Empresa> AllEmpresas()
        {
            return ctx.Empresa
                .Include(e => e.IdAcessoNavigation)
                .Include(e => e.IdEnderecoNavigation)
                .ToList();
        }

        public IEnumerable<Vaga> GetVagasPorEmpresa(int id)
        {
            return ctx.Vaga
                .Include(v => v.IdAreaAtuacaoNavigation)
                .Include(v => v.IdRemotoNavigation)
                .Include(v => v.IdRegimeContratacaoNavigation)
               .Where(v => v.IdEmpresa == id)
               .ToList();
        }

        public Empresa EmpresaComplete(int id)
        {
            var empresa = ctx.Empresa
            .Include(u => u.IdEnderecoNavigation)
            .Include(u => u.IdAcessoNavigation)
            .FirstOrDefault(u => u.IdEmpresa == id);

            return empresa;
        }
    }
}
