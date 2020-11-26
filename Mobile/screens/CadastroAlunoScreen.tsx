import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

import { RootStackParamList } from '../types';

export default function CadastroAluno({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text>Cadastro Aluno</Text>

            </View>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
