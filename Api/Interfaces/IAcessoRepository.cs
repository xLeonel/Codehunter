using Api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IAcessoRepository : IRepositoryBase<Acesso>
    {
        //Acesso Login(string email, string senha);
    }
}
