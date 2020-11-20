import React from 'react';
import NavBarDashboard from '../../components/navbarDashboard';

import '../../assets/style/reset.css'

import ConteudoList from './vagasListComponente';


function VagasEmpresa() {
    return (
        <div>
            <div>
                <NavBarDashboard componente={ConteudoList()} />
            </div>

        </div>
    );
}

export default VagasEmpresa;