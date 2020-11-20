import React from 'react';

import './style.css';
import Logo from '../../assets/images/logoSenai.png';

function Footer() {
    return (
            <div className="content">
                <div className="logoImg">
                    <img className="logo" src={Logo} alt="" />
                </div>

                <div className="text">
                    <p>
                        INSTITUTO SENAI DE TECNOLOGIA DA INFORMAÇÃO <br />
                        E COMUNICAÇÃO <br />
                        Alameda Barão de Limeira, 539 Santa Cecília, São Paulo - SP <br />
                        (11) 3273-5000
                    </p>
                    <p className="propaganda">Desenvolvido por AJPV</p>
                </div>
            </div>

    )
}

export default Footer;