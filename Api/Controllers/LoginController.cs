using System;
using Api.Domains;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Interfaces;
using Api.Repositories;
using Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        private IEmpresaRepository _empresaRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuariosRepository();
            _empresaRepository = new EmpresasRepository();
        }

        [HttpPost("{tipoLogin}")]
        public IActionResult Login(string tipoLogin, LoginViewModel user)
        {

            //var acesso = GetObject(tipoLogin);

            switch (tipoLogin)
            {
                case "Usuario":
                    bool existeEmail = _usuarioRepository.EmailExist(user.Email);

                    if (existeEmail)
                    {
                        Usuario acesso = _usuarioRepository.Login(user.Email, user.Senha);


                        if (acesso == null)
                        {
                            return NotFound("Email ou senha inválidos.");
                        }


                        var nomeCompleto = acesso.NomeCompleto.ToLower();
                        string[] nomeSeparado = nomeCompleto.Split(' ');
                        string primeiroNome = nomeSeparado[0];
                        string sobrenome = nomeSeparado[1];
                        primeiroNome = primeiroNome.Length > 1 ? char.ToUpper(primeiroNome[0]) + primeiroNome.Substring(1) : primeiroNome.ToUpper();
                        sobrenome = Convert.ToString(sobrenome[0]);
                        string nomeFormatado = $"{primeiroNome} {sobrenome.ToUpper()}.";

                        //payload
                        var claims = new[]
                        {
                        new Claim(JwtRegisteredClaimNames.Email, acesso.IdAcessoNavigation.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, acesso.IdUsuario.ToString()),
                        new Claim(ClaimTypes.Role, acesso.IdAcessoNavigation.IdTipoAcesso.ToString()), // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                        new Claim("Role", acesso.IdAcessoNavigation.IdTipoAcesso.ToString()),
                        new Claim("Name", nomeFormatado)

                    };

                        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("codehunter-key-auth"));

                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: "Codehunter.WebApi",                // emissor do token
                            audience: "Codehunter.WebApi",              // destinatário do token
                            claims: claims,                          // dados definidos acima
                            expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                            signingCredentials: creds                // credenciais do token
                        );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token)
                        });
                    }
                    else
                    {
                        return NotFound("Conta não existe");
                    }


                case "Empresa":
                    existeEmail = _usuarioRepository.EmailExist(user.Email);

                    if (existeEmail)
                    {
                        Empresa acessoEmpresa = _empresaRepository.Login(user.Email, user.Senha);


                        if (acessoEmpresa == null)
                        {
                            return NotFound("Email ou senha inválidos.");
                        }


                        var nomeCompleto = acessoEmpresa.NomeFantasia.ToLower();
                        string[] nomeSeparado = nomeCompleto.Split(' ');
                        var nomeFormatadoEmpresa = "";

                        if (nomeSeparado.Length > 1)
                        {
                            var primeiroNomeBase = nomeSeparado[0];
                            var sobrenomeEmpresa = nomeSeparado[1];
                            primeiroNomeBase = primeiroNomeBase.Length > 1 ? char.ToUpper(primeiroNomeBase[0]) + primeiroNomeBase.Substring(1) : primeiroNomeBase.ToUpper();
                            sobrenomeEmpresa = Convert.ToString(sobrenomeEmpresa[0]);
                            nomeFormatadoEmpresa = $"{primeiroNomeBase} {sobrenomeEmpresa.ToUpper()}.";
                        }
                        else
                        {
                            var primeiroNomeBase = nomeSeparado[0];
                            primeiroNomeBase = primeiroNomeBase.Length > 1 ? char.ToUpper(primeiroNomeBase[0]) + primeiroNomeBase.Substring(1) : primeiroNomeBase.ToUpper();
                            nomeFormatadoEmpresa = $"{primeiroNomeBase}";
                        }


                        //payload
                        var claims = new[]
                        {
                        new Claim(JwtRegisteredClaimNames.Email, acessoEmpresa.IdAcessoNavigation.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, acessoEmpresa.IdEmpresa.ToString()),
                        new Claim(ClaimTypes.Role, acessoEmpresa.IdAcessoNavigation.IdTipoAcesso.ToString()), // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                        new Claim("Role", acessoEmpresa.IdAcessoNavigation.IdTipoAcesso.ToString()),
                        new Claim("Name", nomeFormatadoEmpresa)

                        };

                        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("codehunter-key-auth"));

                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: "Codehunter.WebApi",                // emissor do token
                            audience: "Codehunter.WebApi",              // destinatário do token
                            claims: claims,                          // dados definidos acima
                            expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                            signingCredentials: creds                // credenciais do token
                        );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token)
                        });
                    }
                    else
                    {
                        return NotFound("Conta não existe");

                    }


                default: return BadRequest("Erro de login");
            }
        }
    }
}
