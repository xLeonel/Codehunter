using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class VagasRepository : RepositoryBase<Vaga>, IVagaRepository
    {
        CodehunterContext ctx = new CodehunterContext();
        private IAreaAtuacaoRepository _areaAtuacaoRepository { get; set; }
        private IBeneficioRepository _beneficioRepository { get; set; }
        private ITecnologiaRepository _tecnologiaRepository { get; set; }
        private RegimeContratacaoRepository _regContratacaoRepository { get; set; }
        private IInscricaoRepository _inscricaoRepository { get; set; }

        public VagasRepository()
        {
            _areaAtuacaoRepository = new AreasAtuacaoRepository();
            _beneficioRepository = new BeneficiosRepository();
            _tecnologiaRepository = new TecnologiasRepository();
            _regContratacaoRepository = new RegimeContratacaoRepository();
            _inscricaoRepository = new InscricoesRepository();
        }

        public void UpdateCascata(int id, Vaga vaga)
        {
            var vagaBanco = ctx.Vaga
                   .Include(v => v.IdRegimeContratacaoNavigation)
                   .FirstOrDefault(e => e.IdVaga == id);

            Vaga newVaga = new Vaga
            {
                IdVaga = id,
                Titulo = vaga.Titulo,
                DescricaoAtividades = vaga.DescricaoAtividades,
                DescricaoRequisitos = vaga.DescricaoRequisitos,
                Localidade = vaga.Localidade,
                DataPostada = vaga.DataPostada,
                DataValidadeVaga = vaga.DataValidadeVaga,
                IdEmpresa = vagaBanco.IdEmpresa,
                IdAreaAtuacao = vagaBanco.IdAreaAtuacao,
                IdRemoto = vaga.IdRemoto,
                IdRegimeContratacao = vagaBanco.IdRegimeContratacao,
                Beneficios = vaga.Beneficios,
                Tecnologia = vaga.Tecnologia
            };

            Update(newVaga);

            if (vaga.IdAreaAtuacaoNavigation != null)
            {
                AreaAtuacao areaAtuacao = new AreaAtuacao
                {
                    IdAreaAtuacao = vagaBanco.IdAreaAtuacao,
                    NomeAreaAtuacao = vaga.IdAreaAtuacaoNavigation.NomeAreaAtuacao
                };

                _areaAtuacaoRepository.Update(areaAtuacao);
            }

            if (vaga.IdRegimeContratacaoNavigation != null)
            {
                RegimeContratacao regimeContratacao = new RegimeContratacao
                {
                    IdRegimeContratacao = vagaBanco.IdRegimeContratacao,
                    NomeRegimeContratacao = vaga.IdRegimeContratacaoNavigation.NomeRegimeContratacao,
                    ExpectativaSalario = vaga.IdRegimeContratacaoNavigation.ExpectativaSalario
                };

                _regContratacaoRepository.Update(regimeContratacao);
            }


            var listaBeneficios = ctx.Beneficios.Where(x => x.IdVaga == id).ToList();
            var listaTecnologia = ctx.Tecnologia.Where(x => x.IdVaga == id).ToList();


            var numerosBeneficios = new int[listaBeneficios.Count];
            var numerosTecnologia = new int[listaTecnologia.Count];


            var num = 0;

            foreach (var item in listaBeneficios)
            {
                numerosBeneficios[num] = item.IdBeneficios;
                num++;
            }

            num = 0;

            foreach (var item in listaTecnologia)
            {
                numerosTecnologia[num] = item.IdTecnologia;
                num++;
            }

            num = 0;

            #region BENEFICIOS

            foreach (var item in vaga.Beneficios)
            {
                try
                {
                    int startIndex = numerosBeneficios.IndexOf(numerosBeneficios[num]);

                    Beneficios beneficios = new Beneficios
                    {
                        IdBeneficios = numerosBeneficios[num],
                        NomeBeneficios = item.NomeBeneficios,
                        IdVaga = id
                    };

                    _beneficioRepository.Update(beneficios);
                }
                catch (Exception)
                {
                    Beneficios beneficiosNova = new Beneficios
                    {
                        NomeBeneficios = item.NomeBeneficios,
                        IdVaga = id
                    };

                    _beneficioRepository.Add(beneficiosNova);
                }

                num++;
            }
            #endregion

            num = 0;

            #region TECNOLOGIA

            foreach (var item in vaga.Tecnologia)
            {
                try
                {
                    int startIndex = numerosTecnologia.IndexOf(numerosTecnologia[num]);

                    Tecnologia tecnologia = new Tecnologia
                    {
                        IdTecnologia = numerosTecnologia[num],
                        NomeTecnologia = item.NomeTecnologia,
                        IdVaga = id
                    };

                    _tecnologiaRepository.Update(tecnologia);
                }
                catch (Exception)
                {
                    Tecnologia tecnologiaNova = new Tecnologia
                    {
                        NomeTecnologia = item.NomeTecnologia,
                        IdVaga = id
                    };

                    _tecnologiaRepository.Add(tecnologiaNova);
                }

                num++;
            }
            #endregion

        }
        public void DeleteCascata(int id)
        {
            var listaBeneficios = ctx.Beneficios.Where(E => E.IdVaga == id).ToList();

            foreach (var item in listaBeneficios)
            {
                _beneficioRepository.Delete(item);
            }

            var listaTecnologia = ctx.Tecnologia.Where(E => E.IdVaga == id).ToList();

            foreach (var item in listaTecnologia)
            {
                _tecnologiaRepository.Delete(item);
            }

            var listaInscricao = ctx.Inscricao.Where(i => i.IdVaga == id).ToList();

            foreach (var item in listaInscricao)
            {
                _inscricaoRepository.Delete(item);
            }

            Vaga vaga = ctx.Vaga
                .FirstOrDefault(v => v.IdVaga == id);

            Delete(vaga);

            AreaAtuacao areaAtuacao = _areaAtuacaoRepository.GetById(vaga.IdAreaAtuacao);

            _areaAtuacaoRepository.Delete(areaAtuacao);

            RegimeContratacao regimeContratacao = _regContratacaoRepository.GetById(vaga.IdRegimeContratacao);

            _regContratacaoRepository.Delete(regimeContratacao);

        }

        public IEnumerable<VagaMatchViewModel> GetAllPropsVagas()
        {
            List<Tecnologia> tecnologias = ctx.Tecnologia.ToList();

            List<Vaga> vagas = ctx.Vaga
               .Include(v => v.IdAreaAtuacaoNavigation)
               .Include(v => v.IdRegimeContratacaoNavigation)
               .Include(v => v.IdRemotoNavigation)
               .Include(v => v.IdEmpresaNavigation)
               .Include(v => v.Beneficios)
               .Include(v => v.Tecnologia)
               .ToList();

            List<VagaMatchViewModel> vagasMatch = new List<VagaMatchViewModel>();

            List<Tecnologia> tecnologiasName = new List<Tecnologia>();

            List<Tecnologia> listaTecnologia = new List<Tecnologia>();

            List<string> beneficiosName = new List<string>();

            foreach (var item in vagas)
            {
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
                    if (tecnologia.IdVaga == item.IdVaga)
                    {
                        Tecnologia newTecnologia = new Tecnologia
                        {
                            IdTecnologia = tecnologia.IdTecnologia,
                            NomeTecnologia = tecnologia.NomeTecnologia,
                            IdVaga = tecnologia.IdVaga
                        };
                        listaTecnologia.Add(newTecnologia);
                    }
                };

                List<Tecnologia> tecnologiaVaga = new List<Tecnologia>();

                foreach (var tecnologia in listaTecnologia)
                {
                    if (tecnologia.IdVaga == vagaMatchViewModel.IdVaga)
                    {
                        tecnologiaVaga.Add(tecnologia);
                    }
                }
                vagaMatchViewModel.Tecnologia = tecnologiaVaga;
                vagasMatch.Add(vagaMatchViewModel);
            }

            return vagasMatch;

        }

        public IEnumerable<VagaMatchViewModel> GetPropsById(int id)
        {
            List<Tecnologia> tecnologias = ctx.Tecnologia.Where(t => t.IdVaga == id).ToList();

            List<Vaga> vagas = ctx.Vaga
               .Include(v => v.IdAreaAtuacaoNavigation)
               .Include(v => v.IdRegimeContratacaoNavigation)
               .Include(v => v.IdRemotoNavigation)
               .Include(v => v.IdEmpresaNavigation)
               .Include(v => v.Beneficios)
               .Include(v => v.Tecnologia)
               .Where(v => v.IdVaga == id)
               .ToList();

            List<VagaMatchViewModel> vagasMatch = new List<VagaMatchViewModel>();

            List<Tecnologia> tecnologiasName = new List<Tecnologia>();

            List<Tecnologia> listaTecnologia = new List<Tecnologia>();


            foreach (var item in vagas)
            {
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
                    if (tecnologia.IdVaga == item.IdVaga)
                    {
                        Tecnologia newTecnologia = new Tecnologia
                        {
                            IdTecnologia = tecnologia.IdTecnologia,
                            NomeTecnologia = tecnologia.NomeTecnologia,
                            IdVaga = tecnologia.IdVaga
                        };
                        listaTecnologia.Add(newTecnologia);
                    }
                };

                List<Tecnologia> tecnologiaVaga = new List<Tecnologia>();

                foreach (var tecnologia in listaTecnologia)
                {
                    if (tecnologia.IdVaga == vagaMatchViewModel.IdVaga)
                    {
                        tecnologiaVaga.Add(tecnologia);
                    }
                }
                vagaMatchViewModel.Tecnologia = tecnologiaVaga;
                vagasMatch.Add(vagaMatchViewModel);
            }

            return vagasMatch;
        }

        public IEnumerable<VagaMatchViewModelMobile> GetAllMobile()
        {
            List<Vaga> vagas = ctx.Vaga
                .Include(v => v.IdAreaAtuacaoNavigation)
                .Include(v => v.IdRegimeContratacaoNavigation)
                .Include(v => v.IdRemotoNavigation)
                .Include(v => v.IdEmpresaNavigation)
                .Include(v => v.Beneficios)
                .Include(v => v.Tecnologia)
                .ToList();

            List<VagaMatchViewModelMobile> listMobile = new List<VagaMatchViewModelMobile>();

            foreach (var item in vagas)
            {
                List<string> beneficios = new List<string>();

                foreach (var bene in item.Beneficios)
                {
                    beneficios.Add(bene.NomeBeneficios);

                }

                List<string> tecnologias = new List<string>();

                foreach (var tec in item.Tecnologia)
                {
                    tecnologias.Add(tec.NomeTecnologia);

                }
                VagaMatchViewModelMobile mobile = new VagaMatchViewModelMobile
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
                    Beneficios = beneficios,
                    Tecnologia = tecnologias
                };
                listMobile.Add(mobile);
            }

            return listMobile;
        }

        public IEnumerable<VagaMatchViewModelMobile> GetVagasPorEmpresa(int id)
        {
            List<Vaga> vagas = ctx.Vaga
                .Include(v => v.IdAreaAtuacaoNavigation)
                .Include(v => v.IdRegimeContratacaoNavigation)
                .Include(v => v.IdRemotoNavigation)
                .Include(v => v.IdEmpresaNavigation)
                .Include(v => v.Beneficios)
                .Include(v => v.Tecnologia)
                .Where(v => v.IdEmpresa == id)
                .ToList();

            List<VagaMatchViewModelMobile> listMobile = new List<VagaMatchViewModelMobile>();

            foreach (var item in vagas)
            {
                List<string> beneficios = new List<string>();

                foreach (var bene in item.Beneficios)
                {
                    beneficios.Add(bene.NomeBeneficios);

                }

                List<string> tecnologias = new List<string>();

                foreach (var tec in item.Tecnologia)
                {
                    tecnologias.Add(tec.NomeTecnologia);

                }
                VagaMatchViewModelMobile mobile = new VagaMatchViewModelMobile
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
                    Beneficios = beneficios,
                    Tecnologia = tecnologias
                };
                listMobile.Add(mobile);
            }

            return listMobile;
        }
    }
}
