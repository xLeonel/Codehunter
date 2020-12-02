import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RootStackParamList } from '../types';

export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [image, setImage] = React.useState('');
    const [curso, setCurso] = React.useState('');

    React.useEffect(() => {
        getInfoUser();
    }, []);

    const getInfoUser = async () => {
        try {
            const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setImage(response.foto);
            setCurso(response.curso);

        } catch (error) {
            console.log("ERROR")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ alignItems: "flex-start", padding: 20 }}>

                {image === '' || image === undefined ? <Avatar.Image size={90} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={90} source={{ uri: 'data:image/jpeg;base64,' + image }} />}

                <Text style={styles.titulo}>Nome</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>Nome do Usuário</Text>

                <Text style={styles.titulo}>Curso</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{curso}</Text>

                <Text style={styles.titulo}>E-mail</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>usuario.senai@gmail.com</Text>

                <Text style={styles.titulo}>Senha</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 50 }}>******</Text>
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
        width: '100%',
        color: '#000'
    }
});