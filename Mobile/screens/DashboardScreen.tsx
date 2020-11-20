import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
  }, []);

  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');


  const decodeToken = async () => {
    var token = await AsyncStorage.getItem('token');

    var jwtDecode = require('jwt-decode');

    var tokenDecoded = jwtDecode(token);

    setName(tokenDecoded.Name);
    setRole(tokenDecoded.Role);

  }

  return (
    <View style={styles.container}>

      <Avatar.Image size={90} source={require('../assets/images/fotoUser.jpg')} />
      <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: '20%', marginTop: '5%' }}>Olá, {name}</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
          <Ionicons name="md-people" size={30} color="black" />
          <Text style={{ marginLeft: '10%' }}>Perfil</Text>
        </View>
        <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
          <Ionicons name="md-settings" size={30} color="black" />
          <Text style={{ marginLeft: '10%' }}>Configurações</Text>
        </View>
        <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


      <Button mode="contained" color="#DC3545" style={{ marginTop: '20%', width: '50%' }} onPress={() => sair()}>Sair</Button>

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
