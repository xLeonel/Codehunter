import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { RootStackParamList } from '../types';

export default function Splash({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  React.useEffect(() => {
    onRefresh();
  }, []);

  const wait = (timeout: any) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(3500).then(() => {
      setRefreshing(false);
      navigation.replace('TipoUsuario');
    });
  }, []);


  return (
    <View style={styles.container}>


      <Image
        style={{ width: 186, height: 65, marginBottom: '15%' }}
        source={require('../assets/images/logo.png')}

      />

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
});
