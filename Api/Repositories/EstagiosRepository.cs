using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using Api.ViewModels;
using LumenWorks.Framework.IO.Csv;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class EstagiosRepository : RepositoryBase<Estagio>, IEstagioRepository
    {
        CodehunterContext ctx = new CodehunterContext();
        public void ExportCSV()
        {
            var listaEstagios = ctx.Estagio
                .Include(e => e.IdInscricaoNavigation.IdUsuarioNavigation)
                .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation)
                .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdEnderecoNavigation)
                .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdAcessoNavigation)
                .Include(e => e.IdContratoNavigation)
                .Include(e => e.IdContratoNavigation.IdStatusContratoNavigation)
                .ToList();

            const string PATH = @"Csv\estagios.csv";

            DataTable tabela = new DataTable();

            //HEADER  
            tabela.Columns.Add("Nome do Aluno", typeof(string));
            tabela.Columns.Add("Curso", typeof(string));
            tabela.Columns.Add("Empresa", typeof(string));
            tabela.Columns.Add("Pessoa Responsável pelo Estagio", typeof(string));
            tabela.Columns.Add("Endereço", typeof(string));
            tabela.Columns.Add("Email", typeof(string));
            tabela.Columns.Add("Telefone", typeof(string));
            tabela.Columns.Add("InicioContrato", typeof(string));
            tabela.Columns.Add("TerminoPrevisto", typeof(string));
            tabela.Columns.Add("Efetivo", typeof(string));
            tabela.Columns.Add("Status", typeof(string));
            tabela.Columns.Add("Primeira Visita", typeof(string));
            tabela.Columns.Add("Segunda Visita", typeof(string));
            tabela.Columns.Add("Terceira Visita", typeof(string));


            //LINE  
            foreach (var item in listaEstagios)
            {
                DateTime dtInicio = (DateTime)item.IdContratoNavigation.Inicio;
                DateTime dtPrevisto = (DateTime)item.IdContratoNavigation.Previsto;
                DateTime dtEfetivado = (DateTime)item.IdContratoNavigation.Efetivado;

                tabela.Rows.Add(item.IdInscricaoNavigation.IdUsuarioNavigation.NomeCompleto,
                item.IdInscricaoNavigation.IdUsuarioNavigation.Curso,
                item.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.NomeFantasia,
                item.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.NomeRepresentante,
                item.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdEnderecoNavigation.Logradouro,
                item.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdAcessoNavigation.Email,
                item.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.Celular,
                dtInicio.ToShortDateString(),
                dtPrevisto.ToShortDateString(),
                dtEfetivado.ToShortDateString(),
                item.IdContratoNavigation.IdStatusContratoNavigation.StatusContrato1,
                 dtInicio.AddMonths(6).ToShortDateString(),
                "Segunda visita",
                "Terceira Visita"
                );

            }

            InserirCsv(tabela, PATH);
        }

        public static void InserirCsv(DataTable dtDataTable, string strFilePath)
        {
            StreamWriter sw = new StreamWriter(strFilePath, false);
            //headers  
            for (int i = 0; i < dtDataTable.Columns.Count; i++)
            {
                sw.Write(dtDataTable.Columns[i]);
                if (i < dtDataTable.Columns.Count - 1)
                {
                    sw.Write(",");
                }
            }
            sw.Write(sw.NewLine);

            foreach (DataRow dr in dtDataTable.Rows)
            {
                for (int i = 0; i < dtDataTable.Columns.Count; i++)
                {
                    if (!Convert.IsDBNull(dr[i]))
                    {
                        string value = dr[i].ToString();
                        if (value.Contains(','))
                        {
                            value = String.Format("\"{0}\"", value);
                            sw.Write(value);
                        }
                        else
                        {
                            sw.Write(dr[i].ToString());
                        }
                    }
                    if (i < dtDataTable.Columns.Count - 1)
                    {
                        sw.Write(",");
                    }
                }
                sw.Write(sw.NewLine);
            }
            sw.Close();
        }

        public bool UpdateCascade(int id, Estagio internship)
        {
            using (var ctx = new CodehunterContext())
            {
                var entityInternship = ctx.Estagio
                    .Include(e => e.IdContratoNavigation)
                    .Include(e => e.IdInscricaoNavigation)
                    .FirstOrDefault(e => e.IdEstagio == id);

                if (entityInternship != null)
                {
                    entityInternship.IdContratoNavigation.Inicio = internship.IdContratoNavigation.Inicio;
                    entityInternship.IdContratoNavigation.Previsto = internship.IdContratoNavigation.Previsto;
                    entityInternship.IdContratoNavigation.Efetivado = internship.IdContratoNavigation.Efetivado;
                    entityInternship.IdContratoNavigation.IdStatusContrato = internship.IdContratoNavigation.IdStatusContrato;
                    entityInternship.ContratoPdf = internship.ContratoPdf;

                    ctx.Update(entityInternship);
                    ctx.SaveChanges();


                    return true;
                }

                return false;
            }
        }

        public Estagio GetInternshipContracts(int id)
        {
            Estagio entityInternship = ctx.Estagio
              .Include(e => e.IdInscricaoNavigation)
              .Include(e => e.IdContratoNavigation)
              .Include(e => e.IdContratoNavigation.IdStatusContratoNavigation)
              .FirstOrDefault(e => e.IdEstagio == id);

            return entityInternship;
        }

        public IEnumerable<Estagio> AllEstagios()
        {
            return ctx.Estagio
                 .Include(e => e.IdInscricaoNavigation.IdUsuarioNavigation)
                 .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation)
                 .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdEnderecoNavigation)
                 .Include(e => e.IdInscricaoNavigation.IdVagaNavigation.IdEmpresaNavigation.IdAcessoNavigation)
                 .Include(e => e.IdContratoNavigation)
                 .Include(e => e.IdContratoNavigation.IdStatusContratoNavigation)
                 .ToList();
        }
    }
}
