import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import { RootStackParamList } from '../types';

export default function AlterarSenha({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [senhaBanco, setSenhaBanco] = React.useState('');
    const [senhaAtual, setSenhaAtual] = React.useState('');
    const [novaSenha, setNovaSenha] = React.useState('');
    const [confirmSenha, setConfirmSenha] = React.useState('');
    React.useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setSenhaBanco(response.idAcessoNavigation.senha);
           
        } catch (error) {
            console.log("erro aluno")
            console.log(error)
        }

        try {
            const request = await fetch("http://192.168.0.3:8000/api/Empresa", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setSenhaBanco(response.idAcessoNavigation.senha);
           
        } catch (error) {
            console.log("erro empresa")
            console.log(error)
        }
    }

    const validarSenha = () => {
        if (novaSenha !== confirmSenha) {
            Alert.alert('As senhas devem ser iguais.')
        }
    }


    const attUser = async () => {
        if (senhaAtual === senhaBanco) {
            let formUp = {
                IdAcessoNavigation: {
                    Senha: novaSenha,
                }
            }

            try {
                const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                    },
                    body: JSON.stringify(formUp),

                })

                const response = await request.json();

                Alert.alert('Senha', `${response}`, [{ text: 'Ok', onPress: () => navigation.goBack() }])


            } catch (error) {
                console.log("erro aluno")
                console.log(error)
            }

            try {
                const request = await fetch("http://192.168.0.3:8000/api/Empresa", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                    },
                    body: JSON.stringify(formUp),

                })

                const response = await request.json();

                Alert.alert('Senha', `${response}`, [{ text: 'Ok', onPress: () => navigation.goBack() }])


            } catch (error) {
                console.log("erro empresa")
                console.log(error)
            }
        }
        else {
            Alert.alert('Senha atual está incorreta')
        }

    }

    return (
        <View style={styles.container}>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
                onChangeText={text => setSenhaAtual(text)}
                placeholder='Digite sua senha atual'
                textContentType='password'
                secureTextEntry={true}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setNovaSenha(text)}
                placeholder='Digite a nova senha'
                textContentType='password'
                secureTextEntry={true}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setConfirmSenha(text)}
                placeholder='Confirme a nova senha'
                textContentType='password'
                secureTextEntry={true}
                onBlur={validarSenha}
            />
            <TouchableOpacity onPress={() => attUser()} style={styles.link}>
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
