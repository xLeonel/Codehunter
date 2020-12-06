import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../types';

export default function LoginAluno({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const login = async () => {
    const body = {
      email: email,
      senha: senha
    }

    try {
      const request = await fetch('http://192.168.0.3:8000/api/Login/Usuario', {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const response = await request.json();

      await AsyncStorage.setItem('token', response.token)

      navigation.replace('Voltar')

    } catch (error) {
      console.log("ERROR")
      console.log(error)
      Alert.alert("Aluno não encontrado!", "Tente novamente")
    }
  }

  return (
    <View style={styles.container}>

      <Image
        style={{ width: 186, height: 65, marginBottom: '15%' }}
        source={require('../assets/images/logo.png')}
      />

      <Text style={styles.title}>Entre com sua conta</Text>
      <TextInput
        style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%' }}
        onChangeText={text => setEmail(text)}
        placeholder='Email'
        textContentType='emailAddress'
      />

      <TextInput
        style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
        onChangeText={text => setSenha(text)}
        placeholder='Senha'
        textContentType='password'
        secureTextEntry={true}
      />

      <View style={{ marginTop: '10%', width: '50%', marginBottom: '10%' }}>
        <Button mode="contained" color="#DC3545" onPress={() => login()}>
          Entrar
      </Button>
      </View>

      <Text style={styles.label}>Esqueceu a senha?</Text>

      <Text style={styles.label}>Não possui uma conta? <Text style={{ fontWeight: "bold", color: 'blue' }} onPress={() => navigation.navigate('CadastroAluno')}>Cadastre-se</Text></Text>

    </View >
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
