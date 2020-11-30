import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import SplashScreeen from '../screens/SplashScreen';
import Inscricoes from '../screens/InscricoesScreen';
import VagasFound from '../screens/VagasFound';
import CadastroVaga from '../screens/CadastroVagaScreen';
import CadastroAluno from '../screens/CadastroAlunoScreen';
import CadastroEmpresa from '../screens/CadastroEmpresaScreen';
import LoginScreen from '../screens/LoginScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LoginEmpresaScreen from '../screens/LoginEmpresaScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import ExcluirContaScreen from '../screens/ExcluirContaScreen';
import AlterarSenhaScreen from '../screens/AlterarSenhaScreen';
import RedesSociaisScreen from '../screens/RedesSociaisScreen';
import AlterarFotoPerfilScreen from '../screens/AlterarFotoScreen';
import TipoUsuarioScreen from '../screens/TipoUsuarioScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreeen} options={{ title: 'Splash' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="LoginEmpresa" component={LoginEmpresaScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil', headerShown: true }} />
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ headerTitle: 'Configurações', headerShown: true }} />
      <Stack.Screen name="ExcluirConta" component={ExcluirContaScreen} options={{ headerTitle: 'Excluir Conta', headerShown: true }} />
      <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} options={{ headerTitle: 'Alterar Senha', headerShown: true }} />
      <Stack.Screen name="AtualizarRedesSociais" component={RedesSociaisScreen} options={{ headerTitle: 'Atualizar Informações', headerShown: true }} />
      <Stack.Screen name="AlterarFotoPerfil" component={AlterarFotoPerfilScreen} options={{ headerTitle: 'Alterar Foto Perfil', headerShown: true }} />
      <Stack.Screen name="TipoUsuario" component={TipoUsuarioScreen} options={{ title: 'Tipo Usuario' }} />
      <Stack.Screen name="Inscricoes" component={Inscricoes} options={{ title: 'Inscricao', headerTitle: 'Inscricao', headerShown: true }} />
      <Stack.Screen name="VagasFound" component={VagasFound} options={{ title: 'Vagas Match', headerTitle: 'Vagas Match', headerShown: true }} />
      <Stack.Screen name="CadastroVaga" component={CadastroVaga} options={{ title: 'Cadastro Vaga', headerTitle: 'Cadastrar Vaga', headerShown: true }} />
      <Stack.Screen name="CadastroAluno" component={CadastroAluno} options={{ title: 'Cadastro Aluno', headerTitle: 'Cadastrar Aluno', headerShown: true }} />
      <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} options={{ title: 'Cadastro Empresa', headerTitle: 'Cadastrar Empresa', headerShown: true }} />
      <Stack.Screen name="Voltar" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
