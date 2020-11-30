import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../types';

export default function Perfil({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
        <View>
            <Text style={styles.texto}>Olá Mundo!</Text>
        </View>
    );
}

// Apenas teste
const styles = StyleSheet.create({
    texto: {
        color: 'black'
    },
})