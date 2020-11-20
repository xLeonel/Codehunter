import React, { useEffect, useState } from 'react';
import '../../../assets/style/reset.css';
// import './style.css'

import { Block, Edit, SearchOutlined, SettingsOutlined, Visibility } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem } from '@material-ui/core';
import dots from '../../../assets/images/dots.png'
import moment from 'moment';

function ADMUsuarios() {

    const [estagios, setEstagios] = useState([]);
    const [numList, setNum] = useState(0);
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [endereco, setEndereco] = useState('');
    const [contato, setContato] = useState('');
    const [inicioContrato, setInicioContrato] = useState('');
    const [fimPrevisto, setSetFimPrevisto] = useState('');
    const [efetivo, setEfetivo] = useState('');
    const [status, setStatus] = useState('');
    const [diasContrato, setDiasContrato] = useState('');
    const [ultimaVisita, setUltimaVisita] = useState('');
    const [proximaVisita, setProxVisita] = useState('');


    useEffect(() => {
        listar();
    }, []);

    const listar = () => {
        fetch('http://localhost:5000/api/Estagio/AllInternship', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setEstagios(dados);
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
            <MenuItem onClick={handleClose}><Edit style={{ width: '20px', height: '20px', marginRight: '5%' }} />Editar Estágio</MenuItem>
            <MenuItem onClick={handleClose}><Block style={{ width: '20px', height: '20px', marginRight: '5%' }} />Suspender Estágio</MenuItem>
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
                    Nome: {nome} <br />
                    Curso: {curso} <br />
                    Empresa: {empresa} <br />
                    Responsável: {responsavel} <br />
                    Endereco: {endereco} <br />
                    Contato: {contato} <br />
                  Inicio Contrato: {inicioContrato} <br />
                  Termino Previsto: {fimPrevisto} <br />
                  Efetivo: {efetivo} <br />
                  Status: {status} <br />
                  Dias de Contrato: {diasContrato} <br />
                  Última Visita: {ultimaVisita} <br />
                  Próxima visita {proximaVisita}
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
            <h2>Lista de Estágios</h2>
            <p>O total de estágios: {numList}</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%' }}>
                <div style={{ display: 'flex' }}>
                    <SearchOutlined style={tamanhoIcon} />
                    <SettingsOutlined style={tamanhoIcon} />
                </div>
            </div>

            <table width="100%" style={{ textAlign: "center" }}>
                <tr style={{ backgroundColor: "#E6E6E6" }}>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Contato</th>
                    <th>Situação</th>
                    <th></th>
                </tr>
                {estagios.map((estagio: any, index) => {
                    return (
                        <tr key={index}>
                            <td>{estagio.idInscricaoNavigation.idUsuarioNavigation.nomeCompleto}</td>
                            <td>{estagio.idInscricaoNavigation.idVagaNavigation.idEmpresaNavigation.nomeFantasia}</td>
                            <td>{estagio.idInscricaoNavigation.idVagaNavigation.idEmpresaNavigation.idAcessoNavigation.email}</td>
                            <td>{estagio.idContratoNavigation.idStatusContratoNavigation.statusContrato1}</td>
                            <td><IconButton onClick={e => {
                                handleClick(e);
                                setNome(estagio.idInscricaoNavigation.idUsuarioNavigation.nomeCompleto);
                                setCurso(estagio.idInscricaoNavigation.idUsuarioNavigation.curso);
                                setEmpresa(estagio.idInscricaoNavigation.idVagaNavigation.idEmpresaNavigation.nomeFantasia);
                                setResponsavel('');
                                setEndereco(estagio.idInscricaoNavigation.idVagaNavigation.idEmpresaNavigation.idEnderecoNavigation.logradouro);
                                setContato(estagio.idInscricaoNavigation.idVagaNavigation.idEmpresaNavigation.idAcessoNavigation.email);
                                setStatus(estagio.idContratoNavigation.idStatusContratoNavigation.statusContrato1);

                                let dataInicio = estagio.idContratoNavigation.inicio;
                                let dataFormatada = dataInicio.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
                                setInicioContrato(dataFormatada);

                                dataInicio = estagio.idContratoNavigation.previsto;
                                dataFormatada = dataInicio.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
                                setSetFimPrevisto(dataFormatada);

                                dataInicio = estagio.idContratoNavigation.efetivado;
                                dataFormatada = dataInicio.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
                                setEfetivo(dataFormatada);

                                let now = moment(new Date());
                                let past = moment(estagio.idContratoNavigation.inicio);
                                let duration = moment.duration(now.diff(past));
                                let days = duration.asDays().toString();
                                let getDias = days.split('.');

                                setDiasContrato(getDias[0]);

                                let currentDate = moment(estagio.idContratoNavigation.inicio);
                                let futureMonth = moment(currentDate).add(6, 'M');
                                let futureMonthEnd = moment(futureMonth).endOf('month');

                                if (currentDate.date() !== futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
                                    futureMonth = futureMonth.add(1, 'd');
                                }
                                setProxVisita(futureMonth.format('DD/MM/YYYY'));

                                //NAO ESTA FUNCIONANDO CORRETAMENTE
                                let SpecialToDate = moment(estagio.idContratoNavigation.inicio);

                                let SpecialTo = moment(SpecialToDate, "DD/MM/YYYY");

                                if (moment() > SpecialTo) {
                                    setUltimaVisita(futureMonth.format('DD/MM/YYYY'));
                                }
                                else {
                                    setUltimaVisita(futureMonth.format(''));
                                }
                                //NAO ESTA FUNCIONANDO CORRETAMENTE



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