import React, { useEffect, useState } from 'react';
import '../../../assets/style/reset.css';
// import './style.css'

import { Block, Edit, SearchOutlined, SettingsOutlined, Visibility } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem } from '@material-ui/core';
import dots from '../../../assets/images/dots.png'

function ADMUsuarios() {

    const [vagas, setVagas] = useState([]);
    const [numList, setNum] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [areaAtuacao, setAreaAtuacao] = useState('');
    const [cidade, setCidade] = useState('');
    const [empresa, setEmpresa] = useState('');


    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        fetch('http://localhost:5000/api/Vaga', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setVagas(dados);
                setNum(dados.length);

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
            <Divider style={{ marginTop: '8%' }} />
            <MenuItem onClick={handleClose}><Edit style={{ width: '20px', height: '20px', marginRight: '5%' }} />Editar Vaga</MenuItem>
            <MenuItem onClick={handleClose}><Block style={{ width: '20px', height: '20px', marginRight: '5%' }} />Suspender Vaga</MenuItem>
        </Menu>
    )

    const tamanhoIcon = {
        width: "20px",
        height: "20px"
    }

    const [openMore, setOpenMore] = React.useState(false);

    const handleClickOpen = () => {
        setOpenMore(true);
    };
    const handleCloseMore = () => {
        setOpenMore(false);
    };

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
                Empresa: {empresa} <br />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseMore} color="primary">
                        Fechar
                         </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    return (
        <div>
            <h2>Lista de Vagas</h2>
            <p>O total de vagas: {numList}</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%' }}>
                <div style={{ display: 'flex' }}>
                    <SearchOutlined style={tamanhoIcon} />
                    <SettingsOutlined style={tamanhoIcon} />
                </div>
            </div>

            <table width="100%" style={{ textAlign: "center" }}>
                <tr style={{ backgroundColor: "#E6E6E6" }}>
                    <th>Titulo</th>
                    <th>Area Atuação</th>
                    <th>Cidade</th>
                    <th>Empresa</th>
                    <th></th>
                </tr>
                {vagas.map((vaga: any, index) => {
                    return (
                        <tr key={index}>
                            <td>{vaga.titulo}</td>
                            <td>{vaga.areaAtuacaoVaga}</td>
                            <td>{vaga.localidade}</td>
                            <td>{vaga.empresa}</td>
                            <td><IconButton onClick={e => {
                                handleClick(e);
                                setTitulo(vaga.titulo);
                                setAreaAtuacao(vaga.areaAtuacaoVaga);
                                setCidade(vaga.localidade);
                                setEmpresa(vaga.empresa);
                            }}><img src={dots} alt="menu" width="20px" height="20px" /></IconButton></td>
                            {menu()}
                        </tr>
                    );
                })}
                {menuModal()}
                {/* </tr> */}
            </table>
        </div>
    );
}

export default ADMUsuarios;