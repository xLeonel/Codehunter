
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';


export default function Inscricoes() {

    type ParamList = {
        Object: {
            idVaga: number;
        };
    };

    const objeto = useRoute<RouteProp<ParamList, 'Object'>>();

    React.useEffect(() => {
        listar();
    }, []);

    const [inscricoes, setInscricoes] = React.useState([]);

    const listar = async () => {

        try {
            const request = await fetch(`http://192.168.0.2:8000/api/Inscricao/UserByInscricoes/${objeto.params.idVaga}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setInscricoes(response);

        } catch (error) {
            console.log("ERROR")
            console.log(error)
            Alert.alert("Inscricoes não encontrado!", "Tente novamente")
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                {inscricoes.map((item: any) => {
                    return (
                        <TouchableOpacity key={item.idKey} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                                <Text style={{ marginLeft: '1%', fontSize: 20, fontWeight: "bold" }}>{item.idKey}</Text>
                                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                                    <Text style={{ marginLeft: '10%' }}>{item.nome}</Text>
                                    <Text style={{ marginLeft: '10%' }}>{item.email}</Text>
                                </View>
                            </View>
                            <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
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
    separator: {
        height: 1,
        width: '100%',
    },
});


