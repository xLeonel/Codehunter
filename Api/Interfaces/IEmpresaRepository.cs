using Api.Domains;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IEmpresaRepository : IRepositoryBase<Empresa>
    {
        Empresa Login(string email, string senha);
        bool VerifyEmail(string email, out string emailBanco);
        void UpdateCascata(int id, Empresa empresa);
        void DeleteCascata(int id);
        IEnumerable<FilialViewModel> GetFilial(string cnpj, int id);
        IEnumerable<Empresa> AllEmpresas();
        IEnumerable<Vaga> GetVagasPorEmpresa(int id);
        Empresa EmpresaComplete(int id);

    }
}
