using Api.Domains;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IVagaRepository : IRepositoryBase<Vaga>
    {
        IEnumerable<VagaMatchViewModel> GetAllPropsVagas();
        IEnumerable<VagaMatchViewModelMobile> GetAllMobile();
        IEnumerable<VagaMatchViewModelMobile> GetVagasPorEmpresa(int id);
        IEnumerable<VagaMatchViewModel> GetPropsById(int id);
        void UpdateCascata(int id, Vaga vaga);
        void DeleteCascata(int id);
    }
}
