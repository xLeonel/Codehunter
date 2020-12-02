import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RootStackParamList } from '../types';
import { View } from '../components/Themed';


export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [image, setImage] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [curso, setCurso] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

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
            setNome(response.nome);
            setCurso(response.curso);
            setEmail(response.email);
            setSenha(response.senha);

        } catch (error) {
            console.log("ERROR")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ padding: 20, flexDirection: "row", alignItems: "center"}} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                {image === '' || image === undefined ? <Avatar.Image size={100} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={100} source={{ uri: 'data:image/jpeg;base64,' + image }} />} 
                <Text style={{ fontSize: 19, fontStyle: "italic", marginLeft: 50 }}>{nome}</Text>
            </View>

            <View style={styles.separator}/>

            <View style={{ alignItems: "flex-start", padding: 20, marginTop: 20 }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" >
                <Text style={styles.titulo}>Nome</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{nome}</Text>

                <Text style={styles.titulo}>Curso</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{curso}</Text>

                <Text style={styles.titulo}>E-mail</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{email}</Text>

                <Text style={styles.titulo}>Senha</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 50 }}>{senha}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titulo: {
        color: '#757272'
    },
    separator: {
        height: 1,
        width: '100%',
    }
});