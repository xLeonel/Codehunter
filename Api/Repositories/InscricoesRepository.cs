using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class InscricoesRepository : RepositoryBase<Inscricao>, IInscricaoRepository
    {
        CodehunterContext ctx = new CodehunterContext();

        public IEnumerable<InscricaoViewModel> GetInscricaoByUser(int id)
        {
            List<InscricaoViewModel> inscricaoViewModels = new List<InscricaoViewModel>();

            var count = 1;

            foreach (var item in ctx.Inscricao
                .Include(i => i.IdStatusInscricaoNavigation)
                .Include(i => i.IdVagaNavigation.IdEmpresaNavigation)
                .Include(i => i.IdVagaNavigation)
                .Include(i => i.IdVagaNavigation.IdRemotoNavigation)
                .Include(i => i.IdVagaNavigation.IdRegimeContratacaoNavigation)
                .Include(i => i.IdVagaNavigation.IdAreaAtuacaoNavigation)
                .Include(i => i.IdVagaNavigation.Tecnologia)
                .Include(i => i.IdVagaNavigation.Beneficios)
                .Where(i => i.IdUsuario == id)
                .ToList()
                )
            {
                List<string> tecnologiasName = new List<string>();

                foreach (var tecnologia in item.IdVagaNavigation.Tecnologia)
                {
                    tecnologiasName.Add(tecnologia.NomeTecnologia);
                }

                List<string> beneficiosName = new List<string>();

                foreach (var beneficios in item.IdVagaNavigation.Beneficios)
                {
                    beneficiosName.Add(beneficios.NomeBeneficios);
                }

                InscricaoViewModel inscricaoViewModel = new InscricaoViewModel
                {
                    Id = count,
                    Titulo = item.IdVagaNavigation.Titulo,
                    DescricaoAtividades = item.IdVagaNavigation.DescricaoAtividades,
                    DescricaoRequisitos = item.IdVagaNavigation.DescricaoRequisitos,
                    Salario = item.IdVagaNavigation.IdRegimeContratacaoNavigation.ExpectativaSalario,
                    Localidade = item.IdVagaNavigation.Localidade,
                    VagaRemota = item.IdVagaNavigation.IdRemotoNavigation.NomeRemoto,
                    DataPostada = item.IdVagaNavigation.DataPostada,
                    DataValidadeVaga = item.IdVagaNavigation.DataValidadeVaga,
                    AreaAtuacao = item.IdVagaNavigation.IdAreaAtuacaoNavigation.NomeAreaAtuacao,
                    Empresa = item.IdVagaNavigation.IdEmpresaNavigation.NomeFantasia,
                    Situacao = item.IdStatusInscricaoNavigation.StatusInscricao1,
                    Tecnologia = tecnologiasName,
                    Beneficios = beneficiosName
                };

                inscricaoViewModels.Add(inscricaoViewModel);

                count++;
            }

            return inscricaoViewModels;
        }

        public IEnumerable<InscricaoEmpresaViewModel> GetUsuariosPorInscricao(int id)
        {
            var listaInscricoes = ctx.Inscricao
                .Include(i => i.IdUsuarioNavigation)
                .Include(i => i.IdUsuarioNavigation.IdAcessoNavigation)
                .Where(I => I.IdVaga == id)
                .ToList();

            List<InscricaoEmpresaViewModel> listViewModel = new List<InscricaoEmpresaViewModel>();

            var count = 1;

            foreach (var item in listaInscricoes)
            {
                InscricaoEmpresaViewModel inscricaoEmpresaViewModel = new InscricaoEmpresaViewModel
                {
                    IdKey = count,
                    Nome = item.IdUsuarioNavigation.NomeCompleto,
                    Email = item.IdUsuarioNavigation.IdAcessoNavigation.Email,
                    IdUser = item.IdUsuario
                };

                listViewModel.Add(inscricaoEmpresaViewModel);

                count++;

            }

            return listViewModel;

        }

        public bool VerificarInscricao(int idUser, int idVaga)
        {
            var listaInscricao = ctx.Inscricao.Where(i => i.IdVaga == idVaga).ToList();

            foreach (var item in listaInscricao)
            {
                if (item.IdUsuario == idUser)
                {
                    return true;
                }
            }

            return false;

        }
    }
}
