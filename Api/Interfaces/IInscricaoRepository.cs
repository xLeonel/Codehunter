using Api.Domains;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IInscricaoRepository : IRepositoryBase<Inscricao>
    {
        IEnumerable<InscricaoViewModel> GetInscricaoByUser(int id);

        bool VerificarInscricao(int idUser, int idVaga);

        IEnumerable<InscricaoEmpresaViewModel> GetUsuariosPorInscricao(int id);
    }
}
