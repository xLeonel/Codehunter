import React from 'react';
import NavBarDashboard from '../../components/navbarDashboard';

import '../../assets/style/reset.css'

import Conteudo from './vagaCadastroComponente';


function vagasCadastroEmpresa() {
    return (
        <div>
            <div>
                <NavBarDashboard componente={Conteudo()} />
            </div>

        </div>
    );
}

export default vagasCadastroEmpresa;