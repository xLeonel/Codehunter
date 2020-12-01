import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import NavBar from '../../components/navbar';
import Footer from '../../components/Footer';
import Input from '../../components/InputText';
import Button from '../../components/Button';

import '../../assets/style/reset.css'
import './style.css';
import placeImg from '../../assets/images/img_placeIcon.png';
import salaryImg from '../../assets/images/img_moneyIcon.png';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

function Vagas() {
    const classes = useStyles();

    const [vagas, setVagas] = React.useState([{}]);
    const [tecnologias, setTecnologias] = React.useState([{}]);

    const [searchTerm, setSearchTerm] = React.useState("");
    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPage(1)
        setSearchTerm(event.target.value);
    };
    const [citySearch, setCitySearch] = React.useState('Selecione')

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        ListarVagas();
        ListarTech();
    }, []);

    const ListarVagas = () => {
        fetch('http://localhost:5000/api/Vaga', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setVagas(dados);
            })
            .catch(erro => console.error(erro))
    }

    const ListarTech = () => {
        fetch('http://localhost:5000/api/Tecnologia', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setTecnologias(dados);
            })
            .catch(erro => console.error(erro))
    }

    function chunkArray(myArray: any, chunk_size: any, type: any) {
        if (type === 1) {
            var index = 0;
            var arrayLength = myArray.length;
            var tempArray: any = [];

            for (index = 0; index < arrayLength; index += chunk_size) {
                var myChunk = myArray.slice(index, index + chunk_size);
                tempArray.push(myChunk);
            }

            return tempArray.length;
        } else {
            index = 0;
            arrayLength = myArray.length;
            tempArray = [];

            for (index = 0; index < arrayLength; index += chunk_size) {
                myChunk = myArray.slice(index, index + chunk_size);
                tempArray.push(myChunk);
            }

            return tempArray;
        }
    }

    function mapIndex(position: any, type: number) {
        let indexPosition = chunkArray(vagas, 4, 0)
        let techPosition = chunkArray(tecnologias, 2, 0)
        
        if(citySearch === "Selecione" || citySearch === undefined || citySearch === null){
            if (searchTerm === null || searchTerm === "") {
                if (type === 0) {
                    if (indexPosition === null || indexPosition === undefined || indexPosition.length === 0) {
                        return (
                            <div>
                            </div>
                        )
                    } else {
                    return (
                        indexPosition[position].map((vaga: any) => {
                            return (
                                <div className="vaga">
                                    <p className="areaAtuacao">{vaga.areaAtuacaoVaga}</p>
                                    <h3>{vaga.titulo}</h3>
                                    <div className="basicInfo">
                                        <div className="local">
                                            <img src={placeImg} alt="" />
                                            <p>{vaga.localidade}</p>
                                        </div>
                                        <div className="salary">
                                            <img src={salaryImg} alt="" />
                                            <p>R$ {vaga.salario}</p>
                                        </div>
                                    </div>
                                    <p className="description">{vaga.descricaoRequisitos}</p>
                                    {mapIndex(position, 1)}
                                    <Link to={`/vaga/${vaga.idVaga}`}><Button className="button" type="button" value="Mais Detalhes" /></Link>
                                </div>
                            )
                        })
                    )}
                } else {
                    return (
                        <div className="tecnology">
                            {techPosition.forEach((tecnologia: any) => {
                                return (
                                    tecnologia.map((tech: any) => {
                                        return (
                                            <Button className="buttonT" type="submit" value={tech.nomeTecnologia} />
                                        )
                                    })
                                )
                            }
                            )}
                        </div>
                    )
                }
            } else {
                return (
                    Search(searchTerm, position, type, vagas)
                )
            }
        } else {
            if (searchTerm === null || searchTerm === "") {
                if (type === 0) {
                    if (indexPosition === null || indexPosition === undefined || indexPosition.length === 0) {
                        return (
                            <div>
                            </div>
                        )
                    } else {
                        let newFilter = cityFilter(vagas)
                        let newIndexPosition = chunkArray(newFilter, 4, 0)
                    return (
                        newIndexPosition[position].map((vaga: any) => {
                            return (
                                <div className="vaga">
                                    <p className="areaAtuacao">{vaga.areaAtuacaoVaga}</p>
                                    <h3>{vaga.titulo}</h3>
                                    <div className="basicInfo">
                                        <div className="local">
                                            <img src={placeImg} alt="" />
                                            <p>{vaga.localidade}</p>
                                        </div>
                                        <div className="salary">
                                            <img src={salaryImg} alt="" />
                                            <p>R$ {vaga.salario}</p>
                                        </div>
                                    </div>
                                    <p className="description">{vaga.descricaoRequisitos}</p>
                                    {mapIndex(position, 1)}
                                    <Link to={`/vaga/${vaga.idVaga}`}><Button className="button" type="button" value="Mais Detalhes" /></Link>
                                </div>
                            )
                        })
                    )}
                } else {
                    return (
                        <div className="tecnology">
                            {techPosition.forEach((tecnologia: any) => {
                                return (
                                    tecnologia.map((tech: any) => {
                                        return (
                                            <Button className="buttonT" type="submit" value={tech.nomeTecnologia} />
                                        )
                                    })
                                )
                            }
                            )}
                        </div>
                    )
                }
            } else {
                let newFilter = cityFilter(vagas)
                return (
                    Search(searchTerm, position, type, newFilter)
                )
            }
        }
    }

    function Search(searchTerm: string | null, position: any, type: number, array:any[]) {
        let techPosition = chunkArray(tecnologias, 2, 0)
        let filteredArray = Filter(array)
        if (type === 0) {
            if (filteredArray === null || filteredArray === undefined || filteredArray.length === 0) {
                return (
                    <div>
                    </div>
                )
            } else {
                let indexPosition = chunkArray(filteredArray, 4, 0)
                return (
                    indexPosition[position].map((vaga: any) => {
                        return (
                            <div className="vaga">
                                <p className="areaAtuacao">{vaga.areaAtuacaoVaga}</p>
                                <h3>{vaga.titulo}</h3>
                                <div className="basicInfo">
                                    <div className="local">
                                        <img src={placeImg} alt="" />
                                        <p>{vaga.localidade}</p>
                                    </div>
                                    <div className="salary">
                                        <img src={salaryImg} alt="" />
                                        <p>R$ {vaga.salario}</p>
                                    </div>
                                </div>
                                <p className="description">{vaga.descricaoRequisitos}</p>
                                <div className="tecnology">
                                    {Search(searchTerm, position + 1, 1, array)}
                                </div>
                                <Link to={`/vaga/${vaga.idVaga}`}><Button className="button" type="button" value="Mais Detalhes" /></Link>
                            </div>
                        )
                    })
                )
            }
        } else {
            return (
                <div className="tecnology">
                    {techPosition.forEach((tecnologia: any) => {
                        return (
                            tecnologia.map((tech: { nomeTecnologia: any; }) => {
                                return (
                                    <Button className="buttonT" type="submit" value={tech.nomeTecnologia} />
                                )
                            })
                        )
                    }
                    )}
                </div>
            )
        }
    }

    function Filter(array: any[]) {
        return array.filter(item => item.titulo.toLowerCase().includes(searchTerm?.toLowerCase()))
    }

    function numeroVagas(searchTerm: string | null) {
        if(citySearch === 'Selecione'){
            if (searchTerm === null || searchTerm === "") {
                if(vagas.length === 0 || vagas.length === undefined || vagas.length === null){
                    return (
                        <h3 className="qtdVagas">Nenhuma vaga cadastrada no momento...</h3>
                    )
                } else{
                    return (
                        <h3 className="qtdVagas">Encontramos {vagas.length} vagas para <br /> desenvolvedor</h3>
                    )
                }
            } else {
                let filteredArray = Filter(vagas);
                if (filteredArray.length > 0) {
                    return (
                        <h3 className="qtdVagas">Encontramos {filteredArray.length} vagas para <br /> desenvolvedor</h3>
                    )
                } else {
                    return (
                        <h3 className="qtdVagas">Nenhuma vaga encontrada...</h3>
                    )
                }
            }
        } else {
            let newFilter = cityFilter(vagas)
            if (searchTerm === null || searchTerm === "") {
                if(newFilter.length === 0 || newFilter.length === undefined || newFilter.length === null){
                    return (
                        <h3 className="qtdVagas">Nenhuma vaga cadastrada no momento...</h3>
                    )
                } else {
                    return (
                        <h3 className="qtdVagas">Encontramos {newFilter.length} vagas para <br /> desenvolvedor</h3>
                    )
                }
            } else {
                let filteredArray = Filter(newFilter);
                if (filteredArray.length > 0) {
                    return (
                        <h3 className="qtdVagas">Encontramos {filteredArray.length} vagas para <br /> desenvolvedor</h3>
                    )
                } else {
                    return (
                        <h3 className="qtdVagas">Nenhuma vaga encontrada...</h3>
                    )
                }
            }
        }
    }

    function Paginations(searchTerm: string | null) {
        if(citySearch === 'Selecione'){
            if (searchTerm === null || searchTerm === "") {
                return (
                    <div className="pages">
                        <div className={classes.root}>
                            <Pagination count={chunkArray(vagas, 4, 1)} shape="rounded" page={page} onChange={handleChange} />
                        </div>
                    </div>
                )
            } else {
                let filteredArray = Filter(vagas)
                return (
                    <div className="pages">
                        <div className={classes.root}>
                            <Pagination count={chunkArray(filteredArray, 4, 1)} shape="rounded" page={page} onChange={handleChange} />
                        </div>
                    </div>
                )
            }
        } else {
            let newFilter = cityFilter(vagas)
            if (searchTerm === null || searchTerm === "") {
                return (
                    <div className="pages">
                        <div className={classes.root}>
                            <Pagination count={chunkArray(newFilter, 4, 1)} shape="rounded" page={page} onChange={handleChange} />
                        </div>
                    </div>
                )
            } else {
                let filteredArray = Filter(newFilter)
                return (
                    <div className="pages">
                        <div className={classes.root}>
                            <Pagination count={chunkArray(filteredArray, 4, 1)} shape="rounded" page={page} onChange={handleChange} />
                        </div>
                    </div>
                )
            }
        }
    }

    function cityFilter(array: any[]){
        return array.filter(item => item.localidade.includes(citySearch))
    }

    function selectCityFilter(array: any) {
        let tags: any
        tags = array.map((item: any) => item.localidade)
        return tags.filter((item: any, idx: any) => tags.indexOf(item) === idx)
    }

    const vagasPage = () => {
        let locais = selectCityFilter(vagas)
        return (
            <div>
                <div>
                    <NavBar />
                    <div>
                        <div className="pesquisa">
                            <h1>Vagas</h1>
                            <div className="inputsPesquisa">
                                <select name="cidades" className="cidades" onChange={e => setCitySearch(e.target.value)}>
                                    <option value="Selecione" selected >Selecione</option>
                                    {locais.map((local: any) => {
                                        return (
                                            <option value={local}>{local}</option>
                                        )
                                    })}
                                </select>
                                <Input placeholder="Pesquise vagas pela tecnologia desejada..." type="text" label="" value={searchTerm} onChange={handleSearch} />
                            </div>
                        </div>
                        {numeroVagas(searchTerm)}
                        {mapIndex(page - 1, 0)}
                        {Paginations(searchTerm)}
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
    return (
        vagasPage()
    );
}

export default Vagas;