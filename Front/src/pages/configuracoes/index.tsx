import React, { useEffect, useState } from 'react';
import '../../assets/style/reset.css'
import './style.css';
import InputText from '../../components/InputText'
import Button from '../../components/Button';

import ButtonMat from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import history from '../../history'

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { parseJWT } from '../../services/auth';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Config() {

    const [open, setOpen] = React.useState(false);
    const [openErro, setErroOpen] = React.useState(false);


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

    const [senhaBanco, setSenhaBanco] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [senhaConfirmSenha, setSenhaConfirm] = useState('');

    // const [email, setEmail] = useState('');
    // const [nomeFantasia, setNomeFantasia] = useState('');
    // const [razaoSocial, setRazaoSocial] = useState('');
    // const [numColaboradores, setNumColaboradores] = useState(0);
    // const [cnpj, setCnpj] = useState('');
    // const [nomeRepresentante, setNomeRepresentante] = useState('');
    // const [celular, setCelular] = useState('');
    // const [descricao, setDescricao] = useState('');
    // const [areaAtuacao, setAreaAtuacao] = useState('');

    // //Endereco
    // const [cep, setCep] = useState('');
    // const [rua, setRua] = useState('');
    // const [complemento, setComplemento] = useState('');
    // const [bairro, setBairro] = useState('');
    // const [localidade, setLocalidade] = useState('');
    // const [uf, setUf] = useState('');


    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        if (parseJWT().Role === '1' || parseJWT().Role === '2') {
            fetch('http://localhost:5000/api/Usuario', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => response.json())
                .then(dados => {
                    setSenhaBanco(dados.idAcessoNavigation.senha);
                    console.log(dados.idAcessoNavigation.senha)
                })
                .catch(erro => console.error(erro))
        }
        else if (parseJWT().Role === '3') {
            fetch('http://localhost:5000/api/Empresa', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => response.json())
                .then(dados => {
                    setSenhaBanco(dados.idAcessoNavigation.senha);
                    console.log(dados.idAcessoNavigation.senha)
                })
                .catch(erro => console.error(erro))
        }
    }


    const atualizarSenha = () => {

        if (senhaBanco === senhaAtual) {
            if (senhaNova === senhaConfirmSenha) {
                if (parseJWT().Role === '1' || parseJWT().Role === '2') {

                    let formUp = {
                        IdAcessoNavigation: {
                            Senha: senhaNova,
                        }
                    }
                    fetch('http://localhost:5000/api/Usuario', {
                        method: 'PUT',
                        body: JSON.stringify(formUp),
                        headers: {
                            'content-type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(() => {
                            // setUsuario([]);

                            setSenhaBanco('');
                            setSenhaAtual('');
                            setSenhaNova('');
                            setSenhaConfirm('');

                            setOpen(true);

                            window.location.reload();


                        })
                        .catch(erro => {
                            console.error(erro);
                        })
                }
                else if (parseJWT().Role === '3') {

                    let body = {
                        IdAcessoNavigation: {
                            Senha: senhaNova
                        }
                    }

                    fetch('http://localhost:5000/api/Empresa', {
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'content-type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(() => {
                            // setUsuario([]);

                            setSenhaBanco('');
                            setSenhaAtual('');
                            setSenhaNova('');
                            setSenhaConfirm('');

                            setOpen(true);

                            window.location.reload();


                        })
                        .catch(erro => {
                            console.error(erro);
                        })
                }
            }
            else {
                setErroOpen(true);
            }
        }
        else {
            setErroOpen(true);
        }
    }

    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const validarSenha = () => {
        if (senhaNova !== senhaConfirmSenha) {
            alert('As senhas devem ser iguais.')
        }
    }

    const delCont = async () => {

        try {
            if (parseJWT().Role === '1' || parseJWT().Role === '2') {
                const url = "http://localhost:5000/api/Usuario"
                const request = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                const response = await request.json()

                console.log(response)

                if (response !== 'Erro ao deletar.') {
                    if (parseJWT().Role === '1' || parseJWT().Role === '2') {
                        alert(response);

                        history.push('/login/usuario');
                        localStorage.removeItem('token');

                    }
                    else if (parseJWT().Role === '3') {
                        alert(response);

                        history.push('/login/empresa');
                        localStorage.removeItem('token');
                    }
                }
                else if (parseJWT().Role === '3') {
                    alert("Você trocou a senha recentemente, relogue!");
                    if (parseJWT().Role === '1' || parseJWT().Role === '2') {
                        history.push('/login/usuario');
                        localStorage.removeItem('token');

                    }
                    else if (parseJWT().Role === '3') {
                        history.push('/login/empresa');
                        localStorage.removeItem('token');
                    }
                }

            }
            else if (parseJWT().Role === '3') {
                const url = "http://localhost:5000/api/Empresa"
                const request = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                const response = await request.json()

                console.log(response)

                if (response !== 'Erro ao deletar.') {
                    if (parseJWT().Role === '1' || parseJWT().Role === '2') {
                        alert(response);

                        history.push('/login/usuario');
                        localStorage.removeItem('token');

                    }
                    else if (parseJWT().Role === '3') {
                        alert(response);

                        history.push('/login/empresa');
                        localStorage.removeItem('token');
                    }
                }
                else if (parseJWT().Role === '3') {
                    alert("Você trocou a senha recentemente, relogue!");
                    if (parseJWT().Role === '1' || parseJWT().Role === '2') {
                        history.push('/login/usuario');
                        localStorage.removeItem('token');

                    }
                    else if (parseJWT().Role === '3') {
                        history.push('/login/empresa');
                        localStorage.removeItem('token');
                    }
                }

            }

        } catch (error) {
            throw new Error(error)
        }

    }

    const deletarConta = () => (
        <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Deletar Conta"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Você irá deletar sua conta permanentemente. Isso siginifica que você
                    não terá mais acesso a plataforma. Tem certeza que deseja <strong>deletar</strong> sua conta?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonMat onClick={handleCloseDelete} color="primary">
                    Não
          </ButtonMat>
                <ButtonMat onClick={() => {
                    delCont();
                    handleCloseDelete();
                }} color="primary">
                    Sim
          </ButtonMat>
            </DialogActions>
        </Dialog>
    )


    return (
        <div className="mainContent">

            <h2>Configurações da conta</h2>

            <div className="mainConteudo">

                <div className="esquerdoContent">
                    <h3>Trocar Minha Senha</h3>
                    <form onSubmit={event => {
                        event.preventDefault();
                        atualizarSenha();
                    }}>
                        <div className="DivsForm">
                            <InputText
                                name="senhaVelha"
                                label="Senha Atual"
                                type="password"
                                placeholder="Digite sua senha atual"
                                onChange={e => {
                                    setSenhaAtual(e.target.value);
                                }}
                                value={senhaAtual}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="senhaNova"
                                label="Nova Senha"
                                type="password"
                                placeholder="Digite sua nova senha"
                                onChange={e => {
                                    setSenhaNova(e.target.value);
                                }}
                                value={senhaNova}
                            >
                            </InputText>
                        </div>
                        <div className="DivsForm">
                            <InputText
                                name="senhaConfirm"
                                label="Confirmar nova senha"
                                type="password"
                                placeholder="Digite novamente a senha"
                                onChange={e => {
                                    setSenhaConfirm(e.target.value);
                                }}
                                value={senhaConfirmSenha}
                                onBlur={validarSenha}

                            >
                            </InputText>
                        </div>

                        <Button className="botaoSenhaConfig" type="submit" value="Salvar nova senha" />
                    </form>
                </div>

                <div className="linha"></div>


                <div className="direitoContent">
                    <h3>Excluir conta</h3>
                    <p>Ao excluir a conta você perde acesso a plataforma. Se você deseja ficar inativo <br />
                momentaneamente, não mostrando o seu perfil às empresas, basta <br />
                modificar a visibilidade no seu dashboard.
                </p>
                    <Button className="button" type="button" value="Excluir conta" onClick={handleClickOpen} />
                </div>

            </div>
            <div className="BotaoSubmit">
                <Button className="submit" type="button" value="Voltar" onClick={() => history.goBack()} ></Button>
            </div>

            {deletarConta()}
            {alertSucesso()}
            {alertErro()}

        </div>

    )
}

export default Config;