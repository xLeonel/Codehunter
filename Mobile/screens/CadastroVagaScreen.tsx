import { View, Text } from '../components/Themed';
import * as React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

export default function CadastroVaga({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {


    const [uf, setUfs] = React.useState([]);

    interface Obejto {
        label: string,
        value: string
    }

    const arrayuf: Array<Obejto> = [];
    const [array, setArray] = React.useState(Array<Obejto>());

    const [titulo, setTitulo] = React.useState('');
    const [descricaoAtividades, setDA] = React.useState('');
    const [descricaoRequisisto, setDR] = React.useState('');
    const [localidade, setLocalidade] = React.useState('');
    const [remoto, setRemoto] = React.useState(false);
    const [idRemoto, setIdRemoto] = React.useState(0);
    const [dtValidade, setDtValidade] = React.useState('');
    const [areaAtuacao, setAreaAtuacao] = React.useState('');
    const [regimeContratacao, setRegimeContratacao] = React.useState('');
    const [salario, setSalario] = React.useState('');

    const [tags, setTags] = React.useState('');
    const [tagsBeneficios, setTagsBeneficio] = React.useState('');

    interface Tag {
        nome: string
    }

    const arrayTag: Array<Tag> = [];
    const arrayTagBenefico: Array<Tag> = [];
    const [arrayTagFormat, setArrayTag] = React.useState(Array<Tag>());
    const [arrayTagFormatBeneficio, setArrayTagBeneficio] = React.useState(Array<Tag>());

    const [count, setCount] = React.useState(1);


    React.useEffect(() => {
        const getUF = async () => {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(dados => {
                    setUfs(dados)
                })
                .then(() => {
                    uf.map((item: any) => {
                        arrayuf.push({ label: item.nome, value: item.nome })
                    })

                    setArray(arrayuf);
                })
                .catch(erro => console.error(erro))
        }

        getUF();
    }, [array]); //looping infite (?) but working

    const cadastrarVaga = async () => {

        const beneficiosFormat = []

        for (let index = 0; index < arrayTagFormatBeneficio.length; index++) {
            console.log(arrayTagFormatBeneficio[index].nome);

            let send = {
                NomeBeneficios: arrayTagFormatBeneficio[index].nome
            }
            beneficiosFormat.push(send)
        }

        const tecnologiasFormat = []

        for (let index = 0; index < arrayTagFormat.length; index++) {
            console.log(arrayTagFormat[index].nome);
            let send = {
                NomeTecnologia: arrayTagFormat[index].nome
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
            DataValidadeVaga: '2020-10-01',
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
            const url = "http://192.168.0.3:8000/api/Vaga"
            const request = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            Alert.alert(
                //title
                'Vaga',
                //body
                `${response}`,
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    const atualizarTagsTecnologia = () => {
        let tagsSemFormat = tags;

        let tagsSplitada = tagsSemFormat.split(' ');


        for (let index = 0; index < tagsSplitada.length; index++) {
            let body = { nome: tagsSplitada[index] }

            arrayTag.push(body)
        }

        setArrayTag(arrayTag);
    }

    const atualizarTagsBeneficios = () => {
        let tagsSemFormatBen = tagsBeneficios;

        let tagsSplitadaBen = tagsSemFormatBen.split(' ');


        for (let index = 0; index < tagsSplitadaBen.length; index++) {
            let body = { nome: tagsSplitadaBen[index] }

            arrayTagBenefico.push(body)
        }

        setArrayTagBeneficio(arrayTagBenefico);
    }

    const StepOne = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para iniciar o cadastro da vaga</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                placeholder='Digite o titulo da vaga'
                onChangeText={(t) => setTitulo(t)}
                value={titulo}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                numberOfLines={5}
                multiline={true}
                placeholder='Digite a atividade que desempenhará..'
                onChangeText={(t) => setDA(t)}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null
                }}
                value={descricaoAtividades}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                numberOfLines={5}
                multiline={true}
                placeholder='Digite os requisitos que deve possuir..'
                onChangeText={(t) => setDR(t)}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null
                }}
                value={descricaoRequisisto}
            />

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione a cidade da vaga',
                        value: null
                    }}
                    onValueChange={(value) => setLocalidade(value)}
                    items={array}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={localidade}

                />
            </View>

            <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count + 1)} >Próximo</Button>

            <View style={{ height: 85 }} />
        </>
    );

    const StepTwo = (
        <>

            <Text style={styles.title}>Informe os dados abaixo para continuar o cadastro da vaga</Text>
            <View style={styles.separatorTitle} />

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o tipo de trabalho',
                        value: null
                    }}
                    onValueChange={(value) => {
                        if (value === 1) {
                            setRemoto(true);
                        }
                        setIdRemoto(value);
                    }}
                    items={[
                        { label: 'Remoto ou presencial', value: 3 },
                        { label: 'Apenas presencial', value: 2 },
                        { label: 'Apenas remoto', value: 1 },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={idRemoto}
                />
            </View>

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione a área de atuação',
                        value: null
                    }}
                    onValueChange={(value) => setAreaAtuacao(value)}
                    items={[
                        { label: 'Back-end', value: 'Back-end' },
                        { label: 'Front-end', value: 'Front-end' },
                        { label: 'Redes', value: 'Redes' },
                        { label: 'Full-stack', value: 'Full-stack' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={areaAtuacao}
                />
            </View>

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o regime de contratação',
                        value: null
                    }}
                    onValueChange={(value) => setRegimeContratacao(value)}
                    items={[
                        { label: 'CLT', value: 'CLT' },
                        { label: 'PJ', value: 'PJ' },
                        { label: 'Estágio', value: 'Estágio' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={regimeContratacao}
                />
            </View>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                placeholder='Digite o salário'
                onChangeText={(t) => setSalario(t)}
                value={salario}
            />

            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => setCount(count + 1)} >Próximo</Button>
            </View>

            <View style={{ height: 85 }} />

        </>
    );

    const StepThree = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para finalizar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                placeholder='Digite as tecnologias'
                onChangeText={(e) => setTags(e)}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === ' ' || nativeEvent.key === 'Backspace' ? atualizarTagsTecnologia() : null
                }}
                value={tags}
            />
            <View style={{ flexDirection: 'row' }}>
                {arrayTagFormat.slice(0, 2).map((tec: any) => {
                    return (
                        <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={tec.nome}>{tec.nome}</Button>
                    );
                })}
            </View>

            <View style={{ flexDirection: 'row' }}>
                {arrayTagFormat.slice(2, 5).map((tec: any) => {
                    return (
                        <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={tec.nome}>{tec.nome}</Button>
                    );
                })}
            </View>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                placeholder='Digite os beneficios'
                onChangeText={(e) => setTagsBeneficio(e)}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === ' ' || nativeEvent.key === 'Backspace' ? atualizarTagsBeneficios() : null
                }}
                value={tagsBeneficios}
            />
            <View style={{ flexDirection: 'row' }}>
                {arrayTagFormatBeneficio.slice(0, 2).map((ben: any) => {
                    return (
                        <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={ben.nome}>{ben.nome}</Button>
                    );
                })}
            </View>

            <View style={{ flexDirection: 'row' }}>
                {arrayTagFormatBeneficio.slice(2, 5).map((ben: any) => {
                    return (
                        <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={ben.nome}>{ben.nome}</Button>
                    );
                })}
            </View>


            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => cadastrarVaga()} >Concluir</Button>
            </View>

            <View style={{ height: 85 }} />

        </>
    );


    return (
        <KeyboardAvoidingView
            style={styles.containerTeste}
            behavior="padding"
        >

            {count === 1 ? StepOne : count === 2 ? StepTwo : count === 3 ? StepThree : null}

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    containerTeste: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    separatorTitle: {
        backgroundColor: '#DC3545',
        height: 2.5,
        marginBottom: 10,
        marginTop: 3,
        width: '20%',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center",
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    separator: {
        height: 1,
        width: '100%',
    },

});

