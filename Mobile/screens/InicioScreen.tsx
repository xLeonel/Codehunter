import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  const [inscricao, setMyInscricao] = React.useState([]);

  React.useEffect(() => {
    getInscricao();
  }, []);

  const getInscricao = async () => {
    try {
      const request = await fetch("http://192.168.0.3:8000/api/Login/Usuario", {
        method: "POST",
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

  const UsuarioScreen = () => {

    return (
      <View>
        <Text style={styles.title}>Minhas Inscrições</Text>

        {inscricao.map((item: any) => {
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
    );
  }


  return (
    <ScrollView style={styles.container}>
      {UsuarioScreen()}
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
});
