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
            const request = await fetch("http://192.168.0.2:8000/api/Usuario", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setImage(response.foto);

        } catch (error) {
            console.log("ERROR")
            console.log(error)
        }
    }

    const atualizarUser = async () => {

        let body = {
            foto: image
        }

        try {
            const request = await fetch("http://192.168.0.2:8000/api/Usuario", {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            Alert.alert('Foto', `${response}`, [{ text: 'Ok', onPress: () => navigation.goBack() }])

        } catch (error) {
            console.log("ERROR")
            console.log(error)
            // Alert.alert("Vagas não encontrado!", "Tente novamente")
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            if (result.base64 !== undefined) {
                setImage(result.base64);
            }

        }

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {image === '' || image === undefined ? <Avatar.Image size={150} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={150} source={{ uri: 'data:image/jpeg;base64,' + image }} />}
               

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
