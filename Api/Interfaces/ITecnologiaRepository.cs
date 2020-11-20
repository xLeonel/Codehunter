using Api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    interface ITecnologiaRepository : IRepositoryBase<Tecnologia>
    {
        IEnumerable<Tecnologia> GetAllByVaga(int id);
    }
}
