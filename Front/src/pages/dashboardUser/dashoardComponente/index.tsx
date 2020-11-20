import React, { useEffect, useState } from 'react';
import '../../../assets/style/reset.css';
import './style.css'

import D from '../../../assets/images/d.png';
import I from '../../../assets/images/i.png';
import S from '../../../assets/images/s.png';
import C from '../../../assets/images/c.png';
import PersoUndefined from '../../../assets/images/persoUndefined.png';
import { SearchOutlined, SettingsOutlined, Visibility } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@material-ui/core';
import dots from '../../../assets/images/dots.png'


function MenuEmpresa() {

    const [personalidade, setPersonalidade] = useState('');
    const [count, setCount] = useState(0);
    const [inscricao, setInscricao] = useState([]);
    const [msg, setMSG] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [areaAtuacao, setAreaAtuacao] = useState('');
    const [cidade, setCidade] = useState('');
    const [salario, setSalario] = useState('');

    useEffect(() => {
        listar();
        listarInscricao();
    }, []);

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
                setPersonalidade(dados.nomePersonalidade);

            })
            .catch(erro => console.error(erro))
    }

    const listarInscricao = () => {
        fetch('http://localhost:5000/api/Usuario/Inscricao', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                if (dados === 'Usuario não possui inscrições.') {
                    setMSG(true);
                }
                else {
                    setInscricao(dados);
                    setCount(dados.length);
                    setMSG(false);

                }

            })
            .catch(erro => console.error(erro))
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openMore, setOpenMore] = React.useState(false);


    const handleClickOpen = () => {
        setOpenMore(true);
    };
    const handleCloseMore = () => {
        setOpenMore(false);
    };



    const menu = () => (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={() => {
                handleClickOpen();
                handleClose();
            }}
            ><Visibility style={{ width: '20px', height: '20px', marginRight: '5%' }} />Mais Informações</MenuItem>
        </Menu>
    )

    const tamanhoIcon = {
        width: "20px",
        height: "20px"
    }

    const menuModal = () => (
        <div>
            <Dialog onClose={handleCloseMore} aria-labelledby="customized-dialog-title" open={openMore}>
                <DialogTitle id="customized-dialog-title">
                    Mais Informações
                     </DialogTitle>
                <DialogContent dividers>
                    Titulo: {titulo} <br />
                Area Atuação: {areaAtuacao} <br />
                Cidade: {cidade} <br />
                Salário: {salario} <br />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseMore} color="primary">
                        Fechar
                         </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    function listarInscricoes(){
        console.log(inscricao)
        if(msg === true){
            return (
                <div>

                </div>
            )
        } else {
            return (
                inscricao.map((inscricao: any) => {
                    return (
                        <tr>
                            <td>{inscricao.titulo}</td>
                            <td>{inscricao.areaAtuacao}</td>
                            <td>{inscricao.localidade}</td>
                            <td>R$ {inscricao.salario}</td>
                            <td><IconButton onClick={e => {
                                handleClick(e);
                                setTitulo(inscricao.titulo);
                                setAreaAtuacao(inscricao.areaAtuacao);
                                setCidade(inscricao.localidade);
                                setSalario(inscricao.salario);
                            }}><img src={dots} alt="menu" width="20px" height="20px" /></IconButton></td>
                            {menu()}
                        </tr>
                    );
                })
            )
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <h3>Como se canditar</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas soluta, <br />
                hic porro ipsum voluptatem sunt eos quia ab inventore minima necessitatibus <br />
                assumenda fugit veritatis officiis dolorum aliquam velit repellat.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas soluta, <br />
                hic porro ipsum voluptatem sunt eos quia ab inventore minima necessitatibus <br />
                assumenda fugit veritatis officiis dolorum aliquam velit repellat.</p>


                </div>

                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                    <h3>Personalidade</h3>
                    {personalidade === 'Dominante' ? <img src={D} alt="personalidae" width="124px" height="124px" /> : personalidade === 'Influente' ? <img src={I} alt="personalidae" width="124px" height="124px" /> : personalidade === 'Estável' ? <img src={S} alt="personalidae" width="124px" height="124px" /> : personalidade === 'Conforme' ? <img src={C} alt="personalidae" width="124px" height="124px" /> : <img src={PersoUndefined} alt="personalidae" width="124px" height="124px" />}
                    <p>{personalidade === "" || personalidade === null || personalidade === undefined ? <p>Faça seu teste de personalidade</p> : personalidade}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Resultado: {count}</p>
                <div style={{ display: 'flex' }}>
                    <SearchOutlined style={tamanhoIcon} />
                    <SettingsOutlined style={tamanhoIcon} />
                </div>
            </div>

            <table width="100%" style={{ textAlign: "center" }}>
                <tr style={{ backgroundColor: "#E6E6E6" }}>
                    <th>Ttitulo</th>
                    <th>Area Atuação</th>
                    <th>Cidade</th>
                    <th>Empresa</th>
                    <th>Situação</th>
                    <th></th>
                </tr>
                {listarInscricoes()}
                {menuModal()}

            </table>
        </div>
    );
}

export default MenuEmpresa;