import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';

import { Button } from 'react-native-paper';
import { RootStackParamList } from '../types';
import Spinner from 'react-native-loading-spinner-overlay';

export default function CadastroEmpresa({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmSenha, setSenhaConfirm] = React.useState('');
    const [nomeFantasia, setNomeFantasia] = React.useState('');
    const [razaoSocial, setRazaoSocial] = React.useState('');
    const [numColaboradores, setNumColaboradores] = React.useState(0);
    const [cnpj, setCnpj] = React.useState('');
    const [nomeRepresentante, setNomeRepresentante] = React.useState('');
    const [celular, setCelular] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [areaAtuacao, setAreaAtuacao] = React.useState('');

    //Endereco
    const [cep, setCep] = React.useState('');
    const [rua, setRua] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [localidade, setLocalidade] = React.useState('');
    const [uf, setUf] = React.useState('');
    const [numero, setNumero] = React.useState('');

    const [count, setCount] = React.useState(1);

    const [loading, setLoading] = React.useState(false);

    const GetCep = async () => {
        try {
            setLoading(true);

            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                }
            })

            const response = await request.json();

            setCep(response.cep);
            setRua(response.logradouro);
            setBairro(response.bairro);
            setLocalidade(response.localidade)
            setUf(response.uf)

            setLoading(false);


        } catch (error) {
            console.log("ERROR")
            console.log(error)
        }
    }


    const StepOne = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para iniciar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                placeholder='Digite seu email corporativo'
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite seu senha'
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Confirme sua senha'
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite seu telefone de contato'
            />

            <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count + 1)} >Próximo</Button>

            <View style={{ height: 85 }} />
        </>
    );



    const StepTwo = (
        <>

            <Text style={styles.title}>Informe os dados abaixo para iniciar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                placeholder='Digite o CNPJ'
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite a Razão Social da empresa'
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o Nome Fantasia da empresa'
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite a área de atuação da empresa'
            />

            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => setCount(count + 1)} >Próximo</Button>
            </View>

            <View style={{ height: 85 }} />

        </>

    );

    const StepThree = (

        <>
            <Text style={styles.title}>Informe os dados abaixo para iniciar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                placeholder='Digite o seu nome'
            />

            <TextInput
                style={{ height: 60, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='O que a empresa procura em um profissional..'
                multiline={true}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null
                }}
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o número de coloboradores'
            />


            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => setCount(count + 1)} >Próximo</Button>
            </View>

            <View style={{ height: 85 }} />

        </>

    );

    const StepFour = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para finalizar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <Spinner
                visible={loading}
                textContent={'Procurando cep...'}
                textStyle={{ color: '#fff' }}
                // color='#DC3545'
            />

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TextInput
                    style={{ height: 45, width: '35%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                    placeholder='Digite o CEP'
                    onChangeText={text => setCep(text)}
                    onBlur={() => GetCep()}
                    value={cep}
                />

                <TextInput
                    style={{ height: 45, width: '40%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%', marginLeft: '5%' }}
                    placeholder='Digite o bairro'
                    value={bairro}
                />
            </View>


            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={{ height: 45, width: '35%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                    placeholder='Digite a cidade'
                    value={localidade}

                />
                <TextInput
                    style={{ height: 45, width: '40%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%', marginLeft: '5%' }}
                    placeholder='Digite o estado'
                    value={uf}

                />
            </View>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o endereço'
                value={rua}

            />

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={{ height: 45, width: '35%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                    placeholder='Digite o número'
                />
                <TextInput
                    style={{ height: 45, width: '40%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%', marginLeft: '5%' }}
                    placeholder='Digite o complemento'
                />
            </View>



            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} >Concluir</Button>
            </View>

            <View style={{ height: 85 }} />

        </>

    );


    return (
        <KeyboardAvoidingView
            style={styles.containerTeste}
            behavior="padding"
        >

            {count === 1 ? StepOne : count === 2 ? StepTwo : count === 3 ? StepThree : StepFour}

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center",
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10
    },
    separatorTitle: {
        backgroundColor: '#DC3545',
        height: 2.5,
        marginBottom: 10,
        marginTop: 3,
        width: '20%',
    },
    containerTeste: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});
