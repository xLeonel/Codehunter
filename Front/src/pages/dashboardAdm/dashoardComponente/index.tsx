import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import '../../../assets/style/reset.css';
import './style.css'
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from 'react-chartjs-2';



function MenuEmpresa() {

    const [numList, setNum] = useState(0);

    useEffect(() => {
        getNumVagas();
    }, []);

    const getNumVagas = () => {
        fetch('http://localhost:5000/api/Vaga', {
            method: 'GET',
            // headers: {
            //     authorization: 'Bearer ' + localStorage.getItem('token')
            // }
        })
            .then(response => response.json())
            .then(dados => {
                setNum(dados.length);
            })
            .catch(erro => console.error(erro))
    }

    const percentage = 50;

    // const data = {
    //     labels: ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maior', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    //     datasets: [
    //         {
    //             label: 'Indíce de empregabilidade',
    //             data: [12, 19, 3, 5, 2, 3, 3, 3, undefined, 3, 3, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86,1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // }

    // ALUNOS POR CURSO EM ESTAGIOS ANUALMENTE
    const data = {
        labels: ['2017', '2018', '2019', '2020'],
        datasets: [
            {
                label: 'Desenvolvimento',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#DC3545',
            },
            {
                label: 'Redes',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#4BB3EE',
            },
            {
                label: 'Informática',
                data: [3, 10, 13, 15, 22, 30],
                backgroundColor: '#1F1F20',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '80%', marginLeft: '10%' }}>
                <Bar data={data} options={options} />
            </div>

            <div className="inverter" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: 'center' }}>Vagas</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '160px', height: '160px' }}>

                            <h1 style={{ fontSize: '70px', color:'#DC3545' }}>{numList}</h1>
                            <p style={{ marginTop: '15px' }}>Cadastradas</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '160px', height: '160px', margin: '0 30px' }}>
                            <h1 style={{ fontSize: '70px', color:'#DC3545' }}>0</h1>
                            <p style={{ marginTop: '15px' }}>Match</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '160px', height: '160px' }}>
                            <h1 style={{ fontSize: '70px', color:'#DC3545' }}>0</h1>
                            <p style={{ marginTop: '15px' }}>Canceladas</p>
                        </div>
                    </div>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ textAlign: 'center' }}>Estágios</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '150px', height: '150px' }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: `#DC3545`,
                                    textColor: '#DC3545',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',

                                })}
                            />
                            <p style={{ marginTop: '15px' }}>Em Andamento</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '150px', height: '150px', margin: '0 30px' }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: `#DC3545`,
                                    textColor: '#DC3545',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',

                                })}
                            />
                            <p style={{ marginTop: '15px' }}>Concluído</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '150px', height: '150px' }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: `#DC3545`,
                                    textColor: '#DC3545',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',

                                })}
                            />
                            <p style={{ marginTop: '15px' }}>Efetivado</p>
                        </div>
                    </div>

                </div>


            </div>
        </div >
    );
}

export default MenuEmpresa;