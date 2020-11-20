import React from 'react';
import NavBar from '../../components/navbar/index';
import Footer from '../../components/Footer/index';
import Button from '../../components/Button';

import bannerImg from '../../assets/images/img_homeAluno.png';
import People from '../../assets/images/img_people.png';
import Dev from '../../assets/images/img_dev2.png';
import Infrastructure from '../../assets/images/img_infra2.png';
import Internship from '../../assets/images/img_internship.png';
import Multimedia from '../../assets/images/img_multimedia.png';
import Partnerships from '../../assets/images/img_parcerias.png';
import appleStore from '../../assets/images/img_applestore.png';
import playStore from '../../assets/images/img_playstore.png';
import Cellphone from '../../assets/images/img_cellphone.png';

import './style.css';
import { Link } from 'react-router-dom';

function homeAluno() {
    return (
        <div>
            <NavBar />
            <div className="banner1">
                <div className="fullText">
                    <div className="textHome">
                        <p>SENAI - SP</p>
                        <h1>VAGAS</h1>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem. Nesciunt sed eos dicta, dolore debitis soluta vero quis, ipsa impedit voluptate minima?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas sequi mollitia laborum voluptatibus, suscipit eveniet aut aliquid quae repudiandae eos? Quam recusandae reiciendis minus dolor optio ipsum! Atque, accusamus tempora.</p>
                </div>
                <img className="imgAluno" src={bannerImg} alt="" />
            </div>
            <div className="banner2">
                <img src={People} alt="" />
                <div className="textB2">
                    <h1>Como se candidatar?</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis error asperiores aliquid iste deserunt placeat quia dolorem.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas sequi mollitia laborum voluptatibus, suscipit eveniet aut aliquid quae repudiandae eos? Quam recusandae reiciendis minus dolor optio ipsum! Atque, accusamus tempora.</p>
                </div>
            </div>
            <div className="titulo">
                <div className="linha2"></div>
                <h1>Vagas</h1>
                <div className="linha2"></div>
            </div>
            <div className="modelWorksA">
                <div className="rowA">
                    <div className="imgColumnA">
                        <img src={Dev} alt="" />
                        <div className="titleColumnA">
                            <p className="titleA">Desenvolvedores</p>
                        </div>
                    </div>
                    <div className="buttonColumnA">
                        <Link to="/vagas"><Button className="button" type="button" value="Vagas" /></Link>
                    </div>

                </div>
            </div>
            <div className="modelWorksA">
                <div className="rowA">
                    <div className="imgColumnA">
                        <img src={Infrastructure} alt="" />
                        <div className="titleColumnA">
                            <p className="titleA">Redes de Computadores</p>
                        </div>
                    </div>
                    <div className="buttonColumnA">
                        <Link to="/vagas"><Button className="button" type="button" value="Vagas" /></Link>
                    </div>

                </div>
            </div>
            <div className="modelWorksA">
                <div className="rowA">
                    <div className="imgColumnA">
                        <img src={Internship} alt="" />
                        <div className="titleColumnA">
                            <p className="titleA">Estágio</p>
                        </div>
                    </div>
                    <div className="buttonColumnA">
                        <Link to="/vagas"><Button className="button" type="button" value="Vagas" /></Link>
                    </div>
                </div>
                <div className="modelWorksA">
                    <div className="rowA">
                        <div className="imgColumnA">
                            <img src={Multimedia} alt="" />
                            <div className="titleColumnA">
                                <p className="titleA">Multimídia</p>
                            </div>
                        </div>
                        <div className="buttonColumnA">
                            <Link to="/vagas"><Button className="button" type="button" value="Vagas" /></Link>
                        </div>
                    </div>
                </div>
                <div className="buttonVagas">
                    <Link to="/vagas"><Button className="button" type="button" value="Ver Mais" /></Link>
                </div>
                <div className="titulo">
                    <div className="linha2"></div>
                    <h1>Parcerias</h1>
                    <div className="linha2"></div>
                </div>
                <img className="partnershipImg" src={Partnerships} alt="" />
                <div className="bottomContent">
                    <div className="texts">
                        <h1>Baixe nosso App</h1>
                        <p>No tablet e no seu celular</p>
                        <div className="downloads">
                            <div className="apple">
                                <img src={appleStore} alt="" />
                                <p>Baixe pela <br /> Apple Store</p>
                            </div>
                            <div className="android">
                                <img src={playStore} alt="" />
                                <p>Baixe pela <br /> Play Store</p>
                            </div>
                        </div>
                    </div>
                    <div className="cellImg">
                        <img src={Cellphone} alt="" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default homeAluno;