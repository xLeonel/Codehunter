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
                    .HasName("PK__Acesso__CDF01DA1FF3A146F");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Acesso__A9D105344C74FFF2")
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
                    .HasConstraintName("FK__Acesso__IdTipoAc__286302EC");
            });

            modelBuilder.Entity<AreaAtuacao>(entity =>
            {
                entity.HasKey(e => e.IdAreaAtuacao)
                    .HasName("PK__AreaAtua__D7DEAA2F80B228AF");

                entity.Property(e => e.NomeAreaAtuacao)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Beneficios>(entity =>
            {
                entity.HasKey(e => e.IdBeneficios)
                    .HasName("PK__Benefici__4EC0569A2C3A0D50");

                entity.Property(e => e.NomeBeneficios)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Beneficios)
                    .HasForeignKey(d => d.IdVaga)
                    .HasConstraintName("FK__Beneficio__IdVag__4BAC3F29");
            });

            modelBuilder.Entity<Contrato>(entity =>
            {
                entity.HasKey(e => e.IdContrato)
                    .HasName("PK__Contrato__8569F05A155AFCCC");

                entity.Property(e => e.Efetivado).HasColumnType("date");

                entity.Property(e => e.Inicio).HasColumnType("date");

                entity.Property(e => e.Previsto).HasColumnType("date");

                entity.HasOne(d => d.IdStatusContratoNavigation)
                    .WithMany(p => p.Contrato)
                    .HasForeignKey(d => d.IdStatusContrato)
                    .HasConstraintName("FK__Contrato__IdStat__5BE2A6F2");
            });

            modelBuilder.Entity<Empresa>(entity =>
            {
                entity.HasKey(e => e.IdEmpresa)
                    .HasName("PK__Empresa__5EF4033E736C663B");

                entity.HasIndex(e => e.Cnpj)
                    .HasName("UQ__Empresa__A299CC920ECAA56B")
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

                entity.Property(e => e.Foto).HasColumnType("image");

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
                    .HasConstraintName("FK__Empresa__IdAcess__412EB0B6");

                entity.HasOne(d => d.IdAreaAtuacaoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdAreaAtuacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Empresa__IdAreaA__4316F928");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdEndereco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Empresa__IdEnder__4222D4EF");
            });

            modelBuilder.Entity<Endereco>(entity =>
            {
                entity.HasKey(e => e.IdEndereco)
                    .HasName("PK__Endereco__0B7C7F17A5B5C552");

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
                    .HasName("PK__Estagio__C70AD76CF5F30F25");

                entity.Property(e => e.ContratoPdf)
                    .HasColumnName("ContratoPDF")
                    .HasColumnType("image");

                entity.HasOne(d => d.IdContratoNavigation)
                    .WithMany(p => p.Estagio)
                    .HasForeignKey(d => d.IdContrato)
                    .HasConstraintName("FK__Estagio__IdContr__5FB337D6");

                entity.HasOne(d => d.IdInscricaoNavigation)
                    .WithMany(p => p.Estagio)
                    .HasForeignKey(d => d.IdInscricao)
                    .HasConstraintName("FK__Estagio__IdInscr__5EBF139D");
            });

            modelBuilder.Entity<Experiencias>(entity =>
            {
                entity.HasKey(e => e.IdExperiencias)
                    .HasName("PK__Experien__AA4913C08929EA19");

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
                    .HasConstraintName("FK__Experienc__IdUsu__3D5E1FD2");
            });

            modelBuilder.Entity<Inscricao>(entity =>
            {
                entity.HasKey(e => e.IdInscricao)
                    .HasName("PK__Inscrica__6209444B7380B47B");

                entity.HasOne(d => d.IdStatusInscricaoNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdStatusInscricao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdSta__5629CD9C");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdUsu__5441852A");

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdVaga)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Inscricao__IdVag__5535A963");
            });

            modelBuilder.Entity<PreferenciasTrabalho>(entity =>
            {
                entity.HasKey(e => e.IdPreferenciasTrabalho)
                    .HasName("PK__Preferen__C01397CBC2796AFB");

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
                    .HasConstraintName("FK__Preferenc__IdReg__33D4B598");

                entity.HasOne(d => d.IdRemotoNavigation)
                    .WithMany(p => p.PreferenciasTrabalho)
                    .HasForeignKey(d => d.IdRemoto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Preferenc__IdRem__32E0915F");
            });

            modelBuilder.Entity<RegimeContratacao>(entity =>
            {
                entity.HasKey(e => e.IdRegimeContratacao)
                    .HasName("PK__RegimeCo__114A1D9283B8D0CE");

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
                    .HasName("PK__Remoto__EC95280A9FF6EFA1");

                entity.Property(e => e.NomeRemoto)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StatusContrato>(entity =>
            {
                entity.HasKey(e => e.IdStatusContrato)
                    .HasName("PK__StatusCo__60463F1FC406F48C");

                entity.HasIndex(e => e.StatusContrato1)
                    .HasName("UQ__StatusCo__81309FC07981BC5C")
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
                    .HasName("PK__StatusIn__4F419FD7CDCB61A6");

                entity.HasIndex(e => e.StatusInscricao1)
                    .HasName("UQ__StatusIn__F7B3C367DA1EA7A6")
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
                    .HasName("PK__Tecnolog__5ECD2D1184F4DDFF");

                entity.Property(e => e.NomeTecnologia)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Tecnologia)
                    .HasForeignKey(d => d.IdVaga)
                    .HasConstraintName("FK__Tecnologi__IdVag__4E88ABD4");
            });

            modelBuilder.Entity<TipoAcesso>(entity =>
            {
                entity.HasKey(e => e.IdAcesso)
                    .HasName("PK__TipoAces__CDF01DA1D6F02F6B");

                entity.HasIndex(e => e.TipoAcesso1)
                    .HasName("UQ__TipoAces__102AD6C4E2130AFC")
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
                    .HasName("PK__Usuario__5B65BF979CD077A5");

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Usuario__C1F89731C2C2D8D0")
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
                    .HasConstraintName("FK__Usuario__IdAcess__37A5467C");

                entity.HasOne(d => d.IdAreaAtuacaoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdAreaAtuacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdAreaA__398D8EEE");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdEndereco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdEnder__38996AB5");

                entity.HasOne(d => d.IdPreferenciasTrabalhoNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdPreferenciasTrabalho)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__IdPrefe__3A81B327");
            });

            modelBuilder.Entity<Vaga>(entity =>
            {
                entity.HasKey(e => e.IdVaga)
                    .HasName("PK__Vaga__A848DC3E19E8D9ED");

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
                    .HasConstraintName("FK__Vaga__IdAreaAtua__46E78A0C");

                entity.HasOne(d => d.IdEmpresaNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdEmpresa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdEmpresa__45F365D3");

                entity.HasOne(d => d.IdRegimeContratacaoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdRegimeContratacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdRegimeCo__48CFD27E");

                entity.HasOne(d => d.IdRemotoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdRemoto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Vaga__IdRemoto__47DBAE45");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
