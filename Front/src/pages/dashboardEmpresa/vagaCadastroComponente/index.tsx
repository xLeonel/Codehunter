import React, { useState } from 'react';
import './style.css';

import InputText from '../../../components/InputText';

import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import moment from 'moment';

function VagasCadastro() {

    const [tecnologiasTags, setTecnologiaTags] = useState(Object);
    const [beneficiosTags, setBeneficiosTags] = useState(Object);
    const [titulo, setTitulo] = useState('');
    const [descricaoAtividades, setDA] = useState('');
    const [descricaoRequisisto, setDR] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [remoto, setRemoto] = useState(Boolean);
    const [idRemoto, setIdRemoto] = useState(0);
    const [dtValidade, setDtValidade] = useState('');
    const [areaAtuacao, setAreaAtuacao] = useState('');
    const [regimeContratacao, setRegimeContratacao] = useState('');
    const [salario, setSalario] = useState('');


    const cadastroVaga = async () => {

        const beneficiosFormat = []

        for (let index = 0; index < beneficiosTags.length; index++) {
            console.log(beneficiosTags[index].title);

            let send = {
                NomeBeneficios: beneficiosTags[index].title
            }
            beneficiosFormat.push(send)
        }

        const tecnologiasFormat = []

        for (let index = 0; index < tecnologiasTags.length; index++) {
            console.log(tecnologiasTags[index].title);
            let send = {
                NomeTecnologia: tecnologiasTags[index].title
            }
            tecnologiasFormat.push(send)
        }


        const body = {
            Titulo: titulo,
            DescricaoAtividades: descricaoAtividades,
            DescricaoRequisitos: descricaoRequisisto,
            Localidade: localidade,
            VagaRemota: remoto,
            DataPostada: moment(new Date()),
            DataValidadeVaga: dtValidade,
            IdAreaAtuacaoNavigation: {
                NomeAreaAtuacao: areaAtuacao
            },
            IdRemoto: idRemoto,
            IdRegimeContratacaoNavigation: {
                NomeRegimeContratacao: regimeContratacao,
                ExpectativaSalario: salario
            },
            Beneficios: beneficiosFormat,
            Tecnologia: tecnologiasFormat
        }

        try {
            const url = "http://localhost:5000/api/Vaga"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            if (response === 'Erro ao cadastrar vaga') {
                alert(response);
            }
            else {
                alert(response);
                window.location.reload();
            }

        } catch (error) {
            throw new Error(error)
        }
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


    return (
        <div>
            <section style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1%' }}>Cadastro de Vaga</h2>
                <p>Informe os dados abaixo para iniciar o cadastro da vaga</p>
            </section>

            <form onSubmit={event => {
                event.preventDefault();
                cadastroVaga();
            }}>
                <InputText
                    name="titulo"
                    label="Titulo"
                    type="text"
                    placeholder="Digite o titulo da vaga"
                    onChange={e => setTitulo(e.target.value)}
                >
                </InputText>

                <div style={{ width: '100%' }}>
                    <label className='label-edit'>Descrição das Atividades</label>
                    <textarea onChange={e => setDA(e.target.value)} style={{ resize: "vertical", width: '100%', padding: '1%', marginTop: '8px' }} rows={2} className="texteareaCadastro" name="descricaoAtividades" form="form" placeholder="Digite a atividade que o profissional desempenhará.."></textarea>
                </div>

                <div style={{ width: '100%' }}>
                    <label className='label-edit'>Descrição dos Requisitos</label>
                    <textarea onChange={e => setDR(e.target.value)} style={{ resize: "vertical", width: '100%', padding: '1%', marginTop: '8px' }} rows={2} className="texteareaCadastro" name="descricaoRequisitos" form="form" placeholder="Digite os requisitos que o profissional deve possuir.."></textarea>
                </div>

                <InputText
                    name="localidade"
                    label="Localidade"
                    type="text"
                    placeholder="Digite a localização da empresa"
                    onChange={e => setLocalidade(e.target.value)}
                >
                </InputText>

                <div>
                    <label className='label-edit'>Trabalho remoto</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="radio" id="remotoPresencial" onChange={e => { setRemoto(false); setIdRemoto(3) }} name="trabalhoRemoto" value="remotoPresencial" />
                        <label htmlFor='remotoPresencial' style={{ margin: '0 10px' }}>Remoto ou presencial</label>
                        <input type="radio" id="presencial" onChange={e => { setRemoto(false); setIdRemoto(2) }} name="trabalhoRemoto" value="presencial" />
                        <label htmlFor='presencial' style={{ margin: '0 10px' }} >Apenas presencial</label>
                        <input type="radio" id="remoto" onChange={e => { setRemoto(true); setIdRemoto(1) }} name="trabalhoRemoto" value="remoto" />
                        <label htmlFor='remoto' style={{ margin: '0 10px' }}>Apenas remoto</label>
                    </div>
                </div>

                <div style={{ margin: '10px 0' }}>
                    <TextField
                        id="dtValidade"
                        label="Data de Validade"
                        type="date"
                        defaultValue=''
                        onChange={e => setDtValidade(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div style={{ margin: '10px 0' }}>
                    <label htmlFor="areaAtuacao" className='label-edit'>Área de Atuação</label> <br />
                    <select onChange={e => setAreaAtuacao(e.target.value)} className="select-box" name="areaAtuacao" id="areaAtuacao" style={{ margin: '10px 0' }}>
                        <option disabled selected>Selecione uma opção</option>
                        <option value="Back-end">Back-end</option>
                        <option value="Front-end">Front-end</option>
                        <option value="Redes">Redes</option>
                        <option value="Full-stack">Full-stack</option>
                    </select>
                </div>

                <div style={{ margin: '10px 0' }}>
                    <label htmlFor="regimeContratacao" className='label-edit'>Regime de Contratação</label> <br />
                    <select onChange={e => setRegimeContratacao(e.target.value)} className="select-box" name="regimeContratacao" id="regimeContratacao" style={{ margin: '10px 0' }}>
                        <option disabled selected>Selecione uma opção</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Estágio">Estágio</option>
                    </select>
                </div>

                <InputText
                    name="salario"
                    label="Sálario"
                    type="text"
                    placeholder="Digite o salário"
                    onChange={e => setSalario(e.target.value)}
                >
                </InputText>

                <Autocomplete
                    style={{ margin: '20px 0 ' }}
                    multiple
                    id="tags-outlined"
                    options={tecnologias}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    onChange={(event, newValue) => setTecnologiaTags(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Tecnologias"
                            placeholder="Escolha as tecnologias"
                        />
                    )}
                />

                <Autocomplete
                    style={{ margin: '20px 0' }}
                    multiple
                    id="tags-outlined"
                    options={beneficios}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    onChange={(event, newValue) => setBeneficiosTags(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Benefícios"
                            placeholder="Escolha os beneficios"
                        />
                    )}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                    <button className="submitCadastroVaga" type="submit" value="Cadastrar">Cadastrar</button>
                </div>

            </form>


        </div>
    );
}

const tecnologias = [
    { title: 'C#' },
    { title: 'Angular' },
    { title: 'Vue.js' },
    { title: 'Java' },
    { title: 'Flutter' },
    { title: 'JavaScript' },
    { title: 'Python' },
    { title: 'PHP' },
    { title: 'C++' },
    { title: 'Ruby' },
    { title: 'CSS' },
    { title: 'TypeScript' },
    { title: 'C' },
    { title: 'PowerShell' },
    { title: 'Shell' },
    { title: 'Perl' },
    { title: 'Kotlin' },
    { title: 'Oracle 12c' },
    { title: 'MySQL' },
    { title: 'SQL Server' },
    { title: 'PostgreSQL' },
    { title: 'MongoDB' },
    { title: 'MariaDB' },
    { title: 'DB2' },
    { title: 'SAP HANA' },
    { title: 'Scrum' },
    { title: 'Kanban' },
];

const beneficios = [
    { title: 'Vale-refeição' },
    { title: 'Vale-alimentação' },
    { title: 'Gympass' },
    { title: 'Assistência médica' },
    { title: 'Plano Odontológico' },
    { title: 'Vale-cultura' },
    { title: 'Férias' },
    { title: 'Auxílio-creche' },
    { title: 'Bolsas de estudo' },
    { title: 'Horório flexível' },
    { title: 'Home Office' },
];

export default VagasCadastro;