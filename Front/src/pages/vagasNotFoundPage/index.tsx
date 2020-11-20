import React from 'react';

import logo from '../../assets/images/logoSenaiRed.png';
import icon from '../../assets/images/notFound.png';
import { Link } from 'react-router-dom';

import '../../assets/style/reset.css'
import './style.css';
import Button from '../../components/Button';
import { Divider } from '@material-ui/core';

function Home() {
    return (
        <div className="allPage">

            <div className="logoDaNav">
                <Link to="/"><img className="foto" src={logo} alt="logo" /></Link>
            </div>

            <Divider/>

            <div className="MainContent">
                <h1></h1>
                <img className="iconMainContent" src={icon} alt="icon" />
                <p>Nehuma vaga sugerida no momento :(</p>
                <div className="BotoesChoose">
                    <Link to="/user/dashboard"><Button className="submit" type="button" value="Continuar" /></Link>
                </div>

            </div>

        </div>
    );
}

export default Home;