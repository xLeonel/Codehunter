import React from 'react';

import logo from '../../assets/images/logoSenaiRed.png';
import icon from '../../assets/images/tipoUsuario.png';
import { Link } from 'react-router-dom';

import '../../assets/style/reset.css'
import './style.css';
import Button from '../../components/Button';
import { Divider } from '@material-ui/core';

function Home() {
    return (
        <div className="allPage">

            <div className="logoDaNav">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>

            <Divider/>

            <div className="MainContent">
                <h1>Bem-vindo !</h1>
                <img className="iconMainContent" src={icon} alt="icon" />
                <p>Vamos lá. Você é empresa ou aluno?</p>
                <div className="BotoesChoose">
                    <Link to="/login/usuario"><Button className="button" type="button" value="Alunos" /></Link>
                    <Link to="/login/empresa"><Button className="button" type="button" value="Empresas" /></Link>
                </div>

            </div>

        </div>
    );
}

export default Home;