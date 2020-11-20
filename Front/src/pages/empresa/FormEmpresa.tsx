import React, { useState } from 'react';
import '../../assets/style/reset.css'
import './style.css';
import InputText from '../../components/InputText'
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoSenaiRed.png'
import history from '../../history';


function FormEmpresa() {

    const [count, setCount] = useState(1);

    //User
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setSenhaConfirm] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [numColaboradores, setNumColaboradores] = useState(0);
    const [cnpj, setCnpj] = useState('');
    const [nomeRepresentante, setNomeRepresentante] = useState('');
    const [celular, setCelular] = useState('');
    const [descricao, setDescricao] = useState('');
    const [areaAtuacao, setAreaAtuacao] = useState('');

    //Endereco
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');

    const maxPage = 2;

    // const GetCnpj = (valor: string) => {

    //     fetch(`https://www.receitaws.com.br/v1/cnpj/36542025000164`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(dados => {
    //             setCnpj(dados.cnpj);
    //             setCep(dados.cep);
    //             setRua(dados.logradouro);
    //             setBairro(dados.bairro);
    //             setLocalidade(dados.municipio);
    //             setUf(dados.uf);
    //             setNumero(dados.numero);
    //             console.log(dados)
    //         })
    //         .catch(erro => console.error(erro))

    // }

    const Cadastrar = async () => {

        // const experiência = []

        // for (let index = 0; index < beneficiosTags.length; index++) {
        //     console.log(beneficiosTags[index].title);

        //     let send = {
        //         NomeBeneficios: beneficiosTags[index].title
        //     }
        //     beneficiosFormat.push(send)
        // }

        const body = {
            IdAcessoNavigation: {
                Email: email,
                Senha: senha
            },
            NomeFantasia: nomeFantasia,
            RazaoSocial: razaoSocial,
            NumColaboradores: numColaboradores,
            Cnpj: cnpj,
            NomeRepresentante: nomeRepresentante,
            Celular: celular,
            Descricao: descricao,
            IdAreaAtuacaoNavigation: {
                NomeAreaAtuacao: areaAtuacao
            },
            IdEnderecoNavigation: {
                Cep: cep,
                Logradouro: `${rua}, ${numero}`,
                Complemento: complemento,
                Bairro: bairro,
                Localidade: localidade,
                Uf: uf
            }
        }

        console.log(body)


        try {
            const url = "http://localhost:5000/api/Empresa"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            if (response === 'Cadastrado com sucesso') {
                try {
                    const url = "http://localhost:5000/api/Login/Empresa"
                    const request = await fetch(url, {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Email: email, Senha: senha })
                    })
                    const response = await request.json()

                    if (response === 'Conta não existe') {
                        alert(response)
                    }
                    else if (response === 'Email ou senha inválidos.') {
                        alert(response)
                    }
                    else {
                        if (response !== undefined) {
                            localStorage.setItem('token', response.token)

                            history.push('/empresa/dashboard')
                        }

                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
            else {
                alert(response);
            }

        } catch (error) {
            throw new Error(error)
        }


    }



    const GetCep = (valor: string) => {
        fetch(`https://viacep.com.br/ws/${valor}/json/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setCep(dados.cep);
                setRua(dados.logradouro);
                setBairro(dados.bairro);
                setLocalidade(dados.localidade)
                setUf(dados.uf)

            })
            .catch(erro => console.error(erro))
    }

    const validarSenha = () => {
        if (senha !== confirmSenha) {
            alert('As senhas devem ser iguais.')
        }
    }

    const StepOne = (
        <div>
            <div style={{ margin: '17px 40px 14px  40px' }}>
                <Link to='/'><img height='65px' width='186px' src={logo} alt='logo' /></Link>
            </div>
            <Divider />
            <div style={{ textAlign: 'center', marginBottom: '3%' }}>
                <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Informe os dados da Empresa<br></br>para iniciar o cadastro</h3>
            </div>
            <div className="div-company-main-form">
                <div className="div-company-left-form">

                    <div className="div-company-input">
                        <InputText
                            name="email-company"
                            label="Email Corporativo *"
                            type="email"
                            placeholder="Digite o Email Corporativo"
                            onChange={e => setEmail(e.target.value)}
                            value={email}

                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="telefone"
                            label="Telefone de Contato *"
                            type="text"
                            placeholder="Exemplo: (11) 98585-5858"
                            onChange={e => setCelular(e.target.value)}
                            maxLength={15}
                            value={celular}

                        >
                        </InputText>
                    </div>
                    <div className="div-company-input">
                        <InputText
                            name="password"
                            label="Digite a Senha *"
                            type="password"
                            placeholder="Digite a Senha de Acesso"
                            onChange={e => setSenha(e.target.value)}
                            value={senha}

                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="passwordverification"
                            label="Confirme a Senha *"
                            type="password"
                            placeholder="Confirme a Senha de Acesso"
                            onChange={e => setSenhaConfirm(e.target.value)}
                            onBlur={validarSenha}
                            value={confirmSenha}

                        >
                        </InputText>
                    </div>

                </div>

                <div className="div-company-line"></div>

                <div className="div-company-right-form">

                    <div className="div-company-input">
                        <InputText
                            name="cnpj-company"
                            label="CNPJ *"
                            type="text"
                            placeholder="Digite o CNPJ da Empresa"
                            onChange={e => setCnpj(e.target.value)}
                            value={cnpj}
                            maxLength={18}                   
                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="name-company"
                            label="Razão Social *"
                            type="text"
                            placeholder="Digite a Razão Social"
                            onChange={e => setRazaoSocial(e.target.value)}
                            value={razaoSocial}

                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="trade-mark-company"
                            label="Nome Fantasia *"
                            type="text"
                            placeholder="Digite o Nome Fantasia"
                            onChange={e => setNomeFantasia(e.target.value)}
                            value={nomeFantasia}

                        >
                        </InputText>
                    </div>

                    {/* <div>
                            <ComboBox labelName="Área de Atuação *" name="niche-company" value>

                            </ComboBox>
                        </div> */}

                    <div className="div-company-input">
                        <InputText
                            name="areaAtuacao"
                            label="Área de Atuação*"
                            type="text"
                            placeholder="Digite a area de atuacao"
                            onChange={e => setAreaAtuacao(e.target.value)}
                            value={areaAtuacao}

                        >
                        </InputText>
                    </div>


                </div>
            </div>
        </div>

    )

    const StepTwo = (
        <div>
            <div style={{ margin: '17px 40px 14px  40px' }}>
                <Link to='/'><img height='65px' width='186px' src={logo} alt='logo' /></Link>
            </div>
            <Divider />
            <div style={{ textAlign: 'center', marginBottom: '5%' }}>
                <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Informe a localização da Empresa<br></br>para finalizar o cadastro</h3>
            </div>
            <div className="div-company-main-form">
                <div className="div-company-left-form">

                    <div className="div-company-input">
                        <InputText
                            name="nomeRepresentante"
                            label="Nome Representante*"
                            type="text"
                            placeholder="Digite o seu nome"
                            onChange={e => setNomeRepresentante(e.target.value)}
                            value={nomeRepresentante}

                        >
                        </InputText>
                    </div>

                    <div style={{ marginBottom: '35px' }}>
                        <label className='label-edit'>Descrição dos Requisitos</label>
                        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} style={{ resize: "vertical", width: '100%', padding: '1%', marginTop: '8px' }} rows={3} className="texteareaCadastro" name="descricaoRequisitos" form="form" placeholder="Digite os requisitos que o profissional deve possuir.."></textarea>
                    </div>



                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '35px' }}>
                        <label htmlFor="quantity">Número de Coloboradores *</label>
                        <input value={numColaboradores} onChange={e => setNumColaboradores(e.target.valueAsNumber)} style={{ border: '1px solid black' }} type="number" id="quantity" name="quantity" min="1" max="5"></input>
                    </div>


                    <div className="div-company-input">
                        <InputText
                            name="cep"
                            label="Cep"
                            type="text"
                            placeholder={cep === '' ? "Ex.: 03807-200" : cep}
                            onChange={e => GetCep(e.target.value)}
                            maxLength={9}
                        >
                        </InputText>
                    </div>


                    <div className="div-company-input">
                        <InputText
                            name="estado"
                            label="Estado *"
                            type="text"
                            placeholder="Digite o Estado"
                            value={uf}
                        >
                        </InputText>
                    </div>



                </div>

                <div className="div-company-line"></div>

                <div className="div-company-right-form">

                    <div className="div-company-input">
                        <InputText
                            name="cidade"
                            label="Cidade *"
                            type="text"
                            placeholder="Digite a Cidade"
                            value={localidade}
                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="bairro"
                            label="Bairro *"
                            type="text"
                            placeholder="Digite o Bairro"
                            value={bairro}

                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="endereco"
                            label="Endereço *"
                            type="text"
                            placeholder="Ex.: Rua 11 de Maio"
                            value={rua}

                        >
                        </InputText>
                    </div>

                    <div className="div-company-input">
                        <InputText
                            name="numero"
                            label="Número *"
                            type="text"
                            placeholder="N°"
                            onChange={e => setNumero(e.target.value)}
                            value={numero}
                        >
                        </InputText>
                    </div>


                    <div className="div-company-input">
                        <InputText
                            name="complemento"
                            label="Complemento *"
                            type="text"
                            placeholder="Bloco/Andar"
                            onChange={e => setComplemento(e.target.value)}
                            value={complemento}
                        >
                        </InputText>
                    </div>

                </div>
            </div>
        </div >

    )

    const StepThree = (
        <p>notfound</p>
    )

    return (
        // DIV PRINCIPAL
        <div style={{ marginTop: '2%' }}>


            {count === 1 ? StepOne : count === 2 ? StepTwo : StepThree}

            <div className="responseFooter" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: '3%', marginBottom: '2%' }}>
                {count <= 1 ? <button disabled type='button' onClick={() => setCount(count - 1)} value='Voltar'>Voltar</button> : <button style={{ color: '#DC3545', fontWeight: 'bold' }} type='button' onClick={() => setCount(count - 1)} value='Voltar'>Voltar</button>}

                {count === maxPage ? <button className="submit" type="submit" onClick={Cadastrar} value="Concluir">Concluir</button> : <button className="submit" type="button" value="Próximo" onClick={() => setCount(count + 1)}>Próximo</button>}

                <p style={{ color: '#DC3545', fontWeight: 'bold' }}>{count} de {maxPage}</p>
            </div>


        </div>

    );
}

export default FormEmpresa;