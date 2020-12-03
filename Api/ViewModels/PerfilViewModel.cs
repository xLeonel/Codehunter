using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class PerfilViewModel
    {
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public string Celular { get; set; }
        public string Curso { get; set; }
        public byte[] Foto { get; set; }
    }
}
