import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dashboard({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  const sair = async () => {
    // if (role === '1' || role === '2') {
    //   await AsyncStorage.removeItem('token');
    //   navigation.replace('Login')
    // }
    // else if (role === '3') {
    //   await AsyncStorage.removeItem('token');
    //   navigation.replace('LoginEmpresa')
    // }

    await AsyncStorage.removeItem('token');
    navigation.replace('TipoUsuario');
  }

  React.useEffect(() => {
    decodeToken();
    getInfoUser();
  }, []);

  const [name, setName] = React.useState('');

  const [image, setImage] = React.useState('');



  const decodeToken = async () => {
    var token = await AsyncStorage.getItem('token');

    var jwtDecode = require('jwt-decode');

    var tokenDecoded = jwtDecode(token);

    setName(tokenDecoded.Name);
  }

  const getInfoUser = async () => {
    try {
      const request = await fetch("http://192.168.0.6:8000/api/Usuario", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setImage(response.foto);

    } catch (error) {
      console.log("ERROR Aluno")
      console.log(error)
    }

    try {
      const request = await fetch("http://192.168.0.6:8000/api/Empresa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setImage(response.foto);

    } catch (error) {
      console.log("ERROR Empresa")
      console.log(error)
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
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>

          {image === '' || image === undefined ? <Avatar.Image size={90} source={require('../assets/images/fotoUser.jpg')} /> : <Avatar.Image size={90} source={{ uri: 'data:image/jpeg;base64,' + image }} />}
          <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: '15%', marginTop: '5%' }}>Olá, {name}</Text>

          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('Perfil')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '5%' }}>
              <Ionicons name="md-people" size={30} color="black" />
              <Text style={{ marginLeft: '10%' }}>Perfil</Text>
            </View>
            <Ionicons style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '5%' }} name="md-arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('Configuracoes')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '5%' }}>
              <Ionicons name="md-settings" size={30} color="black" />
              <Text style={{ marginLeft: '10%' }}>Configurações</Text>
            </View>
            <Ionicons style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%', marginRight: '5%' }} name="md-arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Button mode="contained" color="#DC3545" style={{ marginTop: '20%', width: '50%' }} onPress={() => sair()}>Sair</Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
  },
});
