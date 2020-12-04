import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { Alert, Modal, RefreshControl, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Text, View } from '../components/Themed';


export default function VagaScreen({
  navigation
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  React.useEffect(() => {
    decodeToken();
    listarVagas();
    listarVagasEmpresa();
    listarTech();
  }, []);

  const [role, setRole] = React.useState('');
  const [vagas, setVagas] = React.useState([]);
  const [vagasEmpresa, setVagasEmpresa] = React.useState([]);
  const [tecnologias, setTecnologias] = React.useState([]);


  const [idVaga, setIdVaga] = React.useState(0);
  const [empresa, setEmpresa] = React.useState('');
  const [areaAtuacaoVaga, setAreaAtuacaoVaga] = React.useState('');
  const [titulo, setTitulo] = React.useState('');
  const [localidade, setLocalidade] = React.useState('');
  const [remoto, setRemoto] = React.useState('');
  const [salario, setSalario] = React.useState('');
  const [regContratacao, setRegContratacao] = React.useState('');
  const [descAtividades, setDescAtividades] = React.useState('');
  const [descRequisitos, setDescRequisitos] = React.useState('');
  const [beneficios, setBeneficios] = React.useState([])

  const [inscrito, setInscrito] = React.useState(Boolean);

  const decodeToken = async () => {
    var token = await AsyncStorage.getItem('token');

    var jwtDecode = require('jwt-decode');

    var tokenDecoded = jwtDecode(token);

    setRole(tokenDecoded.Role);
  }

  const listarVagas = async () => {

    // if (role === '1' || role === '2') {
    try {
      const request = await fetch("http://192.168.0.3:8000/api/Vaga/Mobile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const response = await request.json();

      setVagas(response);

    } catch (error) {
      console.log("ERROR")
      console.log(error)
      // Alert.alert("Vagas não encontrado!", "Tente novamente")
    }
    // }
    // else if (role === '3') {
    //   try {
    //     const request = await fetch("http://192.168.0.3:8000/api/Vaga/Empresa", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: 'Bearer ' + await AsyncStorage.getItem('token')
    //       }
    //     })

    //     const response = await request.json();

    //     setVagas(response);

    //   } catch (error) {
    //     console.log("ERROR")
    //     console.log(error)
    //     Alert.alert("Vagas não encontrado!", "Tente novamente")
    //   }
    // }

  }

  const listarVagasEmpresa = async () => {
    try {
      const request = await fetch("http://192.168.0.3:8000/api/Vaga/Empresa", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        }
      })

      const response = await request.json();

      setVagasEmpresa(response);

    } catch (error) {
      console.log("ERROR")
      console.log(error)
      // Alert.alert("Vagas não encontrado!", "Tente novamente")
    }

  }

  const listarTech = async () => {
    if (role !== '3') {
      try {
        const requestTech = await fetch("http://192.168.0.3:8000/api/Tecnologia", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        const responseTech = await requestTech.json();

        setTecnologias(responseTech);

      } catch (error) {
        console.log("ERROR")
        console.log(error)
        Alert.alert("Tecnologia não encontrado!", "Tente novamente")
      }
    }
  }

  const [modalVisible, setModalVisible] = React.useState(false);


  const fazerInscricao = async () => {

    let body = {
      idVaga: idVaga
    }

    try {
      const request = await fetch("http://192.168.0.3:8000/api/Inscricao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        },
        body: JSON.stringify(body),

      })

      const response = await request.json();

      // Alert.alert(response);

      Alert.alert(
        //title
        'Inscricão',
        //body
        `${response}`,
        [
          {
            text: 'Ok',
            onPress: () => setModalVisible(!modalVisible)
          }
        ]
      );

    } catch (error) {
      console.log("ERROR")
      console.log(error)
      Alert.alert("Tecnologia não encontrado!", "Tente novamente")
    }
  }

  const verificarInscricao = async (id: any) => {
    try {
      const request = await fetch(`http://192.168.0.3:8000/api/Inscricao/VerificarInscricao/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + await AsyncStorage.getItem('token')
        },
      })

      const response = await request.json();

      setInscrito(response);

    } catch (error) {
      console.log("ERROR")
      console.log(error)
    }
  }

  const modal = () => {
    if (role === '1') {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.",);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>{empresa}</Text>
                <Text style={styles.modalText}>Titulo: {titulo}</Text>
                <Text style={styles.modalText}>Área atuação: {areaAtuacaoVaga}</Text>
                <Text style={styles.modalText}>Localidade: {localidade}</Text>
                <Text style={styles.modalText}>Remoto: {remoto}</Text>
                <Text style={styles.modalText}>Salário: {salario}</Text>
                <Text style={styles.modalText}>Regime Contratação: {regContratacao}</Text>
                <Text style={styles.modalText}>Descricão das Ativades: {descAtividades}</Text>
                <Text style={styles.modalText}>Descricão dos Requisitos: {descRequisitos}</Text>
                <Text style={styles.modalText}>Beneficios: {beneficios.map((item: any) => {
                  return (
                    <Text key={item}>{item}, </Text>
                  );
                })}</Text>

                <Text style={styles.modalText}>Tecnologia: {tecnologias.filter(function (tec: any) { if (tec.idVaga === idVaga) return tec }).map((tec: any) => {
                  return (
                    <Text key={tec.idTecnologia}>{tec.nomeTecnologia}, </Text>
                  );
                })}</Text>

                {inscrito === true ? <Button mode="contained" color="#32cd32" style={{ marginTop: '10%', marginBottom: '10%' }} >Inscrito</Button> : <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginBottom: '10%' }} onPress={() => fazerInscricao()}>Me Candidatar</Button>}

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#DC3545" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>

                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View >
      );

    }
    else if (role === '3') {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.",);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>{empresa}</Text>
                <Text style={styles.modalText}>Titulo: {titulo}</Text>
                <Text style={styles.modalText}>Área atuação: {areaAtuacaoVaga}</Text>
                <Text style={styles.modalText}>Localidade: {localidade}</Text>
                <Text style={styles.modalText}>Remoto: {remoto}</Text>
                <Text style={styles.modalText}>Salário: {salario}</Text>
                <Text style={styles.modalText}>Regime Contratação: {regContratacao}</Text>
                <Text style={styles.modalText}>Descricão das Ativades: {descAtividades}</Text>
                <Text style={styles.modalText}>Descricão dos Requisitos: {descRequisitos}</Text>
                <Text style={styles.modalText}>Beneficios: {beneficios.map((item: any) => {
                  return (
                    <Text key={item}>{item}, </Text>
                  );
                })}</Text>

                <Text style={styles.modalText}>Tecnologia: {tecnologias.filter(function (tec: any) { if (tec.idVaga === idVaga) return tec }).map((tec: any) => {
                  return (
                    <Text key={tec.idTecnologia}>{tec.nomeTecnologia}, </Text>
                  );
                })}</Text>

                <Button mode="contained" color="#DC3545" style={{ marginTop: '10%', marginBottom: '10%' }} onPress={() => { navigation.navigate('Inscricoes', { idVaga: idVaga }); setModalVisible(!modalVisible) }}>Inscrições</Button>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#DC3545" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>

                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View >
      );
    }
    else if (role === '2') {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.",);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>{empresa}</Text>
                <Text style={styles.title}>Titulo: <Text style={styles.modalText}>{titulo}</Text></Text>
                <Text style={styles.modalText}>Área atuação: {areaAtuacaoVaga}</Text>
                <Text style={styles.modalText}>Localidade: {localidade}</Text>
                <Text style={styles.modalText}>Remoto: {remoto}</Text>
                <Text style={styles.modalText}>Salário: {salario}</Text>
                <Text style={styles.modalText}>Regime Contratação: {regContratacao}</Text>
                <Text style={styles.modalText}>Descricão das Ativades: {descAtividades}</Text>
                <Text style={styles.modalText}>Descricão dos Requisitos: {descRequisitos}</Text>
                <Text style={styles.modalText}>Beneficios: {beneficios.map((item: any) => {
                  return (
                    <Text key={item}>{item}, </Text>
                  );
                })}</Text>

                <Text style={styles.modalText}>Tecnologia: {tecnologias.filter(function (tec: any) { if (tec.idVaga === idVaga) return tec }).map((tec: any) => {
                  return (
                    <Text key={tec.idTecnologia}>{tec.nomeTecnologia}, </Text>
                  );
                })}</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#DC3545", marginBottom: '5%', marginTop: '15%' }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>

                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View >
      );
    }

  }

  const wait = (timeout: any) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    listarVagas();

    wait(2000).then(() => setRefreshing(false));
  }, []);


  const vagaUser = () => {
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.container}>
          {vagas.length !== 0 ? vagas.map((item: any) => {
            return (
              <View style={{ width: '80%', marginTop: '5%', marginBottom: '5%' }} key={item.idVaga}>
                <Text style={styles.subTitulo}>{item.areaAtuacaoVaga}</Text>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text>{item.localidade}</Text>
                <Text style={{ marginTop: '1%', marginBottom: '1%' }}>R$ {item.salario}</Text>
                <Text style={{ marginTop: '3%' }}>{item.descricaoAtividades}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {tecnologias.filter(function (tec: any) { if (tec.idVaga === item.idVaga) return tec }).slice(0, 2).map((tec: any) => {
                    return (
                      <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={tec.idTecnologia}>{tec.nomeTecnologia}</Button>
                    );
                  })}
                </View>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '5%' }} onPress={async () => {
                  setIdVaga(item.idVaga);
                  setEmpresa(item.empresa)
                  setAreaAtuacaoVaga(item.areaAtuacaoVaga);
                  setTitulo(item.titulo);
                  setLocalidade(item.localidade);
                  setRemoto(item.remoto);
                  setSalario(item.salario);
                  setRegContratacao(item.regimeContratacao);
                  setDescAtividades(item.descricaoAtividades);
                  setDescRequisitos(item.descricaoRequisitos);
                  setBeneficios(item.beneficios);
                  await verificarInscricao(item.idVaga);
                  setModalVisible(true);
                }}>Mais Detalhes</Button>
              </View>
            );
          }) : <Text style={{ padding: 20 }}>Sem vaga cadastrada</Text>}

          {modal()}

        </View>
      </ScrollView>
    );
  }


  const vagaEmpresa = () => {
    return (
      <ScrollView style={{ width: '100%' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          {vagasEmpresa.length !== 0 ? vagas.map((item: any) => {
            return (
              <View style={{ width: '80%', marginTop: '5%', marginBottom: '5%' }} key={item.idVaga}>
                <Text style={styles.subTitulo}>{item.areaAtuacaoVaga}</Text>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text>{item.localidade}</Text>
                <Text style={{ marginTop: '1%', marginBottom: '1%' }}>R$ {item.salario}</Text>
                <Text style={{ marginTop: '3%' }}>{item.descricaoAtividades}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {tecnologias.filter(function (tec: any) { if (tec.idVaga === item.idVaga) return tec }).slice(0, 2).map((tec: any) => {
                    return (
                      <Button mode="outlined" color='#DC3545' style={{ marginTop: '5%', marginBottom: '1%', borderColor: '#DC3545', width: '35%', marginRight: '2%' }} key={tec.idTecnologia}>{tec.nomeTecnologia}</Button>
                    );
                  })}
                </View>
                <Button mode="contained" color="#DC3545" style={{ marginTop: '5%' }} onPress={async () => {
                  setIdVaga(item.idVaga);
                  setEmpresa(item.empresa)
                  setAreaAtuacaoVaga(item.areaAtuacaoVaga);
                  setTitulo(item.titulo);
                  setLocalidade(item.localidade);
                  setRemoto(item.remoto);
                  setSalario(item.salario);
                  setRegContratacao(item.regimeContratacao);
                  setDescAtividades(item.descricaoAtividades);
                  setDescRequisitos(item.descricaoRequisitos);
                  setBeneficios(item.beneficios);
                  setModalVisible(true);
                }}>Mais Detalhes</Button>
              </View>
            );
          }) : <Text style={{ padding: 20 }}>Cadastre uma vaga</Text>}

          {modal()}

        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {role === '1' || role === '2' ? vagaUser() : vagaEmpresa()}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '1%',
    marginBottom: '1%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subTitulo: {
    color: '#DC3545'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop: 15,
    textAlign: "center"
  }
});
