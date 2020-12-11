using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.ViewModels;
using LumenWorks.Framework.IO.Csv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class UsuariosRepository : RepositoryBase<Usuario>, IUsuarioRepository
    {
        CodehunterContext ctx = new CodehunterContext();

        private AcessosRepository _acessoRepository { get; set; }
        private EnderecosRepository _enderecoRepository { get; set; }
        private AreasAtuacaoRepository _areaAtuacaoRepository { get; set; }
        private ExperienciasRepository _experienciasRepository { get; set; }
        private PreferenciasTrabalhoRepository _prefTrabalhoRepository { get; set; }
        private RegimeContratacaoRepository _regContratacaoRepository { get; set; }
        private InscricoesRepository _inscricaoRepository { get; set; }
        private EstagiosRepository _estagioRepository { get; set; }

        public UsuariosRepository()
        {
            _acessoRepository = new AcessosRepository();
            _enderecoRepository = new EnderecosRepository();
            _areaAtuacaoRepository = new AreasAtuacaoRepository();
            _experienciasRepository = new ExperienciasRepository();
            _prefTrabalhoRepository = new PreferenciasTrabalhoRepository();
            _regContratacaoRepository = new RegimeContratacaoRepository();
            _inscricaoRepository = new InscricoesRepository();
            _estagioRepository = new EstagiosRepository();
        }

        public bool IsAluno(string email, out string curso)
        {
            var csvTable = new DataTable();

            using (var csvReader = new CsvReader(new StreamReader(System.IO.File.OpenRead(@"Csv\alunos.csv")), true))
            {
                csvTable.Load(csvReader);
            }

            for (int i = 0; i < csvTable.Rows.Count; i++)
            {
                if (csvTable.Rows[i][4].ToString().ToLower() == email.ToLower())
                {
                    curso = csvTable.Rows[i][7].ToString();
                    return true;
                }
            }
            curso = "sem curso";

            return false;

            //LIMPA OS DADOS IGUAIS

            //var distinct = new HashSet<string>();

            //foreach (var item in searchParameters)
            //{
            //    if (!distinct.Add($"({item.Email}),"))
            //    {
            //    };
            //}


        }
        public Usuario Login(string email, string senha)
        {
            Usuario usuarioBuscado = ctx.Usuario
                .Include(x => x.IdAcessoNavigation)
                .FirstOrDefault(x => x.IdAcessoNavigation.Email == email && x.IdAcessoNavigation.Senha == senha);

            if (usuarioBuscado != null)
            {
                return usuarioBuscado;
            }

            return null;

        }
        public void UpdateCascata(int id, Usuario usuario)
        {
            using (var ctx = new CodehunterContext())
            {

                var usuarioBanco = ctx.Usuario
                    .Include(u => u.IdPreferenciasTrabalhoNavigation)
                    .FirstOrDefault(e => e.IdUsuario == id);
                var acessoBanco = ctx.Acesso.FirstOrDefault(a => a.IdAcesso == usuarioBanco.IdAcesso);
                //var prefTrabalhoBanco = ctx.PreferenciasTrabalho.FirstOrDefault(p => p.IdPreferenciasTrabalho == usuarioBanco.IdPreferenciasTrabalho);



                if (usuario.Celular != null)
                {
                    usuarioBanco.Celular = usuario.Celular;
                }
                if (usuario.NomePersonalidade != null)
                {
                    usuarioBanco.NomePersonalidade = usuario.NomePersonalidade;

                }
                if (usuario.Curriculo != null)
                {
                    usuarioBanco.Curriculo = usuario.Curriculo;

                }
                if (usuario.Foto != null)
                {
                    usuarioBanco.Foto = usuario.Foto;

                }
                if (usuario.Descricao != null)
                {
                    usuarioBanco.Descricao = usuario.Descricao;
                }

                ctx.SaveChanges();

                if (usuario.IdAcessoNavigation != null)
                {
                    Acesso acesso = new Acesso
                    {
                        IdAcesso = usuarioBanco.IdAcesso,
                        Email = acessoBanco.Email,
                        Senha = usuario.IdAcessoNavigation.Senha,
                        IdTipoAcesso = 1
                    };

                    _acessoRepository.Update(acesso);
                }

                if (usuario.IdAreaAtuacaoNavigation != null)
                {
                    AreaAtuacao areaAtuacao = new AreaAtuacao
                    {
                        IdAreaAtuacao = usuarioBanco.IdAreaAtuacao,
                        NomeAreaAtuacao = usuario.IdAreaAtuacaoNavigation.NomeAreaAtuacao
                    };

                    _areaAtuacaoRepository.Update(areaAtuacao);
                }


                if (usuario.IdEnderecoNavigation != null)
                {
                    Endereco endereco = new Endereco
                    {
                        IdEndereco = usuarioBanco.IdEndereco,
                        Cep = usuario.IdEnderecoNavigation.Cep,
                        Logradouro = usuario.IdEnderecoNavigation.Logradouro,
                        Complemento = usuario.IdEnderecoNavigation.Complemento,
                        Bairro = usuario.IdEnderecoNavigation.Bairro,
                        Localidade = usuario.IdEnderecoNavigation.Localidade,
                        Uf = usuario.IdEnderecoNavigation.Uf
                    };

                    _enderecoRepository.Update(endereco);
                }

                if (usuario.IdPreferenciasTrabalhoNavigation != null)
                {
                    PreferenciasTrabalho preferenciasTrabalho = new PreferenciasTrabalho
                    {
                        IdPreferenciasTrabalho = usuarioBanco.IdPreferenciasTrabalho,
                        Linkedin = usuario.IdPreferenciasTrabalhoNavigation.Linkedin,
                        Github = usuario.IdPreferenciasTrabalhoNavigation.Github,
                        StackOverflow = usuario.IdPreferenciasTrabalhoNavigation.StackOverflow,
                        SitePessoal = usuario.IdPreferenciasTrabalhoNavigation.SitePessoal,
                        NivelIngles = usuario.IdPreferenciasTrabalhoNavigation.NivelIngles,
                        SituacaoProfissional = usuario.IdPreferenciasTrabalhoNavigation.SituacaoProfissional,
                        IdRemoto = usuario.IdPreferenciasTrabalhoNavigation.IdRemoto,
                        IdRegimeContratacao = usuarioBanco.IdPreferenciasTrabalhoNavigation.IdRegimeContratacao
                    };

                    _prefTrabalhoRepository.Update(preferenciasTrabalho);
                }

                if (usuario.IdPreferenciasTrabalhoNavigation != null)
                {
                    if (usuario.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation != null)
                    {
                        RegimeContratacao regimeContratacao = new RegimeContratacao
                        {
                            IdRegimeContratacao = usuarioBanco.IdPreferenciasTrabalhoNavigation.IdRegimeContratacao,
                            NomeRegimeContratacao = usuario.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation.NomeRegimeContratacao,
                            ExpectativaSalario = usuario.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation.ExpectativaSalario
                        };

                        _regContratacaoRepository.Update(regimeContratacao);
                    }
                }

                #region EXPERIENCIAS

                if (usuario.Experiencias != null)
                {
                    var lista = ctx.Experiencias.Where(x => x.IdUsuario == id).ToList();

                    var numeros = new int[lista.Count];

                    var num = 0;

                    foreach (var item in lista)
                    {
                        numeros[num] = item.IdExperiencias;
                        num++;
                    }

                    num = 0;


                    foreach (var item in usuario.Experiencias)
                    {
                        try
                        {
                            int startIndex = numeros.IndexOf(numeros[num]);

                            Experiencias experiencias = new Experiencias
                            {
                                IdExperiencias = numeros[num],
                                NomeEmpresa = item.NomeEmpresa,
                                Cargo = item.Cargo,
                                DateInicio = item.DateInicio,
                                DateFim = item.DateFim,
                                IdUsuario = id
                            };

                            _experienciasRepository.Update(experiencias);
                        }
                        catch (Exception)
                        {
                            Experiencias experienciasNova = new Experiencias
                            {
                                NomeEmpresa = item.NomeEmpresa,
                                Cargo = item.Cargo,
                                DateInicio = item.DateInicio,
                                DateFim = item.DateFim,
                                IdUsuario = id
                            };

                            _experienciasRepository.Add(experienciasNova);
                        }

                        num++;

                    }
                }

                #endregion

            }
        }
        public void DeleteCascata(int id)
        {
            var lista = ctx.Experiencias.Where(E => E.IdUsuario == id);

            foreach (var item in lista)
            {
                _experienciasRepository.Delete(item);
            }

            Usuario user = ctx.Usuario
                .Include(u => u.IdAcessoNavigation)
                .Include(u => u.IdEnderecoNavigation)
                .Include(u => u.IdPreferenciasTrabalhoNavigation)
                .Include(u => u.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation)
                .FirstOrDefault(u => u.IdUsuario == id);

            var inscricao = ctx.Inscricao.Where(i => i.IdUsuario == id).Include(i => i.IdVagaNavigation.IdRegimeContratacaoNavigation).ToList();

            foreach (var item in inscricao)
            {
                if (item.IdVagaNavigation.IdRegimeContratacaoNavigation.NomeRegimeContratacao == "Estágio")
                {
                    var estagio = ctx.Estagio.Where(e => e.IdInscricao == item.IdInscricao).FirstOrDefault();

                    _estagioRepository.Delete(estagio);
                }

                _inscricaoRepository.Delete(item);
            }

            Delete(user);
            
            Acesso acesso = _acessoRepository.GetById(user.IdAcesso);

            _acessoRepository.Delete(acesso);

            Endereco endereco = _enderecoRepository.GetById(user.IdEndereco);

            _enderecoRepository.Delete(endereco);

            AreaAtuacao areaAtuacao = _areaAtuacaoRepository.GetById(user.IdAreaAtuacao);

            _areaAtuacaoRepository.Delete(areaAtuacao);

            PreferenciasTrabalho preferenciasTrabalho = _prefTrabalhoRepository.GetById(user.IdPreferenciasTrabalho);

            _prefTrabalhoRepository.Delete(preferenciasTrabalho);

            RegimeContratacao regimeContratacao = _regContratacaoRepository.GetById(user.IdPreferenciasTrabalhoNavigation.IdRegimeContratacao);

            _regContratacaoRepository.Delete(regimeContratacao);

        }
        public IEnumerable<VagaMatchViewModel> VagaSugest(int id)
        {
            List<Tecnologia> tecnologias = ctx.Tecnologia.ToList();

            var user = ctx.Usuario
                .Include(u => u.IdPreferenciasTrabalhoNavigation)
                .Include(u => u.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation)
                .Include(u => u.IdEnderecoNavigation)
                .Include(u => u.IdAreaAtuacaoNavigation)
                .FirstOrDefault(u => u.IdUsuario == id);

            List<Vaga> vagas = ctx.Vaga
                .Include(v => v.IdAreaAtuacaoNavigation)
                .Include(v => v.IdRegimeContratacaoNavigation)
                .Include(v => v.IdRemotoNavigation)
                .Include(v => v.IdEmpresaNavigation)
                .Include(v => v.Beneficios)
                .Include(v => v.Tecnologia)
                .ToList();

            List<VagaMatchViewModel> vagasMatch = new List<VagaMatchViewModel>();

            var pontucao = 0;

            foreach (var item in vagas)
            {

                if (user.IdEnderecoNavigation.Localidade.ToLower() == item.Localidade.ToLower())
                    pontucao++;

                if (user.IdAreaAtuacaoNavigation.NomeAreaAtuacao.ToLower() == item.IdAreaAtuacaoNavigation.NomeAreaAtuacao.ToLower())
                    pontucao++;

                if (user.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation.ExpectativaSalario.Length >= item.IdRegimeContratacaoNavigation.ExpectativaSalario.Length)
                    pontucao++;

                if (user.IdPreferenciasTrabalhoNavigation.IdRegimeContratacaoNavigation.NomeRegimeContratacao.ToLower() == item.IdRegimeContratacaoNavigation.NomeRegimeContratacao)
                    pontucao++;

                if (user.IdPreferenciasTrabalhoNavigation.IdRemoto == item.IdRemoto)
                    pontucao++;

                if (pontucao >= 3)
                {
                    List<Tecnologia> tecnologiasName = new List<Tecnologia>();

                    List<Tecnologia> listaTecnologia = new List<Tecnologia>();

                    List<string> beneficiosName = new List<string>();

                    foreach (var beneficios in item.Beneficios)
                    {
                        beneficiosName.Add(beneficios.NomeBeneficios);
                    }

                    VagaMatchViewModel vagaMatchViewModel = new VagaMatchViewModel
                    {
                        IdVaga = item.IdVaga,
                        Titulo = item.Titulo,
                        DescricaoAtividades = item.DescricaoAtividades,
                        DescricaoRequisitos = item.DescricaoRequisitos,
                        Localidade = item.Localidade,
                        Empresa = item.IdEmpresaNavigation.NomeFantasia,
                        Remoto = item.IdRemotoNavigation.NomeRemoto,
                        AreaAtuacaoVaga = item.IdAreaAtuacaoNavigation.NomeAreaAtuacao,
                        RegimeContratacao = item.IdRegimeContratacaoNavigation.NomeRegimeContratacao,
                        Salario = item.IdRegimeContratacaoNavigation.ExpectativaSalario,
                        Beneficios = beneficiosName
                    };

                    foreach (var tecnologia in tecnologias)
                    {
                        if (tecnologia.IdVaga == vagaMatchViewModel.IdVaga)
                        {
                            Tecnologia newTecnologia = new Tecnologia
                            {
                                NomeTecnologia = tecnologia.NomeTecnologia,
                                IdVaga = tecnologia.IdVaga
                            };

                            listaTecnologia.Add(newTecnologia);
                        }
                    }

                    vagaMatchViewModel.Tecnologia = listaTecnologia;


                    vagasMatch.Add(vagaMatchViewModel);
                }
            }

            return vagasMatch;
        }
        public bool RecuperarSenha(string email)
        {
            var acesso = ctx.Acesso.FirstOrDefault(u => u.Email == email);

            if (acesso != null)
            {
                try
                {
                    // Estancia da Classe de Mensagem
                    MailMessage _mailMessage = new MailMessage();
                    // Remetente
                    _mailMessage.From = new MailAddress("codehunter.ajpv@gmail.com");

                    // Destinatario seta no metodo abaixo

                    //Contrói o MailMessage
                    _mailMessage.CC.Add(email);
                    _mailMessage.Subject = "Recuperar Senha";
                    _mailMessage.IsBodyHtml = true;
                    //_mailMessage.Body = $"<b>Olá você pediu sua senha?</b><p>Sua senha: {acesso.Senha}</p>";
                    _mailMessage.Body = $"<div style='background-color: #1F1F20;  text-align: center; padding: 20px'><img width='180px' height='auto' src='https://i.ibb.co/FxNw8wb/logo-Sena-Redi.png' alt='img'><br><b style='color: white;'>Olá você pediu sua senha?</b><br><p style='color: white;'>Sua senha: <a style='color: #F5F749; font-weight: bold;'>{acesso.Senha}</a></p></div>";


                    //CONFIGURAÇÃO COM PORTA
                    SmtpClient _smtpClient = new SmtpClient("smtp.gmail.com", Convert.ToInt32("587"));

                    //CONFIGURAÇÃO SEM PORTA
                    //SmtpClient _smtpClient = new SmtpClient(UtilRsource.ConfigSmtp);

                    // Credencial para envio por SMTP Seguro (Quando o servidor exige autenticação)
                    _smtpClient.UseDefaultCredentials = false;
                    _smtpClient.Credentials = new NetworkCredential("codehunter.ajpv@gmail.com", "Codehunter123");

                    _smtpClient.EnableSsl = true;

                    _smtpClient.Send(_mailMessage);

                    return true;

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;
                }
            }
            else
            {
                return false;
            }

        }

        public Usuario myUserComplete(int id)
        {
            var user = ctx.Usuario
              .Include(u => u.IdPreferenciasTrabalhoNavigation)
              .Include(u => u.IdAcessoNavigation)
              .FirstOrDefault(u => u.IdUsuario == id);

            return user;
        }

        public bool EmailExist(string email)
        {
            var acesso = ctx.Acesso.FirstOrDefault(u => u.Email == email);


            if (acesso != null)
            {
                return true;
            }

            return false;
        }

        public IEnumerable<UsuarioViewModel> AllUsers()
        {
            var users = ctx.Usuario
             .Include(u => u.IdEnderecoNavigation)
             .Include(u => u.IdAcessoNavigation.IdTipoAcessoNavigation)
             .ToList();

            List<UsuarioViewModel> userFilter = new List<UsuarioViewModel>();

            foreach (var item in users)
            {
                UsuarioViewModel usuario = new UsuarioViewModel
                {
                    NomeCompleto = item.NomeCompleto,
                    Celular = item.Celular,
                    Curso = item.Curso,
                    Email = item.IdAcessoNavigation.Email,
                    Permissao = item.IdAcessoNavigation.IdTipoAcessoNavigation.TipoAcesso1,
                    Cidade = item.IdEnderecoNavigation.Localidade
                };

                userFilter.Add(usuario);
            }

            return userFilter;
        }

        public PerfilViewModel GetUserById(int id)
        {
            var user = ctx.Usuario.Where(u => u.IdUsuario == id).Include(u => u.IdAcessoNavigation).FirstOrDefault();

            PerfilViewModel perfilViewModel = new PerfilViewModel
            {
                NomeCompleto = user.NomeCompleto,
                Celular = user.Celular,
                Curso = user.Curso,
                Email = user.IdAcessoNavigation.Email,
                Foto = user.Foto
            };

            return perfilViewModel;
        }
    }
}
