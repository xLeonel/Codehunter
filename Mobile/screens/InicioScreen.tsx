import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  const [inscricao, setMyInscricao] = React.useState([]);
  const [role, setRole] = React.useState('');


  React.useEffect(() => {
    decodeToken();
    getInscricao();
  }, []);

  const getInscricao = async () => {
    try {
      const request = await fetch("http://192.168.0.3:8000/api/Usuario/Inscricao", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setMyInscricao(response);


    } catch (error) {
      console.log("ta tudo bem")
    }
  }


  const decodeToken = async () => {
    var token = await AsyncStorage.getItem('token');

    var jwtDecode = require('jwt-decode');

    var tokenDecoded = jwtDecode(token);

    setRole(tokenDecoded.Role);
  }

  const UsuarioScreen = () => {

    return (
      <View>
        <Text style={styles.title}>Minhas Inscrições</Text>
        <View style={styles.separatorTitle} />


        {inscricao.map((item: any) => {
          return (
            <TouchableOpacity key={item.id} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                <Text style={{ marginLeft: '1%', fontSize: 20, fontWeight: "bold" }}>{item.id}</Text>
                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                  <Text style={{ marginLeft: '10%' }}>{item.titulo.length === 28 ? item.titulo : item.titulo.replace(item.titulo.substring(27, 1000), '...')}</Text>
                  <Text style={{ marginLeft: '10%' }}>{item.empresa}</Text>
                </View>
              </View>
              <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          );
        })}

      </View>
    );
  }

  const EmpresaScreen = () => {
    return (
      <Text>Company</Text>
    );
  }


  return (
    <ScrollView style={styles.container}>
      {role === '1' || role === '2' ? UsuarioScreen() : EmpresaScreen()}
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
    paddingTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  separatorTitle: {
    backgroundColor: '#DC3545',
    height: 2.5,
    marginBottom: 20,
    marginTop: 3,
    width: '15%'
  }
});
