create database Codehunter;
go

use Codehunter;
go

create table TipoAcesso(
	IdAcesso int primary key identity,
	TipoAcesso varchar(250) Not null Unique

);
go


create table Acesso(
	IdAcesso int primary key identity,
	Email varchar(250) Not null Unique,
	Senha varchar(250) Not null,
	IdTipoAcesso int foreign key references TipoAcesso (IdAcesso) Not null

);
go

create table Endereco(
	IdEndereco int primary key identity,
	Cep char(9) Not null,
	Logradouro varchar(250) Not null,
	Complemento varchar(250),
	Bairro varchar(250) Not null,
	localidade varchar(250) Not null,
	uf varchar(250) Not null

);																								

create table AreaAtuacao(
	IdAreaAtuacao int primary key identity,
	NomeAreaAtuacao varchar(250) Not null

);
go

create table Remoto(
	IdRemoto int primary key identity,
	NomeRemoto varchar(250) not null
);
go

create table RegimeContratacao(
	IdRegimeContratacao int primary key identity,
	NomeRegimeContratacao varchar(250) not null,
	ExpectativaSalario varchar(250) not null
);
go


create table PreferenciasTrabalho(
	IdPreferenciasTrabalho int primary key identity,
	Linkedin varchar (200),
	Github varchar(200),
	StackOverflow varchar(200),
	SitePessoal varchar(200),
	NivelIngles varchar(100),
	SituacaoProfissional varchar(200),
	IdRemoto int foreign key references Remoto (IdRemoto) not null,
	IdRegimeContratacao int foreign key references RegimeContratacao (IdRegimeContratacao) not null

);
go

create table Usuario(
	IdUsuario int primary key identity,
	NomeCompleto varchar(255),
	Celular char(15) not null,
	CPF CHAR(14) not null unique,
	NomePersonalidade VARCHAR(50),
	Curso varchar(250) not null,
	Curriculo image,
	Foto image,
	Descricao varchar(2000) Not null,
	TemExperiencias bit not null,
	IdAcesso int foreign key references Acesso (IdAcesso) Not null,
	IdEndereco int foreign key references Endereco (IdEndereco) Not null,
	IdAreaAtuacao int foreign key references AreaAtuacao (IdAreaAtuacao) Not null,
	IdPreferenciasTrabalho INT FOREIGN KEY references PreferenciasTrabalho (IdPreferenciasTrabalho) not null
);
go

create table Experiencias(
	IdExperiencias int primary key identity,
	NomeEmpresa varchar(200),
	Cargo varchar(200),
	DateInicio Datetime,
	DateFim Datetime,
	IdUsuario int foreign key references Usuario (IdUsuario)
);
go


create table Empresa(
	IdEmpresa int primary key identity,
	NomeFantasia varchar(250) not null,
	RazaoSocial varchar(250) Not null,
	NumColaboradores int Not null,
	Cnpj varchar(18) not null unique,
	NomeRepresentante varchar(255) not null,
	Foto image,
	Celular char(15) not null,
	Descricao varchar(2000) Not null,
	IdAcesso int foreign key references Acesso (IdAcesso) Not null,
	IdEndereco int foreign key references Endereco (IdEndereco) Not null,
	IdAreaAtuacao int foreign key references AreaAtuacao (IdAreaAtuacao) Not null

);
go



create table Vaga(
	IdVaga int primary key identity,
	Titulo varchar(250) Not null ,
	DescricaoAtividades varchar(250) not null,
	DescricaoRequisitos varchar(250) not null,
	Localidade varchar(250) not null,
	DataPostada Date not null,
	DataValidadeVaga Date not null,	
	IdEmpresa int foreign key references Empresa (IdEmpresa) Not null,
	IdAreaAtuacao int foreign key references AreaAtuacao (IdAreaAtuacao) Not null,
	IdRemoto int foreign key references Remoto (IdRemoto) not null,
	IdRegimeContratacao int foreign key references RegimeContratacao (IdRegimeContratacao) not null
);
go

create table Beneficios(
	IdBeneficios int primary key identity,
	NomeBeneficios varchar(250) not null,
	IdVaga int foreign key references Vaga (IdVaga)

);
go

create table Tecnologia(
	IdTecnologia int primary key identity,
	NomeTecnologia varchar(250) not null,
	IdVaga int foreign key references Vaga (IdVaga)

);
go

create table StatusInscricao(
	IdStatusInscricao int primary key identity,
	StatusInscricao varchar(250) Not null Unique

);
go


create table Inscricao(
	IdInscricao int primary key identity,
	IdUsuario int foreign key references Usuario (IdUsuario) Not null,
	IdVaga int foreign key references Vaga (IdVaga) Not null,
	IdStatusInscricao int foreign key references StatusInscricao (IdStatusInscricao) Not null,

);
go

create table StatusContrato(
	IdStatusContrato int primary key identity,
	StatusContrato varchar(250) Not null Unique

);
go

create table Contrato(
	IdContrato int primary key identity,
	Inicio Date,
	Previsto Date,
	Efetivado Date,
	IdStatusContrato int foreign key references StatusContrato (IdStatusContrato)

);
go

create table Estagio(
	IdEstagio int primary key identity,
	ContratoPDF image,
	IdInscricao int foreign key references Inscricao (IdInscricao),
	IdContrato int foreign key references Contrato (IdContrato)

);


INSERT INTO TipoAcesso
VALUES ('Aluno'),('Administrador'),('Empresa');

go

--INSERT INTO Personalidade 
--VALUES ('Domaniante '),('Influente'),('Estavel'),('Conforme');

--go

--INSERT INTO Tecnologia 
--VALUES ('JavaScript'),('Python'),('Java'),('PHP'),('C#'),('C++'),('Ruby'),('CSS'),
--		('TypeScript'),('C'),('PowerShell'),('Shell'),('Perl'),('Kotlin'),('Oracle 12c'),('MySQL'),
--		('SQL Server'),('PostgreSQL'),('MongoDB'),('MariaDB'),('DB2'),('SAP HANA'),('Scrum'),('Kanban');

--go

--INSERT INTO Beneficios 
--VALUES ('Vale-alimentação'),('Vale-refeição'),('Assistência médica'),('Vale-cultura'),
--		('Plano odontológico'),('Auxílio-creche'),('Bolsas de estudo'),('Horório flexível'),('Home Office');

--go

INSERT INTO StatusInscricao 
VALUES ('Pendente'),('Em Processo'),('Contratado'),('Vaga Encerrada');

go

INSERT INTO StatusContrato 
VALUES ('Em Andamento'),('Concluido'),('Evadido');

go

Insert into Remoto
Values ('Remoto'),('Presencial'),('Remoto ou Presencial')


select * from Usuario
select * from PreferenciasTrabalho    
select * from RegimeContratacao
select * from Acesso 		
select * from Endereco
select * from AreaAtuacao
select * from Experiencias
select * from Vaga
select * from Beneficios
select * from Tecnologia
select * from Empresa
select * from TipoAcesso
select * from Inscricao
select * from Remoto
select * from StatusInscricao
select * from Estagio
Select * from Inscricao
Select * from Contrato