import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { StyleSheet, Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 

export default function Configuracoes({
    navigation
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>
        <View style={styles.separatorTitle}/>

        <View style={styles.container1}>
            <MaterialCommunityIcons name="account-circle-outline" size={40} color="black" />
            <Text style={styles.textos}>Alterar Foto de Perfil</Text>
            <AntDesign name="rightcircleo" size={25} color="black" />
        </View>

        <View style={styles.separator}/>

        <View style={styles.container2}>
            <Fontisto name="email" size={40} color="black" />
            <Text style={styles.textos}>Alterar Email</Text>
            <AntDesign name="rightcircleo" size={25} color="black" />
        </View>

        <View style={styles.separator}/>

        <View style={styles.container3}>
            <MaterialCommunityIcons name="lock-outline" size={40} color="black" />
            <Text style={styles.textos}>Alterar Senha</Text>
            <AntDesign name="rightcircleo" size={25} color="black" />
        </View>

        <View style={styles.separator}/>

        <View style={styles.container4}>
            <SimpleLineIcons name="info" size={40} color="black" />
            <Text style={styles.textos}>Sobre Nós</Text>
            <AntDesign name="rightcircleo" size={25} color="black" />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
        paddingTop: 70
    },
    container1: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    container2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    container3: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    container4: {
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
    separator: {
        alignItems: 'center',
        backgroundColor: '#000',
        height: 1,
        marginBottom: 15,
        marginTop: 15,
        width: '100%'
    },
    separatorTitle: {
        backgroundColor: '#DC3545',
        height: 2.5,
        marginBottom: 20,
        marginTop: 3,
        width: '15%'
    }
});