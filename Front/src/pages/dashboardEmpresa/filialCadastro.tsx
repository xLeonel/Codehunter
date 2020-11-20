import React from 'react';
import NavBarDashboard from '../../components/navbarDashboard';

import '../../assets/style/reset.css'

import Conteudo from './filialCadastroComponente';


function filialCadastroEmpresa() {
    return (
        <div>
            <div>
                <NavBarDashboard componente={Conteudo()} />
            </div>

        </div>
    );
}

export default filialCadastroEmpresa;