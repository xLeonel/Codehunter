using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Api.Domains;
using System.IO;

namespace Api.Contexts
{
    public partial class CodehunterContext : DbContext
    {
        public CodehunterContext()
        {
        }

        public CodehunterContext(DbContextOptions<CodehunterContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Acesso> Acesso { get; set; }
        public virtual DbSet<AreaAtuacao> AreaAtuacao { get; set; }
        public virtual DbSet<Beneficios> Beneficios { get; set; }
        public virtual DbSet<Contrato> Contrato { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Endereco> Endereco { get; set; }
        public virtual DbSet<Estagio> Estagio { get; set; }
        public virtual DbSet<Experiencias> Experiencias { get; set; }
        public virtual DbSet<Inscricao> Inscricao { get; set; }
        public virtual DbSet<PreferenciasTrabalho> PreferenciasTrabalho { get; set; }
        public virtual DbSet<RegimeContratacao> RegimeContratacao { get; set; }
        public virtual DbSet<Remoto> Remoto { get; set; }
        public virtual DbSet<StatusContrato> StatusContrato { get; set; }
        public virtual DbSet<StatusInscricao> StatusInscricao { get; set; }
        public virtual DbSet<Tecnologia> Tecnologia { get; set; }
        public virtual DbSet<TipoAcesso> TipoAcesso { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Vaga> Vaga { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                const string PATH = @"C:\ssh.txt";

                var stringConexao = File.ReadAllText(PATH);

                optionsBuilder.UseSqlServer(stringConexao);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Acesso>(entity =>
            {
                entity.HasKey(e => e.IdAcesso)
                    .HasName("PK__Acesso__CDF01DA1F45A6D22");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Acesso__A9D105348B74A1D7")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoAcessoNavigation)
                    .WithMany(p => p.Acesso)
                    .HasForeignKey(d => d.IdTipoAcesso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Acesso__IdTipoAc__3A81B327");
            });

            modelBuilder.Entity<AreaAtuacao>(entity =>
            {
                entity.HasKey(e => e.IdAreaAtuacao)
                    .HasName("PK__AreaAtua__D7DEAA2FC1C8011A");

                entity.Property(e => e.NomeAreaAtuacao)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Beneficios>(entity =>
            {
                entity.HasKey(e => e.IdBeneficios)
                    .HasName("PK__Benefici__4EC0569A322D1C01");

                entity.Property(e => e.NomeBeneficios)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Beneficios)
                    .HasForeignKey(d => d.IdVaga)
                    .HasConstraintName("FK__Beneficio__IdVag__5DCAEF64");
            });

            modelBuilder.Entity<Contrato>(entity =>
            {
                entity.HasKey(e => e.IdContrato)
                    .HasName("PK__Contrato__8569F05A55FAF696");

                entity.Property(e => e.Efetivado).HasColumnType("date");

                entity.Property(e => e.Inicio).HasColumnType("date");

                entity.Property(e => e.Previsto).HasColumnType("date");

                entity.HasOne(d => d.IdStatusContratoNavigation)
                    .WithMany(p => p.Contrato)
                    .HasForeignKey(d => d.IdStatusContrato)
                    .HasConstraintName("FK__Contrato__IdStat__6E01572D");
            });

            modelBuilder.Entity<Empresa>(entity =>
            {
                entity.HasKey(e => e.IdEmpresa)
                    .HasName("PK__Empresa__5EF4033ED15F6AAB");

                entity.HasIndex(e => e.Cnpj)
                    .HasName("UQ__Empresa__A299CC921E2F5F37")
                    .IsUnique();

                entity.Property(e => e.Celular)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasMaxLength(18)
                    .IsUnicode(false);

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.NomeFantasia)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NomeRepresentante)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RazaoSocial)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAcessoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdAcesso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Empresa__IdAcess__534D60F1");

                entity.HasOne(d => d.IdAreaAtuacaoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdAreaAtuacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Empresa__IdAreaA__5535A963");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdEndereco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Empresa__IdEnder__5441852A");
            });

            modelBuilder.Entity<Endereco>(entity =>
            {
                entity.HasKey(e => e.IdEndereco)
                    .HasName("PK__Endereco__0B7C7F172FC8314A");

                entity.Property(e => e.Bairro)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Cep)
                    .IsRequired()
                    .HasMaxLength(9)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Complemento)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Localidade)
                    .IsRequired()
                    .HasColumnName("localidade")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Logradouro)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Uf)
                    .IsRequired()
                    .HasColumnName("uf")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Estagio>(entity =>
            {
                entity.HasKey(e => e.IdEstagio)
                    .HasName("PK__Estagio__C70AD76CA769E77D");

                entity.Property(e => e.ContratoPdf)
                    .HasColumnName("ContratoPDF")
                    .HasColumnType("image");

                entity.HasOne(d => d.IdContratoNavigation)
                    .WithMany(p => p.Estagio)
                    .HasForeignKey(d => d.IdContrato)
                    .HasConstraintName("FK__Estagio__IdContr__71D1E811");

                entity.HasOne(d => d.IdInscricaoNavigation)
                    .WithMany(p => p.Estagio)
                    .HasForeignKey(d => d.IdInscricao)
                    .HasConstraintName("FK__Estagio__IdInscr__70DDC3D8");
            });

