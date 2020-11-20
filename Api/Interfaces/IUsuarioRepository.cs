using Api.Domains;
using Api.Repositories;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IUsuarioRepository : IRepositoryBase<Usuario>
    {
        bool IsAluno(string email, out string curso);
        Usuario Login(string email, string senha);
        Usuario myUserComplete(int id);
        void UpdateCascata(int id, Usuario usuario);
        void DeleteCascata(int id);
        IEnumerable<VagaMatchViewModel> VagaSugest(int id);
        IEnumerable<UsuarioViewModel> AllUsers();
        bool RecuperarSenha(string email);
        bool EmailExist(string email);
    }
}
