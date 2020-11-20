import React from 'react';
import NavBar from '../../components/navbar/index';
import Footer from '../../components/Footer/index';
import Button from '../../components/Button/index';

import BannerImg from '../../assets/images/img_files.png';
import Linha from '../../assets/images/blackLine.png';
import Girl from '../../assets/images/img_girl.png';
import Icons from '../../assets/images/img_icons.png';
import Kanban from '../../assets/images/img_kanban.png';
import Dev from '../../assets/images/img_dev.png';
import Infrastructure from '../../assets/images/img_infra.png';
import BottomBanner from '../../assets/images/banner.png';

import './style.css';
import { Link } from 'react-router-dom';

function homeEmpresa() {
    return (
        <div>
            <NavBar />
            <div className="banner">
                <div className="bannerContent">
                    <div className="paddingTexto">
                        <h1>Encontre em nossa Instituição o que falta para seu time</h1>
                    </div>
                    <div>
                        <img src={BannerImg} alt="" />
                    </div>
                </div>
            </div>
            <div className="titulo">
                <img src={Linha} alt="" />
                <h1>Por quê o SENAI?</h1>
                <img src={Linha} alt="" />
            </div>
            <div className="amoeba">
                <div className="leftContent">
                    <div className="box">
                        <p>Instituição de Referência Internacional</p>
                    </div>
                    <div className="box">
                        <p>Projetos reais para Empresas reais</p>
                    </div>
                </div>
                <div className="amoebaImg">
                    <img src={Girl} alt="" />

                </div>
                <div className="rightContent">
                    <div className="box">
                        <p>Treinamento com as melhores práticas do mercado</p>
                    </div>
                    <div className="box">
                        <p>Trabalho em equipe</p>
                    </div>
                </div>
            </div>

            <div className="companyTrust">
                <div>
                    <h1 className="title">Empresas que confiam na Instituição SENAI</h1>
                </div>

                <div className="iconsImg" >
                    <img src={Icons} alt="" />
                </div>
            </div>

            <div className="modelWorks">
                <div>
                    <h1 className="title">Trabalho Ágil</h1>
                </div>

                <div className="row">
                    <div className="textColumn">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem. Nesciunt sed eos dicta, dolore debitis soluta vero quis, ipsa impedit voluptate minima?</p>
                    </div>
                    <div className="imgColumn">
                        <img src={Kanban} alt="" />
                    </div>
                </div>
            </div>

            <div className="modelWorks">
                <div>
                    <h1 className="title">Desenvolvedores</h1>
                </div>
                <div className="row">
                    <div className="textColumn">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem. Nesciunt sed eos dicta, dolore debitis soluta vero quis, ipsa impedit voluptate minima?</p>
                    </div>

                    <div className="imgColumn">
                        <img src={Dev} alt="" />
                    </div>
                </div>
            </div>

            <div className="modelWorks">
                <div>
                    <h1 className="title">Infraestrutura</h1>
                </div>
                <div className="row">
                    <div className="textColumn">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem. Nesciunt sed eos dicta, dolore debitis soluta vero quis, ipsa impedit voluptate minima?</p>
                    </div>
                    <div className="imgColumn">
                        <img src={Infrastructure} alt="" />
                    </div>
                </div>
            </div>

            <Link to="/login/empresa"><Button className="button" type="button" value="Quero contratar" /></Link>


            <div className="bottomBanner">
                <img src={BottomBanner} alt="" />
            </div>
            <Footer />

            {/* <div className="fill">
                <img className="bottomBanner" src={BottomBanner} alt="" />
                <Footer />
            </div> */}
        </div>
    )
}

export default homeEmpresa;