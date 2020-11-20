import React from 'react';
import Navbar from '../../components/navbar/index';
import Footer from '../../components/Footer/index';
import Img from '../../assets/images/img_home.png';
import Button from '../../components/Button/index';
import { Link } from 'react-router-dom';

import '../../assets/style/reset.css'
import './style.css';

function Home(){
    return (
        <div>
            <Navbar/>
                <div className="fullHome">
                    <img src={Img} alt=""/>
                        <div className="contentHome">
                            <div className="textHome">
                                <p>SENAI - SP</p>
                                <h1>VAGAS</h1>
                            </div>
                                <p className="textoa">Com o SENAI-SP Vagas, você como aluno encontrará as melhores oportunidades disponíveis no mercado, enquanto, você como empresa encontrará os melhores profissionais   tecnicamente.</p>
                            <div className="buttons">
                                <Link to="/aluno"><Button className="button" type="button" value="Alunos"/></Link>
                                <Link to="/empresa"><Button className="button" type="button" value="Empresas"/></Link>
                            </div>
                        </div>
                </div>
            <Footer/>
        </div>
    );
}
    
export default Home;