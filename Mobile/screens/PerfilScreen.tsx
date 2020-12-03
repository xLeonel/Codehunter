import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { RefreshControl, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RootStackParamList } from '../types';
import { View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [image, setImage] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [curso, setCurso] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const [empresa, setBool] = React.useState(false);

    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        getInfoUser();
    }, []);

    const getInfoUser = async () => {
        try {
            setLoading(true);
            const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setImage(response.foto);
            setNome(response.nomeCompleto);
            setCurso(response.curso);
            setEmail(response.idAcessoNavigation.email);
            setSenha(response.idAcessoNavigation.senha);
            setBool(false);

            setLoading(false);

        } catch (error) {
            console.log("ERROR USUARIO")
            console.log(error)
            setBool(false);
            setLoading(false);

        }

        try {
            setLoading(true);
            const request = await fetch("http://192.168.0.3:8000/api/Empresa", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setBool(true);
            setLoading(false);

            setImage(response.foto);
            setNome(response.razaoSocial);
            setCurso(response.nomeRepresentante);
            setEmail(response.idAcessoNavigation.email);
            setSenha(response.idAcessoNavigation.senha);

        } catch (error) {
            console.log("ERROR Empresa")
            console.log(error)
            setBool(false);
            setLoading(false);


        }
    }

    const wait = (timeout: any) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        getInfoUser();

        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

            <Spinner
                visible={loading}
                textContent={'Carregando...'}
                textStyle={{ color: '#fff' }}
            // color='#DC3545'
            />

            <View style={{ padding: 20, flexDirection: "row", alignItems: "center" }}>
                {image === '' || image === undefined ? <Avatar.Image size={100} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={100} source={{ uri: 'data:image/jpeg;base64,' + image }} />}
                <Text style={{ fontSize: 19, fontStyle: "italic", marginLeft: 50 }}>{nome}</Text>
            </View>

            <View style={styles.separator} />

            <View style={{ alignItems: "flex-start", padding: 20, marginTop: 20 }}>
                <Text style={styles.titulo}>{empresa === true ? 'Nome Representante' : 'Curso'}</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{curso}</Text>

                <Text style={styles.titulo}>E-mail</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{email}</Text>

                <Text style={styles.titulo}>Senha</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 50 }}>{senha}</Text>
            </View>
        </ScrollView>
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