import React, { useState } from 'react';
import '../../assets/style/reset.css'
import './style.css';
import InputText from '../../components/InputText'
import logo from '../../assets/images/logoSenaiRed.png';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ButtonMat from '@material-ui/core/Button';


import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginUser() {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [open, setOpen] = React.useState(false);

    const [openAlertaSucesso, setAlertSucesso] = React.useState(false);
    const [openErro, setErroOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSucesso(false);
        setErroOpen(false);
    };

    const alertSucesso = () => (
        <Snackbar open={openAlertaSucesso} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseAlert} severity="success">
                Enviado com sucesso !
        </Alert>
        </Snackbar >
    )

    const alertErro = () => (
        <Snackbar open={openErro} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseAlert} severity="error">
                Falha ao enviar, tente novamente.
        </Alert>
        </Snackbar>
    )

    const recSenha = async () => {
        const body = {
            email: email,
        }

        try {
            const url = "http://localhost:5000/api/Usuario/RecuperarSenha"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            if (response === 'Erro ao enviar o email') {
                setErroOpen(true);
            }
            else {
                setAlertSucesso(true);
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    const recuperarSenha = () => (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Recuperar Senha</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para recuperar sua senha, por favor digite seu email cadastrado. Enviaremos
                    atualizações ocasionalmente.
          </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <ButtonMat onClick={handleClose} color="primary">
                    Cancelar
          </ButtonMat>
                <ButtonMat onClick={() => {
                    recSenha();
                    handleClose();
                }} color="primary">
                    Enviar
          </ButtonMat>
            </DialogActions>
        </Dialog>
    )

    const login = async () => {
        // const login = {
        //     email: email,
        //     senha: senha
        // }

        // fetch('http://localhost:5000/api/Login/Usuario', {
        //     method: 'POST',
        //     body: JSON.stringify(login),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(dados => {

        //         if (dados.token !== undefined) {
        //             localStorage.setItem('token', dados.token)
        //             history.push('/');
        //         } else {
        //             alert('Senha ou email inválidos')
        //         }

        //     })
        //     .catch(erro => console.error(erro))

        const login = {
            email: email,
            senha: senha
        }

        try {
            const url = "http://localhost:5000/api/Login/Usuario"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
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

                    history.push('/');
                }

            }

        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div className="mainContentLogin">

            <div className="divImgLogin">
                <Link to='/'><img src={logo} alt="logo home" /></Link>
            </div>

            <div className="linha"></div>

            <div className="ladoDireitoLogin">
                <h2>Entre com sua conta</h2>
                <form onSubmit={event => {
                    event.preventDefault();
                    login();
                }}>
                    <div className="DivsFormLogin">
                        <InputText
                            name="email"
                            label="Email"
                            type="text"
                            placeholder="Digite seu email"
                            onChange={e => setEmail(e.target.value)}
                        >
                        </InputText>
                    </div>

                    <div className="DivsFormLogin">
                        <InputText
                            name="senha"
                            label="Senha"
                            type="password"
                            placeholder="*******"
                            onChange={e => setSenha(e.target.value)}
                        >
                        </InputText>
                    </div>
                    <div className="subtitleLogin">
                        <div className="subtitleLoginCheck">
                            <input type="checkbox" id="keepLogin" name="keepLogin" value="true" />
                            <p>Mantenha-me conectado</p>
                        </div>
                        <p className="SenhaPointer" onClick={handleClickOpen}>Esqueci a senha</p>
                    </div>
                    <Button className="submitLogin" type="submit" value="Entrar" />
                </form>

                <section style={{ display: 'flex', justifyContent: 'flex-end', width:'125%' }}>
                    <p style={{marginRight: '2%'}}>Não tem uma conta?</p>
                    <Link to='/cadastrar/usuario' className="link"><p style={{ color: 'red'}}>Registre-se</p></Link>
                </section>
            </div>

            {recuperarSenha()}

            {alertSucesso()}
            {alertErro()}

        </div>

    );
}

export default LoginUser;