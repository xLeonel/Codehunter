import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../types';

export default function Login({
  navigation
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <View style={styles.container}>
      {/* <Image
        style={{ width: 186, height: 65, marginBottom: '15%' }}
        source={require('../assets/images/logo.png')}
      /> */}
      <Text style={styles.title}>Bem-Vindo!</Text>

      <Image
        style={{ width: 260, height: 180, marginBottom: '15%' }}
        source={require('../assets/images/TipoUsuario.png')}
      />

      <Text style={{ fontSize: 18 }}>Vamos lá.</Text>
      <Text style={{ fontSize: 18, marginBottom: '12%' }}>Você é Aluno ou uma Empresa?</Text>

      <View style={styles.container2}>
        <View style={{ width: '40%' }}>
          <Button mode="contained" color="#DC3545" onPress={() => navigation.replace('Login')}>
            <Text style={styles.linkText}>Aluno</Text>
          </Button>
        </View>

        <View style={{ marginLeft: '5%', width: '40%' }}>
          <Button mode="contained" color="#DC3545" onPress={() => navigation.replace('LoginEmpresa')}>
            <Text style={styles.linkText}>Empresa</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container2: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '15%',
  },
  // title2: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  linkText: {
    fontSize: 14,
    color: '#fff',
  },
});
