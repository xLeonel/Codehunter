import React, { useEffect } from 'react';

import NavBar from '../../components/navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { usuarioLogado } from '../../services/auth';
import history from '../../history';

import '../../assets/style/reset.css'
import './style.css';

function Vaga(){
    const [vaga, setVaga] = React.useState([]);
    const [vagaId, setVagaId] = React.useState(0);
    const [techs, setTech] = React.useState([]);
    const [beneficios, setBeneficios] = React.useState([]);

    useEffect(() => {
        GetVaga();
        GetVagaTech();
    },[])

    const inscricao = {
        idVaga: vagaId
    }

    const GetVaga = async () => {
        let url = window.location.href.substring(27,50)
        const request = await fetch(`http://localhost:5000/api/Vaga/${url}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            const response = await request.json();
            setVaga(response);
            setBeneficios(response.beneficios)
            setVagaId(parseInt(url))
        }

    const GetVagaB = async () => {
        const request = await fetch(`http://localhost:5000/api/Vaga/Mobile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        const response = await request.json();
        setVaga(response)
    }

    const GetVagaTech = () => {
        let url = window.location.href.substring(27,50)
        fetch(`http://localhost:5000/api/Tecnologia/${url}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setTech(dados);
            })
            .catch(erro => console.error(erro))
        }

    function handleClickVaga(){
        let mensagem = "É necessario estar logado para se candidatar a uma vaga";
        if(!usuarioLogado()){
            alert(mensagem);
            history.push('/login/usuario');
        } else {
            fetch(`http://localhost:5000/api/Inscricao`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(inscricao)
            })
                .then(response => response.json())
                .then(dados => alert(dados))
                .catch(erro => console.error(erro))
            }
        }
    
    const selectedVaga = () => {
        return (
            <div>
                <NavBar/>
                <div>
                    {vaga.map((item:any) => {
                        return (
                        <div className="vaga3">
                    <div className="aa">
                        <p className="areaAtuacao3">{item.areaAtuacaoVaga}</p>
                        <h3 className="vagaTitle">{item.titulo}</h3>
                    </div>
                    <div className="basicInfo3">
                        <div className="local3">
                            <p className="vagaText">Local de Trabalho: </p>
                            <p>{item.localidade}</p>
                        </div>
                        <div className="salary3">
                            <p className="vagaText">Salário: </p>
                            <p>R$ {item.salario}</p>
                        </div>
                    </div>
                    <p className="vagaText">Requisitos: </p>
                    <p className="questions">O que você precisa?</p>
                    <p className="description3">{item.descricaoRequisitos}</p>

                    <p className="vagaText">Atividades: </p>
                    <p className="questions">O que você irá fazer?</p>
                    <p className="description3">{item.descricaoAtividades}</p>

                    <p className="vagaText">Benefícios: </p>
                    <p className="questions">Quais benefícios terão?</p>
                    <div className="benefits3">
                        {item.beneficios.map((item: any) => {
                            return (
                                <Button className="buttonT" type="submit" value={item} />
                            )
                        })}
                    </div>

                    <p className="vagaText">Tecnologias: </p>
                    <p className="questions">Quais tecnologias serão utilizadas?</p>
                    <div className="tecnology3">
                        {techs.map((tech: any) => {
                            return (
                                <Button className="buttonT" type="submit" value={tech.nomeTecnologia} />
                                )
                            })}
                        </div>
                        <Button className="button" type="button" value="Me Candidatar" onClick={handleClickVaga}/>
                    </div>
                    )})}
            </div>
            <Footer/>
        </div>
        )
    }
        return (
            selectedVaga()
        );
}

export default Vaga;