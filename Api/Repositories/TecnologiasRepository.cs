using Api.Contexts;
using Api.Domains;
using Api.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class TecnologiasRepository : RepositoryBase<Tecnologia>, ITecnologiaRepository
    {
        CodehunterContext ctx = new CodehunterContext();
        public IEnumerable<Tecnologia> GetAllByVaga(int id)
        {
            return ctx.Tecnologia.Where(t => t.IdVaga == id).ToList();
        }
    }
}
