import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-community/async-storage';

export default function AlterarFoto({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [image, setImage] = React.useState('');

    const [fotoBanco, setFotoBanco] = React.useState('');

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

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

            console.log(response.foto)
            console.log(response.nomeCompleto)

            let stringSplitada = response.foto.split(',')

            setImage(stringSplitada[1]);

        } catch (error) {
            console.log("ERROR")
            console.log(error)
        }
    }

    const atualizarUser = async () => {
        let body = {
            foto: `data:image/jpeg;base64,${image}`
        } 

        try {
            const request = await fetch("http://192.168.0.3:8000/api/Usuario", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                },
                body: JSON.stringify(body)
            })

            const response = await request.json();

            Alert.alert('Foto', `${response}`, [{ text: 'Ok' }])

        } catch (error) {
            console.log("ERROR")
            console.log(error)
            // Alert.alert("Vagas não encontrado!", "Tente novamente")
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {image === '' || fotoBanco === undefined ? <Avatar.Image size={150} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={150} source={{ uri: image }} />}
            </TouchableOpacity>

            {/* <Text style={{ marginTop: 15 }}>Toque na imagem parar selecionar uma nova</Text> */}

            <TouchableOpacity style={styles.link} onPress={() => atualizarUser()}>
                <Button mode="contained" color="#DC3545" >Salvar Foto</Button>
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
