import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../types';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroAluno({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

    const [count, setCount] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    //user
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmSenha, setSenhaConfirm] = React.useState('');
    const [nomeCompleto, setNomeCompleto] = React.useState('');
    const [celular, setTelefone] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [fotoSetada, setFoto] = React.useState('');
    const [curriculo, setCurriculo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [areaAtuacao, setAreaAtuacao] = React.useState('');

    // redes sociais
    const [linkedin, setLinkedin] = React.useState('');
    const [github, setGitHub] = React.useState('');
    const [stackOverflow, setOverFlow] = React.useState('');
    const [site, setSite] = React.useState('');
    const [nivelIngles, setNivelIngles] = React.useState('');
    const [situacaoProfissional, setSitProfissional] = React.useState('');
    const [idRemoto, setIdRemoto] = React.useState(0);
    const [regimeContratacao, setRegimeContratacao] = React.useState('');
    const [salario, setSalario] = React.useState('');

    //Endereco
    const [cep, setCep] = React.useState('');
    const [rua, setRua] = React.useState('');
    const [complemento, setComplemento] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [localidade, setLocalidade] = React.useState('');
    const [uf, setUf] = React.useState('');
    const [numero, setNumero] = React.useState('');

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
            <Text style={styles.title}>Informe os dados abaixo para iniciar o seu cadastro</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                placeholder='Digite seu email'
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite sua senha'
            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Confirme sua senha'
            />

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione a área de atuação',
                        value: null
                    }}
                    onValueChange={(value) => setAreaAtuacao(value)}
                    items={[
                        { label: 'Back-end', value: 'Back-end' },
                        { label: 'Front-end', value: 'Front-end' },
                        { label: 'Redes', value: 'Redes' },
                        { label: 'Full-stack', value: 'Full-stack' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={areaAtuacao}
                />
            </View>

            <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count + 1)} >Próximo</Button>

            <View style={{ height: 85 }} />
        </>
    );

    const StepTwo = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para continuar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                placeholder='Digite o seu nome completo'
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o seu cpf'      
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o seu celular'
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

            <Text style={styles.title}>Informe os dados abaixo para continuar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />


            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione a sua situação profissional',
                        value: null
                    }}
                    onValueChange={(value) => setSitProfissional(value)}
                    items={[
                        { label: 'Desempregado', value: 'Desempregado' },
                        { label: 'Empregado', value: 'Empregado' },
                        { label: 'Em busca do primeiro emprego', value: 'Em busca do primeiro emprego' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={situacaoProfissional}
                />
            </View>

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o nível do seu inglês',
                        value: null
                    }}
                    onValueChange={(value) => setNivelIngles(value)}
                    items={[
                        { label: 'Básico', value: 'Basico' },
                        { label: 'Intermediário', value: 'Intermediário' },
                        { label: 'Fluente', value: 'Fluente' },
                        { label: 'Nativo', value: 'Nativo' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={nivelIngles}
                />
            </View>

            <TextInput
                style={{ height: 60, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Conte um pouco sobre você...'
                multiline={true}
                numberOfLines={5}
                onKeyPress={({ nativeEvent }) => {
                    nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null
                }}
                maxLength={230}
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
