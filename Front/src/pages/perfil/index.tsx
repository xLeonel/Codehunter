import React, { useEffect, useState } from 'react';
import '../../assets/style/reset.css'
import './style.css';
import InputText from '../../components/InputText'
import ButtonJJ from '../../components/Button';

import ImageUploading, { ImageType } from "react-images-uploading";


import history from '../../history'

import { parseJWT } from '../../services/auth';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Perfil() {

    const [images, setImages] = React.useState([]);

    // const [usuario, setUsuario] = useState([]);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGitHub] = useState('');
    const [stackOverflow, setOverFlow] = useState('');
    const [site, setSite] = useState('');
    const [nivelIngles, setNivelIngles] = useState('');
    const [situacaoProfissional, setSitProfissional] = useState('');
    const [idRemoto, setRemoto] = useState(0);
    const [fotoSetada, setFoto] = useState('');

    const [mudado, setMudado] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [openErro, setErroOpen] = React.useState(false);

    //Empresa
    const [descricao, setDescricao] = useState('');
    const [numColab, setNumColab] = useState(0);
    const [nomeRepresentante, setNomeRepresentante] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');



    const onChange = (
        imageList: ImageType,
        // addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        if (imageList[0].dataURL !== null || imageList[0].dataURL !== undefined) {
            var stringSplit = imageList[0].dataURL.split(',');

            console.log(stringSplit[1])
            setFoto(stringSplit[1])
            setMudado(true)
            setImages(imageList as never[]);

        }

        // console.log(imageList, addUpdateIndex);

    };

    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        if (parseJWT().Role === '1' || parseJWT().Role === '2') {
            fetch('http://localhost:5000/api/Usuario', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(dados => {
                    // setUsuario(dados);
                    setNome(dados.nomeCompleto);
                    setTelefone(dados.celular);
                    setLinkedin(dados.idPreferenciasTrabalhoNavigation.linkedin);
                    setGitHub(dados.idPreferenciasTrabalhoNavigation.github);
                    setOverFlow(dados.idPreferenciasTrabalhoNavigation.stackOverflow);
                    setSite(dados.idPreferenciasTrabalhoNavigation.sitePessoal);
                    setNivelIngles(dados.idPreferenciasTrabalhoNavigation.nivelIngles);
                    setSitProfissional(dados.idPreferenciasTrabalhoNavigation.situacaoProfissional);
                    setRemoto(dados.idPreferenciasTrabalhoNavigation.idRemoto);

                    const foto: ImageType = {
                        dataURL: `data:image/jpeg;base64,${dados.foto}`
                    }

                    console.log(dados.foto)

                    var imagens = [foto];

                    setImages(imagens as never[])
                })
                .catch(erro => console.error(erro))
        }
        else if (parseJWT().Role === '3') {
            fetch('http://localhost:5000/api/Empresa', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(dados => {
                    setNome(dados.razaoSocial)
                    setTelefone(dados.celular);
                    setDescricao(dados.descricao);
                    setNumColab(dados.numColaboradores);
                    setNomeRepresentante(dados.nomeRepresentante);
                    setNomeFantasia(dados.nomeFantasia);

                })
                .catch(erro => console.error(erro))
        }

    }

    const atualizarUser = () => {

        if (parseJWT().Role === '1' || parseJWT().Role === '2') {
            if (fotoSetada === '') {
                let formSemFoto = {
                    celular: telefone,
                    // foto: fotoSetada,
                    IdPreferenciasTrabalhoNavigation: {
                        Linkedin: linkedin,
                        Github: github,
                        StackOverflow: stackOverflow,
                        SitePessoal: site,
                        NivelIngles: nivelIngles,
                        SituacaoProfissional: situacaoProfissional,
                        IdRemoto: idRemoto,
                    }
                }

                fetch('http://localhost:5000/api/Usuario', {
                    method: 'PUT',
                    body: JSON.stringify(formSemFoto),
                    headers: {
                        'content-type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => response.json())
                    .then(() => {
                        // setUsuario([]);

                        setImages([]);
                        setNome('');
                        setTelefone('');
                        setLinkedin('');
                        setGitHub('');
                        setOverFlow('');
                        setSite('');
                        setNivelIngles('');
                        setSitProfissional('');
                        setRemoto(0);
                        setFoto('');
                        setMudado(false);

                        setOpen(true);

                        // history.goBack()
                        listar();
                    })
                    .catch(erro => {
                        console.error(erro);
                        setErroOpen(true);
                    })
            }
            else {
                let formComFoto = {
                    celular: telefone,
                    foto: fotoSetada,
                    IdPreferenciasTrabalhoNavigation: {
                        Linkedin: linkedin,
                        Github: github,
                        StackOverflow: stackOverflow,
                        SitePessoal: site,
                        NivelIngles: nivelIngles,
                        SituacaoProfissional: situacaoProfissional,
                        IdRemoto: idRemoto,
                    }
                }

                fetch('http://localhost:5000/api/Usuario', {
                    method: 'PUT',
                    body: JSON.stringify(formComFoto),
                    headers: {
                        'content-type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => response.json())
                    .then(() => {
                        // setUsuario([]);

                        setImages([]);
                        setNome('');
                        setTelefone('');
                        setLinkedin('');
                        setGitHub('');
                        setOverFlow('');
                        setSite('');
                        setNivelIngles('');
                        setSitProfissional('');
                        setRemoto(0);
                        setFoto('');
                        setMudado(false);

                        setOpen(true);

                        // history.goBack()
                        listar();
                    })
                    .catch(erro => {
                        console.error(erro);
                        setErroOpen(true);
                    })
            }

        }
        else if (parseJWT().Role === '3') {
            let formEmpresa = {
                celular: telefone,
                nomeFantasia: nomeFantasia,
                nomeRepresentante: nomeRepresentante,
                numColaboradores: numColab,
                descricao: descricao
                // foto: fotoSetada,            
            }

            fetch('http://localhost:5000/api/Empresa', {
                method: 'PUT',
                body: JSON.stringify(formEmpresa),
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(() => {
                    // setUsuario([]);

                    setNome('')
                    setTelefone('');
                    setDescricao('');
                    setNumColab(0);
                    setNomeRepresentante('');
                    setNomeFantasia('');

                    setMudado(false);

                    setOpen(true);


                    // history.goBack()
                    listar();
                })
                .catch(erro => {
                    console.error(erro);
                    setErroOpen(true);
                })
        }

    }


    const removerImagem = () => {
        setMudado(true)
        setImages([]);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const alertSucesso = () => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="success">
                Atualizado com sucesso !
        </Alert>
        </Snackbar >
    )

    const alertErro = () => (
        <Snackbar open={openErro} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error">
                Erro ao atualizar, tente novamente.
        </Alert>
        </Snackbar>
    )

    const menuUser = () => (
        <div className="mainContentPerfil">

            <h2>Perfil</h2>

            <div className="mainConteudoPerfil">

                <div className="esquerdoContentPerfil">
                    <h3>Detalhes Básicos</h3>
                    {/* <form> */}


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
                                                <img src={image.dataURL} alt="" width="105px" height="105px" />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                    </ImageUploading>

                    <div>

                        <div className="DivsForm">

                            <InputText
                                name="nome"
                                label="Nome"
                                type="text"
                                disabled
                                placeholder={nome}
                            >
                            </InputText>


                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="telefone"
                                label="Telefone"
                                type="text"
                                placeholder={telefone}
                                value={telefone}
                                onChange={e => {
                                    setTelefone(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="email"
                                label="Email"
                                type="text"
                                disabled
                                placeholder={parseJWT().email}
                            >
                            </InputText>
                        </div>
                    </div>


                </div>

                <div className="linha"></div>


                <div className="direitoContentPerfil">
                    <h3>Redes Sociais (opcional)</h3>
                    <form>
                        <div className="DivsForm">
                            <InputText
                                name="linkedin"
                                label="Linkedin"
                                type="text"
                                placeholder={linkedin}
                                value={linkedin}
                                onChange={e => {
                                    setLinkedin(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="github"
                                label="Github"
                                type="text"
                                placeholder={github}
                                value={github}
                                onChange={e => {
                                    setGitHub(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="stackOverflow"
                                label="Stack Overflow"
                                type="text"
                                placeholder={stackOverflow}
                                value={stackOverflow}
                                onChange={e => {
                                    setOverFlow(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="site"
                                label="Site Pessoal"
                                type="text"
                                placeholder={site}
                                value={site}
                                onChange={e => {
                                    setSite(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                    </form>
                </div>

            </div>
            <div className="BotaoSubmit">
                {mudado === true ? <ButtonJJ className="submit" type="button" value="Salvar" onClick={() => atualizarUser()} ></ButtonJJ> : <ButtonJJ className="submit" type="button" value="Voltar" onClick={() => history.goBack()} ></ButtonJJ>}
                {/* // <ButtonJJ className="submit" type="button" value="Voltar" onClick={() => history.goBack()} ></ButtonJJ> */}
            </div>

            {alertSucesso()};
            {alertErro()};

        </div>
    )

    const menuEmpresa = () => (

        <div className="mainContentPerfil">

            <h2>Perfil</h2>

            <div className="mainConteudoPerfil">

                <div className="esquerdoContentPerfil">
                    <h3>Detalhes Básicos</h3>
                    {/* <form> */}


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
                                                <img src={image.dataURL} alt="" width="105px" height="105px" />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                    </ImageUploading>

                    <div>

                        <div className="DivsForm">

                            <InputText
                                name="nome"
                                label="Nome"
                                type="text"
                                disabled
                                placeholder={nome}
                            >
                            </InputText>


                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="telefone"
                                label="Telefone"
                                type="text"
                                placeholder={telefone}
                                value={telefone}
                                onChange={e => {
                                    setTelefone(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="email"
                                label="Email"
                                type="text"
                                disabled
                                placeholder={parseJWT().email}
                            >
                            </InputText>
                        </div>
                    </div>


                </div>

                <div className="linha"></div>


                <div className="direitoContentPerfil">
                    <h3>Redes Sociais (opcional)</h3>
                    <form>
                        <div className="DivsForm">
                            <InputText
                                name="nomeFantasia"
                                label="Nome Fantasia"
                                type="text"
                                placeholder={nomeFantasia}
                                value={nomeFantasia}
                                onChange={e => {
                                    setNomeFantasia(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="nomeRepresentante"
                                label="Nome Representante"
                                type="text"
                                placeholder={nomeRepresentante}
                                value={nomeRepresentante}
                                onChange={e => {
                                    setNomeRepresentante(e.target.value);
                                    setMudado(true);
                                }}
                            >
                            </InputText>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="quantity" style={{ fontSize: '0.7500em', fontWeight: 'bold' }}>Número de Coloboradores *</label>
                            <input value={numColab} onChange={e => { setNumColab(e.target.valueAsNumber); setMudado(true); }} style={{ border: '1px solid black', margin: '8px 0' }} type="number" id="quantity" name="quantity" min="1" max="5"></input>
                        </div>


                        <div style={{ marginTop: '8px' }}>
                            <label className='label-edit'>Descrição dos Requisitos</label>
                            <textarea value={descricao} onChange={e => { setDescricao(e.target.value); setMudado(true); }} style={{ resize: "vertical", width: '100%', padding: '1%', marginTop: '8px' }} rows={3} className="texteareaCadastro" name="descricaoRequisitos" form="form" placeholder="Digite os requisitos que o profissional deve possuir.."></textarea>
                        </div>

                    </form>
                </div>

            </div>
            <div className="BotaoSubmit">
                {mudado === true ? <ButtonJJ className="submit" type="button" value="Salvar" onClick={() => atualizarUser()} ></ButtonJJ> : <ButtonJJ className="submit" type="button" value="Voltar" onClick={() => history.goBack()} ></ButtonJJ>}
                {/* // <ButtonJJ className="submit" type="button" value="Voltar" onClick={() => history.goBack()} ></ButtonJJ> */}
            </div>

            {alertSucesso()};
            {alertErro()};

        </div>
    )

    return (
        <div>

            {parseJWT().Role === '1' || parseJWT().Role === '2' ? menuUser() : menuEmpresa()}

        </div>
    )
}

export default Perfil;