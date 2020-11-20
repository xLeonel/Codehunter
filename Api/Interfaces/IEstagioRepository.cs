using Api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IEstagioRepository : IRepositoryBase<Estagio>
    {
        void ExportCSV();
        bool UpdateCascade(int id, Estagio internship);

        IEnumerable<Estagio> AllEstagios();

    }
}
