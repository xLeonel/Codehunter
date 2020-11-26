import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View } from '../components/Themed';

export default function Configuracoes({
    navigation
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Configurações</Text>
        <View style={styles.separatorTitle}/> */}

            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('AlterarFotoPerfil')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                    <Ionicons name="md-images" size={30} color="black" />
                    <Text style={{ marginLeft: '10%' }}>Alterar Foto de Perfil</Text>
                </View>
                <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('AtualizarRedesSociais')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                    <Ionicons name="md-list" size={30} color="black" />
                    <Text style={{ marginLeft: '10%' }}>Atualizar informações</Text>
                </View>
                <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('AlterarSenha')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%', }}>
                    <Ionicons name="md-lock" size={30} color="black" />
                    <Text style={{ marginLeft: '10%' }}>Alterar senha</Text>
                </View>
                <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>


            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('ExcluirConta')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%', }}>
                    <Ionicons name="md-remove-circle" size={30} color="black" />
                    <Text style={{ marginLeft: '10%' }}>Excluir Conta</Text>
                </View>
                <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


            <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('Configuracoes')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5% 5%' }}>
                    <Ionicons name="md-information-circle" size={30} color="black" />
                    <Text style={{ marginLeft: '10%' }}>Sobre nós</Text>
                </View>
                <Ionicons style={{ margin: '5% 5%' }} name="md-arrow-forward" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        // paddingTop: 15
    },
    containerContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    textos: {
        flex: 1,
        fontSize: 17,
        fontStyle: "italic",
        justifyContent: "flex-start",
        marginLeft: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    // separator: {
    //     alignItems: 'center',
    //     backgroundColor: '#000',
    //     height: 1,
    //     marginBottom: 15,
    //     marginTop: 15,
    //     width: '100%'
    // },
    separator: {
        height: 1,
        width: '100%',
    },
    separatorTitle: {
        backgroundColor: '#DC3545',
        height: 2.5,
        marginBottom: 20,
        marginTop: 3,
        width: '15%'
    }
});