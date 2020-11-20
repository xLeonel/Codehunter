import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import InicioScreen from '../screens/InicioScreen';
import VagaScreen from '../screens/VagasScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { BottomTabParamList, DashboardParamList, RootStackParamList, TabOneParamList, TabTwoParamList } from '../types';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Início"
      tabBarOptions={{ activeTintColor: '#DC3545' }}>
      <BottomTab.Screen
        name="Início"
        component={TabInicioNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Vagas"
        component={TabVagaNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-briefcase" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person" color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabInicioStack = createStackNavigator<TabOneParamList>();

function TabInicioNavigator() {
  return (
    <TabInicioStack.Navigator>
      <TabInicioStack.Screen
        name="InicioScreen"
        component={InicioScreen}
        options={{ headerTitle: 'Início' }}
      />
    </TabInicioStack.Navigator>
  );
}

const TabVagaStack = createStackNavigator<TabTwoParamList>();


function TabVagaNavigator({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>) {
  React.useEffect(() => {

    const decodeToken = async () => {
      var token = await AsyncStorage.getItem('token');

      var jwtDecode = require('jwt-decode');

      var tokenDecoded = jwtDecode(token);

      setRole(tokenDecoded.Role);
    }

    // Execute the created function directly
    decodeToken();

  }, []);

  const [role, setRole] = React.useState('');


  return (
    <TabVagaStack.Navigator>
      <TabVagaStack.Screen
        name="VagaScreen"
        component={VagaScreen}
        options={{
          headerTitle: 'Vagas', headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CadastroVaga')}>{role === '3' ? <Ionicons name="md-add-circle-outline" size={30} style={{ marginRight: 10 }} color="black" /> : null}</TouchableOpacity>
          )
        }}
      />
    </TabVagaStack.Navigator>
  );
}

const TabDashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
  return (
    <TabDashboardStack.Navigator>
      <TabDashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </TabDashboardStack.Navigator>
  );
}

