import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';

export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
        <View style={styles.container}>
            
            <View style={{ alignItems: "flex-start", padding: 20}}>
                <Text style={styles.titulo}>Nome</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40}}>Nome do Usuário</Text>

                <Text style={styles.titulo}>Curso</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40}}>Desenvolvimento de Sistemas</Text>

                <Text style={styles.titulo}>E-mail</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40}}>usuario.senai@gmail.com</Text>

                <Text style={styles.titulo}>Senha</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 50}}>******</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titulo: {
        color: '#757272'
    },
    separator: {
        height: 1,
        width: '100%'
    }
});