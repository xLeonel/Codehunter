import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Avatar, Button } from 'react-native-paper';
import { RootStackParamList } from '../types';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
    const [image, setImage] = React.useState('');
    // const [curriculo, setCurriculo] = React.useState('');
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
    const [remotoText, setRemotoText] = React.useState(0);
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

    const [emailValid, setEmailValid] = React.useState('');

    const Cadastrar = async () => {

        // const experiência = []

        // for (let index = 0; index < beneficiosTags.length; index++) {
        //     console.log(beneficiosTags[index].title);

        //     let send = {
        //         NomeBeneficios: beneficiosTags[index].title
        //     }
        //     beneficiosFormat.push(send)
        // }

        const body = {
            IdAcessoNavigation: {
                Email: email,
                Senha: senha
            },
            NomeCompleto: nomeCompleto,
            Celular: celular,
            Cpf: cpf,
            // Curriculo: curriculo,
            Foto: image,
            Descricao: descricao,
            IdAreaAtuacaoNavigation: {
                NomeAreaAtuacao: areaAtuacao
            },
            IdEnderecoNavigation: {
                Cep: cep,
                Logradouro: `${rua}, ${numero}`,
                Complemento: complemento,
                Bairro: bairro,
                Localidade: localidade,
                Uf: uf
            },
            IdPreferenciasTrabalhoNavigation: {
                Linkedin: linkedin,
                Github: github,
                StackOverflow: stackOverflow,
                SitePessoal: site,
                NivelIngles: nivelIngles,
                SituacaoProfissional: situacaoProfissional,
                IdRemoto: idRemoto,
                IdRegimeContratacaoNavigation: {
                    NomeRegimeContratacao: regimeContratacao,
                    ExpectativaSalario: salario
                }
            }
        }


        try {
            setLoading(true);

            const url = "http://192.168.0.2:8000/api/Usuario/"
            const request = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const response = await request.json()

            if (response === 'Cadastrado') {

                try {
                    const url = "http://192.168.0.2:8000/api/Login/Usuario"
                    const request = await fetch(url, {
                        method: "post",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Email: email, Senha: senha })
                    })
                    const response = await request.json()

                    if (response === 'Conta não existe') {
                        console.log(response)
                    }
                    else if (response === 'Email ou senha inválidos.') {
                        console.log(response)
                    }
                    else {
                        if (response !== undefined) {
                            await AsyncStorage.setItem('token', response.token)

                            try {
                                const url = "http://192.168.0.2:8000/api/Usuario/VagasMatch"
                                const request = await fetch(url, {
                                    method: "get",
                                    headers: {
                                        authorization: 'Bearer ' + await AsyncStorage.getItem('token')
                                    }
                                })
                                const response = await request.json()

                                if (response === 'Nenhuma vaga compatível com o usuário.') {
                                    setLoading(false);

                                    navigation.replace('Voltar');
                                }
                                else {
                                    setLoading(false);
                                    
                                    //fazer found vagas

                                    // history.push('/found')
                                }
                            } catch (error) {
                                throw new Error(error)
                            }

                        }

                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
            else {
                setLoading(false);

                Alert.alert(response);
                // window.location.reload();
            }

        } catch (error) {
            setLoading(false);

            console.log(error)
        }

    }


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

    const verificarEmail = async () => {

        const body = {
            IdAcessoNavigation: {
                Email: email
            }
        }

        try {
            setLoading(true);
            const request = await fetch('http://192.168.0.2:8000/api/Usuario/IsAluno', {
                body: JSON.stringify(body),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await request.json();

            setEmailValid(response);

            setLoading(false);


        } catch (error) {
            console.log("ERROR")
            console.log(error)
            setLoading(false);

        }
    }

    const validarSenha = () => {
        if (senha !== confirmSenha) {
            Alert.alert('As senhas devem ser iguais.')
        }
    }

    const StepOne = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para iniciar o seu cadastro</Text>
            <View style={styles.separatorTitle} />

            <Spinner
                visible={loading}
                textContent={'Validando email...'}
                textStyle={{ color: '#fff' }}
            // color='#DC3545'
            />

            {emailValid === 'true' ?
                <TextInput
                    style={{ height: 45, width: '80%', borderColor: 'green', borderWidth: 2, padding: '2%', marginTop: 30 }}
                    placeholder='Digite seu email'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                /> : emailValid === 'false' ?
                    <TextInput
                        style={{ height: 45, width: '80%', borderColor: 'red', borderWidth: 2, padding: '2%', marginTop: 30 }}
                        placeholder='Email incorreto, digite um email aluno'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        onBlur={() => verificarEmail()}
                    /> :
                    <TextInput
                        style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: 30 }}
                        placeholder='Digite seu email'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        onBlur={() => verificarEmail()}
                    />}

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite sua senha'
                onChangeText={(text) => setSenha(text)}
                secureTextEntry={true}
                value={senha}


            />
            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Confirme sua senha'
                onChangeText={(text) => setSenhaConfirm(text)}
                secureTextEntry={true}
                value={confirmSenha}
                onBlur={validarSenha}

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
                onChangeText={(text) => setNomeCompleto(text)}
                value={nomeCompleto}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o seu cpf'
                onChangeText={(text) => setCpf(text)}
                value={cpf}
            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite o seu celular'
                onChangeText={(text) => setTelefone(text)}
                value={celular}
                secureTextEntry={false}
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
                        { label: 'Básico', value: 'Básico' },
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
                onChangeText={(text) => setDescricao(text)}
                value={descricao}
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
            <Text style={styles.title}>Informe os dados abaixo para continuar o cadastro da empresa</Text>
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
                    onChangeText={(text) => setNumero(text)}
                    value={numero}
                />
                <TextInput
                    style={{ height: 45, width: '40%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%', marginLeft: '5%' }}
                    placeholder='Digite o complemento'
                    onChangeText={(text) => setComplemento(text)}
                    value={complemento}
                />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => setCount(count + 1)} >Próximo</Button>
            </View>

            <View style={{ height: 85 }} />

        </>
    );

    const StepFive = (
        <>

            <Text style={styles.title}>Informe os dados abaixo para continuar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />


            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o tipo de trabalho',
                        value: null
                    }}
                    onValueChange={(value) => {
                        setRemotoText(value)

                        if (value === 'Remoto ou presencial') {
                            setIdRemoto(3);
                        }
                        else if (value === 'Apenas presencial') {
                            setIdRemoto(2);
                        }
                        else if (value === 'Apenas remoto') {
                            setIdRemoto(1);
                        }
                    }}
                    items={[
                        { label: 'Remoto ou presencial', value: 'Remoto ou presencial' },
                        { label: 'Apenas presencial', value: 'Apenas presencial' },
                        { label: 'Apenas remoto', value: 'Apenas remoto' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={remotoText}
                />
            </View>

            <View style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '10%', padding: '2%', justifyContent: 'center' }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o regime de contratação',
                        value: null
                    }}
                    onValueChange={(value) => setRegimeContratacao(value)}
                    items={[
                        { label: 'CLT', value: 'CLT' },
                        { label: 'PJ', value: 'PJ' },
                        { label: 'Estágio', value: 'Estágio' },
                    ]}
                    Icon={() => {
                        return <Ionicons name="md-arrow-down" size={20} color="gray" />;
                    }}
                    value={regimeContratacao}
                />
            </View>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, padding: '2%', marginTop: '10%' }}
                placeholder='Digite sua expectativa salarial'
                onChangeText={(text) => setSalario(text)}
                value={salario}
            />

            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => setCount(count + 1)} >Próximo</Button>
            </View>


            <View style={{ height: 85 }} />

        </>
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            if (result.base64 !== undefined) {
                setImage(result.base64);
            }

        }

    };

    const StepSix = (
        <>
            <Text style={styles.title}>Informe os dados abaixo para finalizar o cadastro da empresa</Text>
            <View style={styles.separatorTitle} />

            <Spinner
                visible={loading}
                textContent={'Processando...'}
                textStyle={{ color: '#fff' }}
            // color='#DC3545'
            />

            <TouchableOpacity onPress={pickImage} style={{ paddingTop: 10 }}>
                {image === '' ? <Avatar.Image size={90} source={require('../assets/images/userFoto.png')} /> : <Avatar.Image size={90} source={{ uri: 'data:image/jpeg;base64,' + image }} />}
            </TouchableOpacity>

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setLinkedin(text)}
                value={linkedin}
                placeholder={linkedin === '' ? 'digite seu linkedin' : linkedin}

            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setGitHub(text)}
                value={github}
                placeholder={github === '' ? 'digite seu github' : github}


            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setOverFlow(text)}
                value={stackOverflow}
                placeholder={stackOverflow === '' ? 'digite seu stack overflow' : stackOverflow}


            />

            <TextInput
                style={{ height: 45, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: '5%', padding: '2%' }}
                onChangeText={text => setSite(text)}
                value={site}
                placeholder={site === '' ? 'digite seu site' : site}

            />

            <View style={{ flexDirection: 'row' }}>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%' }} onPress={() => setCount(count - 1)} >Voltar</Button>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginLeft: '5%' }} onPress={() => Cadastrar()} >Concluir</Button>
            </View>


            <View style={{ height: 90 }} />

        </>
    );

    return (
        <KeyboardAvoidingView
            style={styles.containerTeste}
            behavior="padding"
        >

            {count === 1 ? StepOne : count === 2 ? StepTwo : count === 3 ? StepThree : count === 4 ? StepFour : count === 5 ? StepFive : StepSix}

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
