import React from 'react';
import { Route, Router } from 'react-router-dom';

import FormEmpresa from './pages/empresa/FormEmpresa';
import CadastroUser from './pages/cadastroUser';
import Home from './pages/home/index';

import UserDashboard from './pages/dashboardUser/dashboard';
import UserTestePersonalidade from './pages/dashboardUser/testepersonalidade';

import EmpresaDashboard from './pages/dashboardEmpresa/dashboard';
import EmpresaFilialCadastroDashboard from './pages/dashboardEmpresa/filialCadastro';
import EmpresaVagasCadastroDashboard from './pages/dashboardEmpresa/vagasCadastro';
import EmpresaFilialList from './pages/dashboardEmpresa/filial';
import EmpresaVagaslist from './pages/dashboardEmpresa/vagas';

import AdmDashboard from './pages/dashboardAdm/dashboard';
import AdmEstagiosDashboard from './pages/dashboardAdm/estagios';
import AdmEmpresasDashboard from './pages/dashboardAdm/empresas';
import AdmVagasDashboard from './pages/dashboardAdm/vagas';
import AdmUsuariosDashboard from './pages/dashboardAdm/usuarios';

import HomeEmpresa from './pages/homeEmpresa';
import HomeAluno from './pages/homeAluno';
import Vagas from './pages/vagas';
import Vaga from './pages/vagaSelecionada';
import TipoUsuarioPage from './pages/tipoUsuarioPage';
import Config from './pages/configuracoes';
import Perfil from './pages/perfil';

import LoginUser from './pages/loginUser';
import LoginEmpresa from './pages/loginEmpresa';

import vagasEmpresaDashboard from './pages/dashboardEmpresa/dashboard'

import Found from './pages/vagasMatch';
import NotFound from './pages/vagasNotFoundPage';

import history from './history'

function Routers() {
    return (
        <Router history={history}>
            <Route path="/" exact component={Home} />

            <Route path="/user/dashboard" component={UserDashboard} />
            <Route path="/user/testepersonalidade" component={UserTestePersonalidade} />

            <Route path="/empresa/dashboard" exact component={EmpresaDashboard} />
            <Route path="/empresa/filial/cadastro" exact component={EmpresaFilialCadastroDashboard} />
            <Route path="/empresa/vaga/cadastro" exact component={EmpresaVagasCadastroDashboard} />
            <Route path="/empresa/vaga/list" exact component={EmpresaVagaslist} />
            <Route path="/empresa/filial/list" exact component={EmpresaFilialList} />


            <Route path="/adm/dashboard" component={AdmDashboard} />
            <Route path="/adm/estagios" component={AdmEstagiosDashboard} />
            <Route path="/adm/empresas" component={AdmEmpresasDashboard} />
            <Route path="/adm/vagas" component={AdmVagasDashboard} />
            <Route path="/adm/usuarios" component={AdmUsuariosDashboard} />


            <Route path="/cadastrar/empresa" component={FormEmpresa} />
            <Route path="/cadastrar/usuario" component={CadastroUser} />


            <Route path="/empresa/vagas" component={vagasEmpresaDashboard} />


            <Route path="/empresa" exact component={HomeEmpresa} />
            <Route path="/aluno" exact component={HomeAluno} />
            <Route path="/vagas" exact component={Vagas} />
            <Route path="/vaga/:id" exact component={Vaga} />
            <Route path="/tipousuario" exact component={TipoUsuarioPage} />

            <Route path="/configuracoes" exact component={Config} />
            <Route path="/perfil" exact component={Perfil} />

            <Route path="/found" exact component={Found} />
            <Route path="/notfound" exact component={NotFound} />

            <Route path="/login/usuario" exact component={LoginUser} />
            <Route path="/login/empresa" exact component={LoginEmpresa} />

        </Router>
    );
}

export default Routers;