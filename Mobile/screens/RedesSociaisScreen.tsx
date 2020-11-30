import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import { RootStackParamList } from '../types';

export default function RedesSociaisScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [linkedin, setLinkedin] = React.useState('');
    const [github, setGitHub] = React.useState('');
    const [stackOverflow, setStackOverflow] = React.useState('');
    const [sitePessoal, setSitePessoal] = React.useState('');
    const [nivelIngles, setNivelIngles] = React.useState('');
    const [situacaoProfissional, setSitProfissional] = React.useState('');
    const [idRemoto, setRemoto] = React.useState(0);

    React.useEffect(() => {
        listar();
    }, []);

    const listar = async () => {
        try {
            const request = await fetch("http://192.168.0.2:8000/api/Usuario", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            // setTelefone(dados.celular);

            setLinkedin(response.idPreferenciasTrabalhoNavigation.linkedin);
            setGitHub(response.idPreferenciasTrabalhoNavigation.github);
            setStackOverflow(response.idPreferenciasTrabalhoNavigation.stackOverflow);
            setSitePessoal(response.idPreferenciasTrabalhoNavigation.sitePessoal);
            setNivelIngles(response.idPreferenciasTrabalhoNavigation.nivelIngles);
            setSitProfissional(response.idPreferenciasTrabalhoNavigation.situacaoProfissional);
            setRemoto(response.idPreferenciasTrabalhoNavigation.idRemoto);

        } catch (error) {
            console.log("erro aluno")
            console.log(error)
        }

        try {
            const request = await fetch("http://192.168.0.2:8000/api/Empresa", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            // setTelefone(dados.celular);

            setLinkedin(response.nomeFantasia);
            setGitHub(response.nomeRepresentante);
            setStackOverflow(`${response.numColaboradores}`);
            setSitePessoal(response.descricao);

        } catch (error) {
            console.log("erro empresa")
            console.log(error)
        }
    }

    const atualizarUser = async () => {
        let formSemFoto = {
            // celular: telefone,
            IdPreferenciasTrabalhoNavigation: {
                Linkedin: linkedin,
                Github: github,
                StackOverflow: stackOverflow,
                SitePessoal: sitePessoal,
                NivelIngles: nivelIngles,
                SituacaoProfissional: situacaoProfissional,
                IdRemoto: idRemoto,
            }
        }

        try {
            const request = await fetch("http://192.168.0.2:8000/api/Usuario", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                },
                body: JSON.stringify(formSemFoto)
            })

            const response = await request.json();

            // setTelefone(dados.celular);

            Alert.alert('Atualização', `${response}`, [{ text: 'Ok', onPress: () => navigation.goBack() }]);

        } catch (error) {
            console.log("erro aluno")
            console.log(error)
        }

        let formEmpresa = {
            // celular: telefone,
            nomeFantasia: linkedin,
            nomeRepresentante: github,
            numColaboradores: stackOverflow,
            descricao: sitePessoal
            // foto: fotoSetada,            
        }

        try {
            const request = await fetch("http://192.168.0.2:8000/api/Empresa", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                },
                body: JSON.stringify(formEmpresa)
            })

            const response = await request.json();

            // setTelefone(dados.celular);

            Alert.alert('Atualização', `${response}`, [{ text: 'Ok', onPress: () => navigation.goBack() }]);

        } catch (error) {
            console.log("erro empresa")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                onChangeText={text => setLinkedin(text)}
                value={linkedin}
                placeholder={linkedin === '' ? 'digite seu linkedin' : linkedin}

            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setGitHub(text)}
                value={github}
                placeholder={github === '' ? 'digite seu github' : github}


            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setStackOverflow(text)}
                value={stackOverflow}
                placeholder={stackOverflow === '' ? 'digite seu stack overflow' : stackOverflow}


            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setSitePessoal(text)}
                value={sitePessoal}
                placeholder={sitePessoal === '' ? 'digite seu site' : sitePessoal}

            />
            <TouchableOpacity onPress={() => atualizarUser()} style={styles.link}>
                <Button mode="contained" color="#DC3545" >Salvar</Button>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
