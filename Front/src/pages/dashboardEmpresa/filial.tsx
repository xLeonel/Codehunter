import React from 'react';
import NavBarDashboard from '../../components/navbarDashboard';

import '../../assets/style/reset.css'

import Conteudo from './filialListComponente';


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