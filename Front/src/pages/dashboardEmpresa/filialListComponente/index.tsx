import React, { useEffect, useState } from 'react';
import '../../../assets/style/reset.css';
// import './style.css'

import { Block, Edit, SearchOutlined, SettingsOutlined, Visibility } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem } from '@material-ui/core';
import dots from '../../../assets/images/dots.png'

function ADMUsuarios() {

    const [empresas, setEmpresas] = useState([]);
    const [numTotalFilial, setNumTotal] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [email, setEmail] = useState('');
    const [matriz, setMatriz] = useState('');
    const [numVagas, setNumVagas] = useState(0);


    useEffect(() => {
        listarFilial()
    }, []);

    const listarFilial = () => {
        fetch('http://localhost:5000/api/Empresa/Filial', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setEmpresas(dados);
                setNumTotal(dados.length);
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
            <MenuItem onClick={handleClose}><Edit style={{ width: '20px', height: '20px', marginRight: '5%' }} />Editar Usuario</MenuItem>
            <MenuItem onClick={handleClose}><Block style={{ width: '20px', height: '20px', marginRight: '5%' }} />Suspender Usuario</MenuItem>
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
                Representante: {nomeFantasia} <br />
                    Email: {email} <br />
                    Cidade: {matriz} <br />
                    Núm Vagas: {numVagas} <br />
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
            <h2>Lista de Filiais</h2>
            <p>O total de filial: {numTotalFilial}</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%' }}>
                <div style={{ display: 'flex' }}>
                    <SearchOutlined style={tamanhoIcon} />
                    <SettingsOutlined style={tamanhoIcon} />
                </div>
            </div>

            <table width="100%" style={{ textAlign: "center" }}>
                <tr style={{ backgroundColor: "#E6E6E6" }}>
                    <th>Representante</th>
                    <th>Email</th>
                    <th>Cidade</th>
                    <th>Núm Vagas</th>
                    <th></th>
                </tr>
                {empresas.map((empresa: any, index) => {
                    return (
                        <tr key={index}>
                            <td>{empresa.nomeRepresentante}</td>
                            <td>{empresa.email}</td>
                            <td>{empresa.logradouro}</td>
                            <td>{empresa.numVagas}</td>
                            <td><IconButton onClick={e => {
                                handleClick(e);
                                setNomeFantasia(empresa.nomeRepresentante);
                                setEmail(empresa.email);
                                setMatriz(empresa.logradouro);
                                setNumVagas(empresa.numVagas);
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