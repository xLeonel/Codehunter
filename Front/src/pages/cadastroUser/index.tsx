import React, { useState } from 'react';
import InputText from '../../components/InputText'
import './style.css'
import '../../assets/style/reset.css'
import logo from '../../assets/images/logoSenaiRed.png'
import { createStyles, Divider, IconButton, makeStyles, TextField, Theme } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import ImageUploading, { ImageType } from "react-images-uploading";
import { Link } from 'react-router-dom';
import history from '../../history';

function CadastroUser() {

    const [count, setCount] = useState(1);
    const [quantidade, setQuantidade] = useState(1);
    const [checked, setChecked] = React.useState(false);
    const [images, setImages] = React.useState([]);

    //Endereco
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');

    //User
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setSenhaConfirm] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [celular, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [fotoSetada, setFoto] = useState('');
    const [curriculo, setCurriculo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [areaAtuacao, setAreaAtuacao] = useState('');

    // redes sociais
    const [linkedin, setLinkedin] = useState('');
    const [github, setGitHub] = useState('');
    const [stackOverflow, setOverFlow] = useState('');
    const [site, setSite] = useState('');
    const [nivelIngles, setNivelIngles] = useState('');
    const [situacaoProfissional, setSitProfissional] = useState('');
    const [idRemoto, setIdRemoto] = useState(0);
    const [regimeContratacao, setRegimeContratacao] = useState('');
    const [salario, setSalario] = useState('');

    const maxPage = 4;

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
            NomeCompleto: nomeCompleto,
            Celular: celular,
            Cpf: cpf,
            Curriculo: curriculo,
            Foto: fotoSetada,
            Descricao: descricao,
            IdAreaAtuacaoNavigation: {
                NomeAreaAtuacao: areaAtuacao
            },
            IdEnderecoNavigation: {
                Cep: cep,
                Logradouro: rua,
                Complemento: complemento,
                Bairro: bairro,
                Localidade: localidade,
                Uf: uf
            },
            IdPreferenciasTrabalhoNavigation: {
                Linkedin: linkedin,
                Github: github,
                StackOverflow: stackOverflow,
                SitePessoal: site,
                NivelIngles: nivelIngles,
                SituacaoProfissional: situacaoProfissional,
                IdRemoto: idRemoto,
                IdRegimeContratacaoNavigation: {
                    NomeRegimeContratacao: regimeContratacao,
                    ExpectativaSalario: salario
                }
            }
        }


        try {
            const url = "http://localhost:5000/api/Usuario/"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            if (response === 'Cadastrado') {

                try {
                    const url = "http://localhost:5000/api/Login/Usuario"
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

                            try {
                                const url = "http://localhost:5000/api/Usuario/VagasMatch"
                                const request = await fetch(url, {
                                    method: "get",
                                    headers: {
                                        authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                })
                                const response = await request.json()

                                if (response === 'Nenhuma vaga compatível com o usuário.') {
                                    history.push('/notfound')
                                }
                                else {
                                    history.push('/found')
                                }
                            } catch (error) {
                                throw new Error(error)
                            }

                        }

                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
            else {
                alert(response);
                // window.location.reload();
            }

        } catch (error) {
            throw new Error(error)
        }


    }

    const onChange = (
        imageList: ImageType,
        // addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        if (imageList[0].dataURL !== undefined) {
            var stringSplit = imageList[0].dataURL.split(',');

            setFoto(stringSplit[1]);
        }

        console.log(imageList);

        setImages(imageList as never[]);
    };

    const setarCurriculo = (path: any) => {
        setCurriculo(path[1]);
        // console.log(path[1]); 

    }

    const getBase64 = (event: any) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //me.modelvalue = reader.result;
            // console.log(reader.result);
            // console.log(reader.result?.toString());

            let abc = reader.result?.toString();

            setarCurriculo(abc?.split(','));

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
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

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                width: 250,
                '& .MuiFormLabel-root': {
                    color: 'black'
                }
            },
        }),
    );

    const classes = useStyles();

    const ComponenteExperiencias = () => {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2%' }}>
                    <div style={{ marginRight: '10px' }}>
                        <InputText
                            name="empresa"
                            label="Empresa "
                            type="text"
                            placeholder="Digite o nome da empresa"
                            disabled={checked === true ? true : false}
                        >
                        </InputText>

                        <InputText
                            name="cargo"
                            label="Cargo"
                            type="text"
                            placeholder="Digite o nome do cargo"
                            value={bairro}
                            disabled={checked === true ? true : false}

                        // onChange={e => setEmail(e.target.value)}
                        >
                        </InputText>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '10px' }}>


                        <TextField
                            id="dtValidade"
                            label="De"
                            type="date"
                            disabled={checked === true ? true : false}
                            // onChange={e => setDtValidade(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        <TextField
                            id="dtValidade"
                            label="Até"
                            type="date"
                            disabled={checked === true ? true : false}
                            // onChange={e => setDtValidade(e.target.value)}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>
                </div>

            </div>
        )
    }

    const renderExp = (reptirX: number) => {
        var arrayComponente = [];
        for (var i = 0; i < reptirX; i++) {
            arrayComponente.push(ComponenteExperiencias());
        }
        return <div>{arrayComponente}</div>;

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
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Fundamentos</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '50%', marginBottom: '4%', marginTop: '1%' }}>
                    <InputText
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="Digite seu email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    >
                    </InputText>

                    <InputText
                        name="senha"
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        onChange={e => setSenha(e.target.value)}
                        value={senha}
                    >
                    </InputText>

                    <InputText
                        name="confirmsenha"
                        label="Confirmar Senha"
                        type="password"
                        placeholder="Confirme a sua senha"
                        onChange={e => setSenhaConfirm(e.target.value)}
                        onBlur={validarSenha}
                        value={confirmSenha}

                    >
                    </InputText>

                    <div className="radioResponsivoTeste">
                        <label className='label-edit'>Área de atuação</label>
                        <div className='response'>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="back" checked={areaAtuacao === 'Back-end' ? true : false} onChange={e => setAreaAtuacao(e.target.value)} name="areaAtuacaoUser" value="Back-end" />
                                <label htmlFor='back' style={{ margin: '0 10px' }}>Back-end</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="front" checked={areaAtuacao === 'Front-end' ? true : false} onChange={e => setAreaAtuacao(e.target.value)} name="areaAtuacaoUser" value="Front-end" />
                                <label htmlFor='front' style={{ margin: '0 10px' }} >Front-end</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="full" checked={areaAtuacao === 'Full-stack' ? true : false} onChange={e => setAreaAtuacao(e.target.value)} name="areaAtuacaoUser" value="Full-stack" />
                                <label htmlFor='full' style={{ margin: '0 10px' }} >Full-stack</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="redes" checked={areaAtuacao === 'Redes' ? true : false} onChange={e => setAreaAtuacao(e.target.value)} name="areaAtuacaoUser" value="Redes" />
                                <label htmlFor='redes' style={{ margin: '0 10px' }}>Redes</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="informatica" checked={areaAtuacao === 'Informática' ? true : false} onChange={e => setAreaAtuacao(e.target.value)} name="areaAtuacaoUser" value="Informática" />
                                <label htmlFor='informatica' style={{ margin: '0 10px' }}>Informática</label>
                            </div>
                        </div>

                    </div>

                    <div style={{ margin: '10px 0' }}>
                        <label htmlFor="situacaoProfisional" className='label-edit'>Qual é sua situação profissional? *</label> <br />
                        <select onChange={e => setSitProfissional(e.target.value)} className="select-box" name="situacaoProfisional" id="situacaoProfisional" style={{ margin: '10px 0' }}>
                            <option disabled selected>Selecione uma opção</option>
                            <option selected={situacaoProfissional === 'Desempregado' ? true : false} value="Desempregado">Desempregado</option>
                            <option selected={situacaoProfissional === 'Empregado' ? true : false} value="Empregado">Empregado</option>
                            <option selected={situacaoProfissional === 'primeiraEmprego' ? true : false} value="primeiraEmprego">Em busca do primeiro emprego</option>
                        </select>
                    </div>

                    <div className="radioResponsivoTeste">
                        <label className='label-edit'>Qual é seu nível de inglês?</label>
                        <div className='response'>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={nivelIngles === 'Básico' ? true : false} onChange={e => setNivelIngles(e.target.value)} id="basico" name="ingles" value="Básico" />
                                <label htmlFor='basico' style={{ margin: '0 10px' }}>Básico</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={nivelIngles === 'Intermediário' ? true : false} onChange={e => setNivelIngles(e.target.value)} id="interm" name="ingles" value="Intermediário" />
                                <label htmlFor='interm' style={{ margin: '0 10px' }} >Intermediário</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={nivelIngles === 'Fluente' ? true : false} onChange={e => setNivelIngles(e.target.value)} id="fluente" name="ingles" value="Fluente" />
                                <label htmlFor='fluente' style={{ margin: '0 10px' }} >Fluente</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={nivelIngles === 'Nativo' ? true : false} onChange={e => setNivelIngles(e.target.value)} id="nativo" name="ingles" value="Nativo" />
                                <label htmlFor='nativo' style={{ margin: '0 10px' }}>Nativo</label>
                            </div>
                        </div>
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
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Dados Pessoais</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '50%', marginBottom: '4%', marginTop: '1%' }}>
                    <InputText
                        name="nomeCompleto"
                        label="Nome Completo"
                        type="text"
                        placeholder="Digite seu nome completo"
                        onChange={e => setNomeCompleto(e.target.value)}
                        value={nomeCompleto}
                    >
                    </InputText>

                    <InputText
                        name="cpf"
                        label="Cpf"
                        type="text"
                        placeholder="Digite seu cpf"
                        onChange={e => setCpf(e.target.value)}
                        value={cpf}
                        maxLength={14}
                    >
                    </InputText>

                    <InputText
                        name="celular"
                        label="Celular"
                        type="text"
                        placeholder="Ex.: (11) 99119-5430"
                        onChange={e => setTelefone(e.target.value)}
                        value={celular}
                        maxLength={15}
                    >
                    </InputText>

                    <div style={{ width: '100%' }}>
                        <label className='label-edit'>Descrição</label>
                        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} style={{ resize: "vertical", width: '100%', padding: '1%', marginTop: '8px' }} rows={2} className="texteareaCadastro" name="descricaoUser" form="form" placeholder="Conte um pouco sobre você..."></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ marginRight: '10px' }}>
                            <InputText
                                name="cep"
                                label="Cep"
                                type="text"
                                placeholder={cep === '' ? "Ex.: 03807-200" : cep}
                                onChange={e => GetCep(e.target.value)}
                                maxLength={9}

                            >
                            </InputText>

                            <InputText
                                name="bairro"
                                label="Bairro"
                                type="text"
                                placeholder="Ex.: Sé"
                                value={bairro}
                            // onChange={e => setEmail(e.target.value)}
                            >
                            </InputText>

                            <InputText
                                name="localidade"
                                label="Cidade"
                                type="text"
                                placeholder="Ex.: São Paulo"
                                value={localidade}
                            // onChange={e => setEmail(e.target.value)}
                            >
                            </InputText>

                        </div>

                        <div style={{ marginLeft: '10px' }}>
                            <InputText
                                name="logradouro"
                                label="Rua"
                                type="text"
                                placeholder="Ex.: R. Praça da Sé"
                                value={rua}

                            // onChange={e => setEmail(e.target.value)}
                            >
                            </InputText>

                            <InputText
                                name="complemento"
                                label="Complemento"
                                type="text"
                                placeholder="Ex.: Apt 50 Bloco C"
                                onChange={e => setComplemento(e.target.value)}
                            >
                            </InputText>

                            <InputText
                                name="uf"
                                label="Estado"
                                type="text"
                                value={uf}
                                placeholder="Ex.: SP"
                            // onChange={e => setEmail(e.target.value)}
                            >
                            </InputText>

                        </div>


                    </div>


                </div>
            </div>
        </div>
    )

    const StepThree = (
        <div>
            <div style={{ margin: '17px 40px 14px  40px' }}>
                <Link to='/'><img height='65px' width='186px' src={logo} alt='logo' /></Link>
            </div>
            <Divider />
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Preferências</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '50%', marginBottom: '2%', marginTop: '1%' }}>
                    <div className="radioResponsivoTeste">
                        <label className='label-edit'>Trabalho remoto</label>
                        <div className='response'>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={idRemoto === 3 ? true : false} onChange={() => setIdRemoto(3)} id="remotoPresencial" name="trabalhoRemotoUser" value="remotoPresencial" />
                                <label htmlFor='remotoPresencial' style={{ margin: '0 10px' }}>Remoto ou presencial</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="presencial" checked={idRemoto === 2 ? true : false} onChange={() => setIdRemoto(2)} name="trabalhoRemotoUser" value="presencial" />
                                <label htmlFor='presencial' style={{ margin: '0 10px' }} >Apenas presencial</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" id="remoto" checked={idRemoto === 1 ? true : false} onChange={() => setIdRemoto(1)} name="trabalhoRemotoUser" value="remoto" />
                                <label htmlFor='remoto' style={{ margin: '0 10px' }} >Apenas remoto</label>
                            </div>
                        </div>
                    </div>

                    <div className="radioResponsivoTeste">
                        <label className='label-edit'>Qual regime de contratação você procura?</label>
                        <div className='response'>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={regimeContratacao === 'CLT' ? true : false} onChange={e => setRegimeContratacao(e.target.value)} id="clt" name="regimeContratacaoUser" value="CLT" />
                                <label htmlFor='clt' style={{ margin: '0 10px' }}>CLT</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={regimeContratacao === 'PJ' ? true : false} onChange={e => setRegimeContratacao(e.target.value)} id="pj" name="regimeContratacaoUser" value="PJ" />
                                <label htmlFor='pj' style={{ margin: '0 10px' }} >PJ</label>
                            </div>

                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="radio" checked={regimeContratacao === 'Estágio' ? true : false} onChange={e => setRegimeContratacao(e.target.value)} id="estagio" name="regimeContratacaoUser" value="Estágio" />
                                <label htmlFor='estagio' style={{ margin: '0 10px' }} >Estágio</label>
                            </div>
                        </div>
                    </div>

                    <InputText
                        name="salario"
                        label="Qual a sua expectativa salarial?"
                        type="text"
                        placeholder="Digite sua expectativa salarial"
                        onChange={e => setSalario(e.target.value)}
                        value={salario}
                    >
                    </InputText>

                    <p className="textoAserReponse" style={{ marginBottom: '15px' }}>Colocar apenas salário bruto. Outros fatores de renda, como bonus e afins,
                    podem ser discutidos com os empregadores, uma vez que receber o convite
                    para uma entrevista.</p>

                    <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Experiência e educação</h3>

                    <p style={{ textAlign: 'center' }}>Economize tempo importando o PDF do seu currículo do LinkedIn </p>

                    <div style={{ display: "flex", justifyContent: 'center', marginTop: '2%', marginBottom: '4%' }}>
                        <input type="file" onChange={e => getBase64(e)} />
                    </div>


                    <div className="radioResponsivoTeste">
                        <div className='response'>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <input type="checkbox" id="semExperiencia" checked={checked} onChange={() => setChecked(!checked)} name="eexperienciaUser" value="semExperiencia" />
                                <label htmlFor='semExperiencia' style={{ margin: '0 10px' }}>Não possuo experiência profissional</label>
                            </div>
                        </div>
                    </div>

                    {renderExp(quantidade)}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3%' }}>
                        <IconButton disabled={checked === true ? true : false} onClick={() => setQuantidade(quantidade + 1)}><AddCircleOutline /></IconButton>
                    </div>

                </div>
            </div>
        </div>
    )

    const removerImagem = () => {
        setImages([]);
    }

    const StepFour = (
        <div>
            <div style={{ margin: '17px 40px 14px  40px' }}>
                <Link to='/'><img height='65px' width='186px' src={logo} alt='logo' /></Link>
            </div>
            <Divider />
            <h3 style={{ textAlign: 'center', margin: '20px 0' }}>Contato</h3>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', margin: '5% 0' }}>
                <div style={{ width: '20%', marginRight: '10%' }}>

                    <ImageUploading
                        value={images}
                        onChange={onChange}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            isDragging,
                            dragProps
                        }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">


                                    <div className="butaoUpoload">
                                        <button
                                            style={isDragging ? { color: "red" } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            className="botaoQSome"
                                        >
                                            Adicionar foto
                                                </button>
                                                &nbsp;
                                        {/* <button onClick={onImageRemoveAll}>Remover foto</button> */}
                                        <button onClick={removerImagem}>Remover foto</button>
                                    </div>

                                    <div className="ModelImagemPreview" style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
                                        {imageList.map((image, index) => (
                                            <div key={index}>
                                                <img src={image.dataURL} alt="sua fotinha" width="105px" height="105px" />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                    </ImageUploading>

                    <InputText
                        name="nomeCompleto"
                        label="Nome Completo"
                        type="text"
                        placeholder=""
                        value={nomeCompleto}
                        onChange={e => setNomeCompleto(e.target.value)}
                    >
                    </InputText>

                    <InputText
                        name="email"
                        label="Email"
                        type="text"
                        value={email}
                        placeholder=""
                        onChange={e => setEmail(e.target.value)}
                    >
                    </InputText>

                    <InputText
                        name="celular"
                        label="Celular"
                        type="text"
                        value={celular}
                        placeholder=""
                        onChange={e => setTelefone(e.target.value)}
                    >
                    </InputText>
                </div>

                <div style={{ width: '20%', marginLeft: '10%' }}>

                    <InputText
                        name="linkedin"
                        label="Linkedin"
                        type="text"
                        placeholder="Linkedin"
                        onChange={e => setLinkedin(e.target.value)}
                        value={linkedin}
                    >
                    </InputText>

                    <InputText
                        name="github"
                        label="Github"
                        type="text"
                        placeholder="Github"
                        onChange={e => setGitHub(e.target.value)}
                        value={github}

                    >
                    </InputText>

                    <InputText
                        name="stackOverflow"
                        label="Stack Overflow"
                        type="text"
                        placeholder="Stack Overflow"
                        onChange={e => setOverFlow(e.target.value)}
                        value={stackOverflow}
                    >
                    </InputText>

                    <InputText
                        name="sitePessoal"
                        label="Site Pessoal"
                        type="text"
                        placeholder="Site Pessoal"
                        onChange={e => setSite(e.target.value)}
                        value={site}
                    >
                    </InputText>

                </div>
            </div>

        </div>
    )

    return (
        <div>

            {count === 1 ? StepOne : count === 2 ? StepTwo : count === 3 ? StepThree : StepFour}

            <div className="responseFooter" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                {count <= 1 ? <button disabled type='button' onClick={() => setCount(count - 1)} value='Voltar'>Voltar</button> : <button style={{ color: '#DC3545', fontWeight: 'bold' }} type='button' onClick={() => setCount(count - 1)} value='Voltar'>Voltar</button>}

                {count === maxPage ? <button className="submit" type="submit" onClick={Cadastrar} value="Concluir">Concluir</button> : <button className="submit" type="button" value="Próximo" onClick={() => setCount(count + 1)}>Próximo</button>}

                <p style={{ color: '#DC3545', fontWeight: 'bold' }}>{count} de {maxPage}</p>
            </div>

        </div>
    );
}

export default CadastroUser
