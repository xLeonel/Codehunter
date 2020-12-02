import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';

import { RootStackParamList } from '../types';

export default function EscluirConta({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const deletarConta = async () => {
        try {
            const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            if (response !== 'Erro ao deletar.') {
                await AsyncStorage.removeItem('token');
                navigation.replace('TipoUsuario');
                Alert.alert(response)
            }
            else {
                Alert.alert(response)
            }

        } catch (error) {
            console.log("erro aluno")
            console.log(error)
        }

        try {
            const request = await fetch("http://192.168.0.3:8000/api/Empresa", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            if (response !== 'Erro ao deletar') {
                await AsyncStorage.removeItem('token');
                navigation.replace('TipoUsuario');
                Alert.alert(response)
            }
            else {
                Alert.alert(response)
            }

        } catch (error) {
            console.log("erro empresa")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam facilis fugit aliquid doloribus nisi, corrupti temporibus saepe omnis aliquam tenetur necessitatibus laudantium iusto praesentium, voluptatem recusandae dicta asperiores ullam sapiente.</Text>

            <TouchableOpacity style={styles.link}>
                <Button mode="contained" color="#DC3545" onPress={() => Alert.alert('Deletar Conta', `n tem volta`, [{ text: 'Sim', onPress: () => deletarConta() }, { text: 'Cancelar', onPress: () => console.log('fechar') }])}>Excluir Conta</Button>
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
