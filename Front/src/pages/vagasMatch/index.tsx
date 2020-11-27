import React, { useEffect, useState } from 'react';

import Button from '../../components/Button/index'
import logo from '../../assets/images/logoSenaiRed.png';
import placeImg from '../../assets/images/img_placeIcon.png';
import salaryImg from '../../assets/images/img_moneyIcon.png';
import { Link } from 'react-router-dom';

import '../../assets/style/reset.css'
import './style.css';
import { Divider } from '@material-ui/core';


function Home() {
    const [vagas, setVagasMatch] = useState([]);

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        fetch('http://localhost:5000/api/Usuario/VagasMatch', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setVagasMatch(dados);
            })
            .catch(erro => console.error(erro))
    }
    return (
        <div className="allPage2">

            <div className="logoDaNav">
                <Link to="/"><img className="foto" src={logo} alt="logo" /></Link>
            </div>

            <Divider />

            <div className="MainContent2">
                <h3 className="pastel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ipsam, possimus, nulla harum quia sit blanditiis corporis tempora mollitia, dolorum enim. Quia nulla suscipit et iste neque hic unde repellendus?</h3>
                {
                    vagas.map((vaga:any) => {
                        return (
                            <div className="vaga2">
                            <p className="areaAtuacao">{vaga.areaAtuacaoVaga}</p>
                            <h3>{vaga.titulo}</h3>
                            <div className="basicInfo">
                                <div className="local">
                                    <img src={placeImg} alt="" />
                                    <p>{vaga.localidade}</p>
                                </div>
                                <div className="salary2">
                                    <img src={salaryImg} alt="" />
                                    <p>R$ {vaga.salario}</p>
                                </div>
                            </div>
                            <p className="description2">{vaga.descricaoRequisitos}</p>
                                <Link to={`/vaga/${vaga.idVaga}`}><Button className="button" type="button" value="Mais Detalhes"/></Link>
                            </div>
                    )})
                    }
                <div className="skip">
                    <Link to='/user/dashboard'><Button className="button" type="button" value="Pular"></Button></Link>
                </div>
            </div>
        </div>
    );
}

export default Home;