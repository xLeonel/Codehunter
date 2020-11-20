import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import SplashScreeen from '../screens/SplashScreen';
import Inscricoes from '../screens/InscricoesScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginEmpresaScreen from '../screens/LoginEmpresaScreen';
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
      <Stack.Screen name="TipoUsuario" component={TipoUsuarioScreen} options={{ title: 'Tipo Usuario' }} />
      <Stack.Screen name="Inscricoes" component={Inscricoes} options={{ title: 'Inscricao', headerTitle: 'Inscricao', headerShown: true }} />
      <Stack.Screen name="Voltar" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
