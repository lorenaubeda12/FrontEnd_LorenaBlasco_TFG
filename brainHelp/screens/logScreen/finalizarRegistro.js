import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import axios from 'axios';
import {formatearFecha} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {API_IP} from '../../variableDeEntorno/APIURL.env';
const FinalizarRegistro = ({navigation, route}) => {
  //Otros
  const {id_Usuario} = route.params;
  const {fecha} = route.params;
  const {duracion} = route.params;
  const {Intensidad} = route.params;
  const {selectedMedication} = route.params;
  const {selectDesencadenante} = route.params;
  const {selectDolor} = route.params;
  const {datos} = route.params;
  const fechaDolor = formatearFecha(fecha);

  const [medicacionElegida, setMedicacionElegida] = useState('');
  const [gramajeElegido, setGramaje] = useState('');
  const [doloresSufridos, setDolorSufrido] = useState([]);
  const [causante, setCausante] = useState([]);
  console.log('fecha ' + fecha);
  console.log('Id ' + id_Usuario);
  console.log('Intensidad ' + Intensidad);
  console.log('selectDesencadenante ' + selectDesencadenante);
  console.log('duracion ' + duracion);
  console.log('selectedMedication ' + selectedMedication);
  console.log('selectDolor ' + selectDolor);
  console.log('datos ' + datos);
  console.log('fechaDolor ' + fechaDolor);
  console.log({duracion});
  const duracionCrisisDolor = () => {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    if (horas === 0) {
      return minutos + ' minutos';
    } else {
      return horas + ' horas y ' + minutos + ' minutos';
    }
  };

  useEffect(() => {
    const fechtDolor = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const response = await axios.get(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/tiposDolor/miDolor/' + selectDolor,
          //  `http://${API_IP}/api/tiposDolor/miDolor/` + selectDolor,
        );
        setDolorSufrido(response.data.body[0].tipo);

        console.log(response.data.body[0].tipo);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fechtDolor();
  }, []);

  useEffect(() => {
    const fechtMedicacion = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;

        const response = await axios.get(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/medicacion/medicacionElegida/' +
            selectedMedication,
        );

        setMedicacionElegida(response.data.body[0].tipoMedicacion);
        setGramaje(response.data.body[0].gramaje);
        console.log('***********************');
        console.log(response.data.body[0].tipo);
        console.log(response.data.body[0].gramaje);
        console.log(medicacionElegida);
        console.log(gramajeElegido);
        console.log('***********************');
        const nombreMedicacion = response.data.body[0].tipoMedicacion;
        const gramajeMedicacion = response.data.body[0].gramaje;
        if (gramajeMedicacion === 0) {
          setMedicacionElegida(nombreMedicacion);
        } else {
          setMedicacionElegida(
            nombreMedicacion + ' ' + gramajeMedicacion + ' mg',
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fechtMedicacion();
  }, []);

  useEffect(() => {
    const fecthDesencadenante = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const response = await axios.get(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/tiposDesencadenantes/miDesencadenante/' +
            selectDesencadenante,
        );
        setCausante(response.data.body[0].tipo);
        console.log(response.data.body[0].tipo);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fecthDesencadenante();
  }, []);

  const guardar = async () => {
    try {
      const registroNuevo = {
        duracionCrisis: duracion,
        fechaRegistro: fecha,
        id_Desencadenante: {
          id_Desencadenante: selectDesencadenante,
        },
        id_Dolor: {id_Dolor: selectDolor},
        id_Medicacion: {id_Medicacion: selectedMedication},
        id_Usuario: {id_Usuario: id_Usuario},
        intensidad: Intensidad,
      };
      console.log(datos);
      console.log('Registro nuevo:');
      console.log(registroNuevo);
      console.log('***************');
      const ipAddressResponse = await fetch(
        'https://dns.google/resolve?name=harishan.hopto.org&type=A',
      );
      const ipAddressData = await ipAddressResponse.json();
      const ipAddress = ipAddressData.Answer[0].data;

      const response = await axios.post(
        'http://' + ipAddress + ':4672/BrainHelp_TFG/api/regis/',
        registroNuevo,
      );
      console.log('Respuesta:' + response.data);
      if (response.status === 200) {
        Alert.alert('Registro guardado');
        navigation.navigate('GuardadoExitoso', {datos});
      } else {
        Alert.alert('Error al guardar el registro', 'Intente nuevamente', [
          {text: 'OK'},
        ]);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  const resetState = () => {
    setMedicacionElegida('');
    setGramaje('');
    setDolorSufrido([]);
    setCausante([]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetState();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <Text style={styles.titulo}>Mi crisis:</Text>
      <View style={styles.contenedorOpciones}>
        <View>
          <Image
            style={styles.imagen}
            source={require('../../assets/img/calendar.png')}></Image>
        </View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.texto}>Día</Text>
          <Text style={styles.textoSubtitulo}>{fechaDolor}</Text>
        </View>
      </View>

      <View style={styles.contenedorOpciones}>
        <View>
          <Image
            style={styles.imagen}
            source={require('../../assets/img/duration.png')}></Image>
        </View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.texto}>Duración</Text>
          <Text style={styles.textoSubtitulo}>{duracionCrisisDolor()}</Text>
        </View>
      </View>

      <View style={styles.contenedorOpciones}>
        <View>
          <Image
            style={styles.imagen}
            source={require('../../assets/img/pills.png')}></Image>
        </View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.texto}>Medicación</Text>
          <Text style={styles.textoSubtitulo}>{medicacionElegida}</Text>
        </View>
      </View>
      <View style={styles.contenedorOpciones}>
        <View>
          <Image
            style={styles.imagen}
            source={require('../../assets/img/pain.png')}></Image>
        </View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.texto}>Tipo de dolor</Text>
          <Text style={styles.textoSubtitulo}>{doloresSufridos}</Text>
        </View>
      </View>
      <View style={styles.contenedorOpciones}>
        <View>
          <Image
            style={styles.imagen}
            source={require('../../assets/img/desencadeant.png')}></Image>
        </View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.texto}>Desencadenante</Text>
          <Text style={styles.textoSubtitulo}>{causante}</Text>
        </View>
      </View>

      <View>
        <View style={globalStyles.contenedorBotones}>
          <Button mode="contained" style={styles.botonFinal} onPress={guardar}>
            <Text style={styles.textoBotton}>Guardar</Text>
          </Button>
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};
export default FinalizarRegistro;

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 25,
    color: '#5E60CE',
    borderRadius: 20,
    backgroundColor: 'rgba(83, 144, 217, 0.25)',
    fontFamily: 'Questrial-Regular',
  },
  textoTitulo: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 10,
    marginRight: 20,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },

  textoSubtitulo: {
    textAlign: 'left',
    fontSize: 18,
    marginTop: 1,
    marginLeft: 5,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },

  contenedorOpciones: {
    borderRadius: 20,
    borderColor: '#CAC4D0',
    borderWidth: 2,
    width: 350,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    fontFamily: 'Questrial-Regular',
  },

  imagen: {
    width: 60,
    height: 61,
    marginLeft: 20,
  },
  contenedorTexto: {
    flex: 1,
    padding: 10,
    fontFamily: 'Questrial-Regular',
  },
  texto: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 2,
    marginRight: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Questrial-Regular',
  },

  textoBotton: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000',

    fontFamily: 'Questrial-Regular',
  },

  botonFinal: {
    backgroundColor: 'rgba(83, 144, 217, 0.50)',

    marginRight: 25,
    marginLeft: 25,
    marginBottom: 20,
  },
  botonCancelar: {
    width: 150,
    backgroundColor: 'rgba(247, 38, 52, 0.50)',
    marginBottom: 20,
  },
});
