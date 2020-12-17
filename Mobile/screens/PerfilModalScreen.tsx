import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { RefreshControl, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RootStackParamList } from '../types';
import { View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { RouteProp, useRoute } from '@react-navigation/native';

export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    type ParamList = {
        Object: {
            idUser: number;
        };
    };

    const objeto = useRoute<RouteProp<ParamList, 'Object'>>();

    const [image, setImage] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [curso, setCurso] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefone, setTelefone] = React.useState('');

    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        getInfoUser();
    }, []);

    const getInfoUser = async () => {
        try {
            setLoading(true);
            const request = await fetch(`http://192.168.0.6:8000/api/Usuario/${objeto.params.idUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();
            console.log(response)

            setImage(response.foto);
            setNome(response.nomeCompleto);
            setCurso(response.curso);
            setEmail(response.email);
            setTelefone(response.celular);

            setLoading(false);

        } catch (error) {
            console.log("ERROR USUARIO")
            console.log(error)
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
                <Text style={{ fontSize: 19, fontStyle: "italic", marginLeft: 40 }}>{nome}</Text>
            </View>

            <View style={styles.separator} />

            <View style={{ alignItems: "flex-start", padding: 20, marginTop: 20 }}>
                <Text style={styles.titulo}>Curso</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{curso}</Text>

                <Text style={styles.titulo}>E-mail</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 40 }}>{email}</Text>

                <Text style={styles.titulo}>Telefone</Text>
                <Text style={{ fontSize: 19, fontStyle: "italic", marginBottom: 50 }}>{telefone}</Text>
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