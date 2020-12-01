import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  const [inscricao, setMyInscricao] = React.useState([]);
  const [estagios, setEstagios] = React.useState([]);
  const [role, setRole] = React.useState('');

  const [numList, setNum] = React.useState(0);


  React.useEffect(() => {
    decodeToken();
    getInscricao();
    getNumVagas();
    getEstagios();

  }, []);

  const getInscricao = async () => {
    try {
      const request = await fetch("http://192.168.0.2:8000/api/Usuario/Inscricao", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      if (response !== 'Usuario não possui inscrições.') {
        setMyInscricao(response);
      }

    } catch (error) {
      console.log("ta tudo bem")
    }
  }

  const getEstagios = async () => {
    try {
      const request = await fetch("http://192.168.0.2:8000/api/Estagio/AllInternship", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setEstagios(response);

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

  const wait = (timeout: any) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getInscricao();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getNumVagas = async () => {
    try {
      const request = await fetch("http://192.168.0.2:8000/api/Empresa/Vagas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setNum(response.length);


    } catch (error) {
      console.log("ta tudo bem")
    }
  }

  const UsuarioScreen = () => {

    return (
      <View>
        <Text style={styles.title}>Minhas Inscrições</Text>
        <View style={styles.separatorTitle} />


        {inscricao.length !== 0 ? inscricao.map((item: any) => {
          return (
            <TouchableOpacity key={item.id} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                <Text style={{ marginLeft: '1%', fontSize: 20, fontWeight: "bold" }}>{item.id}</Text>
                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                  <Text style={{ marginLeft: '10%' }}>{item.titulo.length <= 28 ? item.titulo : item.titulo.replace(item.titulo.substring(27, 1000), '...')}</Text>
                  <Text style={{ marginLeft: '10%' }}>{item.empresa}</Text>
                </View>
              </View>
              <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          );
        }) : <Text>Realize uma inscrição</Text>}

      </View>
    );
  }

  const EmpresaScreen = () => {
    return (
      <View>
        <Text style={styles.title}>Vagas</Text>
        <View style={styles.separatorTitle} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.titleVagaEmpresa}>{numList}</Text>
            <Text>Cadastradas</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.titleVagaEmpresa}>0</Text>
            <Text>Match</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.titleVagaEmpresa}>0</Text>
            <Text>Canceladas</Text>
          </View>
        </View>



      </View>
    );
  }

  const AdmScreen = () => {
    return (
      <View>
        <Text style={styles.title}>Estágios</Text>
        <View style={styles.separatorTitle} />


        {inscricao.length !== 0 ? inscricao.map((item: any) => {
          return (
            <TouchableOpacity key={item.id} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                <Text style={{ marginLeft: '1%', fontSize: 20, fontWeight: "bold" }}>{item.id}</Text>
                <View style={{ flexDirection: 'column', marginLeft: 5 }}>
                  <Text style={{ marginLeft: '10%' }}>{item.titulo.length <= 28 ? item.titulo : item.titulo.replace(item.titulo.substring(27, 1000), '...')}</Text>
                  <Text style={{ marginLeft: '10%' }}>{item.empresa}</Text>
                </View>
              </View>
              <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          );
        }) : <Text>Sem estágio vigente</Text>}

      </View>
    );
  }


  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {role === '1' ? UsuarioScreen() : role === '2' ? AdmScreen() : EmpresaScreen()}
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
  },
  titleVagaEmpresa: {
    color: '#DC3545',
    fontWeight: 'bold',
    fontSize: 40
  }
});
