import React, { useEffect, useState } from 'react';
import dimg from '../../../assets/images/d.png';
import iimg from '../../../assets/images/i.png';
import simg from '../../../assets/images/s.png';
import cimg from '../../../assets/images/c.png';
import PersoUndefined from '../../../assets/images/persoUndefined.png';
import history from '../../../history'


function TestePersonalidade() {

    const [count, setCount] = useState(1);
    const maxPage = 10;

    const [perfil, setPerfil] = useState('');
    const [perfilBanco, setPerfilBanco] = useState('');
    const [a, setA] = useState(0);
    const [c, setC] = useState(0);
    const [i, setI] = useState(0);
    const [o, setO] = useState(0);


    useEffect(() => {
        listar();
        GetRandomValues();
    }, [])

    const listar = () => {
        fetch('http://localhost:5000/api/Usuario', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                // setUsuario(dados);
                console.log(dados.nomePersonalidade)
                setPerfilBanco(dados.nomePersonalidade);

            })
            .catch(erro => console.error(erro))
    }

    const A = [
        { id: 'A', value: 'Inflexível' },
        { id: 'A', value: 'Convincente' },
        { id: 'A', value: 'Mediador' },
        { id: 'A', value: 'Independente' },
    ]

    const O = [
        { id: 'O', value: 'Atencioso' },
        { id: 'O', value: 'Agressivo' },
        { id: 'O', value: 'Detalhista' },
        { id: 'O', value: 'Diplomático' },
    ]

    const I = [
        { id: 'I', value: 'Controlado' },
        { id: 'I', value: 'Metido' },
        { id: 'I', value: 'Egoísta' },
        { id: 'I', value: 'Amigável' },
    ]

    const C = [
        { id: 'C', value: 'Audacioso' },
        { id: 'C', value: 'Competitivo' },
        { id: 'C', value: 'Triste' },
        { id: 'C', value: 'Autoconfiante' },
    ]


    interface Obejto {
        id: string,
        value: string
    }


    const ArrayRandom: Array<Obejto> = [];
    const [array, setArray] = useState(Array<Obejto>());

    const GetRandomValues = () => {
        let a = A[Math.floor(Math.random() * 4)];
        let o = O[Math.floor(Math.random() * 4)];
        let c = C[Math.floor(Math.random() * 4)];
        let i = I[Math.floor(Math.random() * 4)];

        ArrayRandom.push(a)
        ArrayRandom.push(o)
        ArrayRandom.push(i)
        ArrayRandom.push(c)

        setArray(ArrayRandom)

        // ArrayRandom.map((item: any) => {
        //     console.log(item)
        // })
    }

    const setarPersonalidade = () => {

        let maior = Math.max(a, i, o, c)

        if (maior === a) {
            setPerfil('Dominante');
        }
        else if (maior === o) {
            setPerfil('Conforme');

        }
        else if (maior === i) {
            setPerfil('Estável');

        }
        else if (maior === c) {
            setPerfil('Influente');
        }


    }

    const Fim = (
        <div>
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Parábens, o resultado do seu teste foi:</h3>

            <div style={{ marginBottom: '16%', marginTop: '8%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {perfil === 'Dominante' || perfilBanco === "Dominante" ? <img src={dimg} alt="personalidae" width="124px" height="124px" /> : perfil === 'Influente' || perfilBanco === "Influente" ? <img src={iimg} alt="personalidae" width="124px" height="124px" /> : perfil === 'Estável' || perfilBanco === "Estável" ? <img src={simg} alt="personalidae" width="124px" height="124px" /> : perfil === 'Conforme' || perfilBanco === "Conforme" ? <img src={cimg} alt="personalidae" width="124px" height="124px" /> : <img src={PersoUndefined} alt="personalidae" width="124px" height="124px" />}
                <p style={{ marginTop: '5%' }}>{perfil === '' ? perfilBanco : perfil}</p>

            </div>
        </div>
    )

    const StepOne = (
        <div>
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Perguntas</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ marginBottom: '16%', marginTop: '8%', display: 'flex', justifyContent: 'center' }}>

                    <div >
                        <label style={{ fontWeight: 'bolder' }}>Escolha a palavra que melhor lhe define:</label>
                        <div>
                            <div>
                                {array.map((item: any) => {
                                    if (count <= 10) {
                                        return (
                                            <div style={{ display: "flex", alignItems: 'center' }}>
                                                <input type="radio" checked={false} id={item.value} name={item.value} value={item.value} onClick={() => {
                                                    if (item.id === 'A') {
                                                        setA(a + 1);
                                                    }
                                                    else if (item.id === 'O') {
                                                        setO(o + 1);

                                                    }
                                                    else if (item.id === 'I') {
                                                        setI(i + 1);

                                                    }
                                                    else if (item.id === 'C') {
                                                        setC(c + 1);

                                                    }
                                                    setarPersonalidade();
                                                    setCount(count + 1);
                                                    GetRandomValues();
                                                }} />
                                                <label htmlFor={item.value} style={{ margin: '0 10px' }}>{item.value}</label>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const AtualizarUser = () => {
        let body = {
            nomePersonalidade: perfil
        }

        fetch('http://localhost:5000/api/Usuario/', {
            method: 'put',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(response => response.json())
            .then(dados => {

                if (dados === 'Usuário atualizado.') {
                    history.push('/user/dashboard');
                }
                else {
                    alert(dados);
                }
            })
            .catch(erro => console.error(erro))
    }

    return (
        <div>

            {/* {count === 1 ? StepOne : count === 2 ? StepTwo : count === 3 ? StepThree : StepFour} */}

            {count > 10 || perfilBanco !== undefined ? Fim : StepOne}

            <div className="responseFooter" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                {count > 10 ? <button className="submit" type="submit" onClick={AtualizarUser} value="Concluir">Concluir</button> : perfilBanco === "" ? <p style={{ color: '#DC3545', fontWeight: 'bold' }}>{count} de {maxPage}</p> : <p style={{ color: '#DC3545', fontWeight: 'bold', display: 'none' }}>{count} de {maxPage}</p>}
            </div>

        </div>
    );
}

export default TestePersonalidade;