            modelBuilder.Entity<Experiencias>(entity =>
            {
                entity.HasKey(e => e.IdExperiencias)
                    .HasName("PK__Experien__AA4913C0C4E0B4C0");

                entity.Property(e => e.Cargo)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DateFim).HasColumnType("datetime");

                entity.Property(e => e.DateInicio).HasColumnType("datetime");

                entity.Property(e => e.NomeEmpresa)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Experiencias)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Experienc__IdUsu__4F7CD00D");
            });

            modelBuilder.Entity<Inscricao>(entity =>
            {
                entity.HasKey(e => e.IdInscricao)
                    .HasName("PK__Inscrica__6209444B1068D80D");

                entity.HasOne(d => d.IdStatusInscricaoNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdStatusInscricao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdSta__68487DD7");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdUsu__66603565");

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdVaga)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdVag__6754599E");
            });

            modelBuilder.Entity<PreferenciasTrabalho>(entity =>
            {
                entity.HasKey(e => e.IdPreferenciasTrabalho)
                    .HasName("PK__Preferen__C01397CBF065A1C4");

                entity.Property(e => e.Github)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Linkedin)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NivelIngles)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SitePessoal)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SituacaoProfissional)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.StackOverflow)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdRegimeContratacaoNavigation)
                    .WithMany(p => p.PreferenciasTrabalho)
                    .HasForeignKey(d => d.IdRegimeContratacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Preferenc__IdReg__45F365D3");

                entity.HasOne(d => d.IdRemotoNavigation)
                    .WithMany(p => p.PreferenciasTrabalho)
                    .HasForeignKey(d => d.IdRemoto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Preferenc__IdRem__44FF419A");
            });

            modelBuilder.Entity<RegimeContratacao>(entity =>
            {
                entity.HasKey(e => e.IdRegimeContratacao)
                    .HasName("PK__RegimeCo__114A1D9225632C52");

                entity.Property(e => e.ExpectativaSalario)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NomeRegimeContratacao)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Remoto>(entity =>
            {
                entity.HasKey(e => e.IdRemoto)
                    .HasName("PK__Remoto__EC95280A3DBB5199");

                entity.Property(e => e.NomeRemoto)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StatusContrato>(entity =>
            {
                entity.HasKey(e => e.IdStatusContrato)
                    .HasName("PK__StatusCo__60463F1F46F72E38");

                entity.HasIndex(e => e.StatusContrato1)
                    .HasName("UQ__StatusCo__81309FC08E57DE14")
                    .IsUnique();

                entity.Property(e => e.StatusContrato1)
                    .IsRequired()
                    .HasColumnName("StatusContrato")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StatusInscricao>(entity =>
            {
                entity.HasKey(e => e.IdStatusInscricao)
                    .HasName("PK__StatusIn__4F419FD7489C66FA");

                entity.HasIndex(e => e.StatusInscricao1)
                    .HasName("UQ__StatusIn__F7B3C367262FDDB3")
                    .IsUnique();

                entity.Property(e => e.StatusInscricao1)
                    .IsRequired()
                    .HasColumnName("StatusInscricao")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Tecnologia>(entity =>
            {
                entity.HasKey(e => e.IdTecnologia)
                    .HasName("PK__Tecnolog__5ECD2D11D155729D");

                entity.Property(e => e.NomeTecnologia)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Tecnologia)
                    .HasForeignKey(d => d.IdVaga)
                    .HasConstraintName("FK__Tecnologi__IdVag__60A75C0F");
            });

            modelBuilder.Entity<TipoAcesso>(entity =>
            {
                entity.HasKey(e => e.IdAcesso)
                    .HasName("PK__TipoAces__CDF01DA16FA2F4E9");

                entity.HasIndex(e => e.TipoAcesso1)
                    .HasName("UQ__TipoAces__102AD6C4AB8E4CEA")
                    .IsUnique();

                entity.Property(e => e.TipoAcesso1)
                    .IsRequired()
                    .HasColumnName("TipoAcesso")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__5B65BF975BC422BD");

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Usuario__C1F89731BFFD23E5")
                    .IsUnique();

                entity.Property(e => e.Celular)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Curriculo).HasColumnType("image");

                entity.Property(e => e.Curso)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.Foto).HasColumnType("image");

                entity.Property(e => e.NomeCompleto)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomePersonalidade)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAcessoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdAcesso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdAcess__49C3F6B7");

                entity.HasOne(d => d.IdAreaAtuacaoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdAreaAtuacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdAreaA__4BAC3F29");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdEndereco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdEnder__4AB81AF0");

                entity.HasOne(d => d.IdPreferenciasTrabalhoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdPreferenciasTrabalho)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdPrefe__4CA06362");
            });

            modelBuilder.Entity<Vaga>(entity =>
            {
                entity.HasKey(e => e.IdVaga)
                    .HasName("PK__Vaga__A848DC3EB8BD3B38");

                entity.Property(e => e.DataPostada).HasColumnType("date");

                entity.Property(e => e.DataValidadeVaga).HasColumnType("date");

                entity.Property(e => e.DescricaoAtividades)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.DescricaoRequisitos)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Localidade)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdAreaAtuacaoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdAreaAtuacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdAreaAtua__59063A47");

                entity.HasOne(d => d.IdEmpresaNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdEmpresa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdEmpresa__5812160E");

                entity.HasOne(d => d.IdRegimeContratacaoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdRegimeContratacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdRegimeCo__5AEE82B9");

                entity.HasOne(d => d.IdRemotoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdRemoto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdRemoto__59FA5E80");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
