import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { formatearFecha } from '../../utils';
import globalStyles from '../../Styles/global';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const RegistroHoraMedicacion = ({ navigation, route }) => {
  //Otros
  const { id_Usuario } = route.params;
  const { fecha } = route.params;
  const { datos } = route.params;
  console.log("Datos:" + datos);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [Intensidad, setIntensidad] = useState('');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');

  console.log(Intensidad);

  const continuar = () => {
    if (horas == '' || minutos == '') {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {
          text: 'OK',
        },
      ]);
    } else if (
      horas > 24 ||
      minutos > 60 ||
      (horas > 24 && minutos > 60) ||
      horas < 0 ||
      minutos < 0
    ) {
      Alert.alert('Error', 'El formato de la hora es incorrecto', [
        {
          text: 'OK',
        },
      ]);
      return;
    } else if (
      selectedMedication == ''
      ||
      Intensidad == ''
    ) {
      Alert.alert('Error', 'Faltan datos de introducir', [
        {
          text: 'OK',
        },
      ]);
      return;
    } else {
      const duracion = parseInt(horas) * 60 + parseInt(minutos);

      navigation.navigate('Desencadenantes', {
        fecha: fecha,
        id_Usuario: id_Usuario,
        duracion: duracion,
        Intensidad: Intensidad,
        selectedMedication: selectedMedication,
        datos: datos, // Agregar la variable datos aquí
      });
      console.log('fecha ' + fecha);
      console.log('Id ' + id_Usuario);
      console.log('Intensidad ' + Intensidad);
      console.log('selectedMedication ' + selectedMedication);
      console.log('duracion ' + duracion);
    }
  };


  useEffect(() => {
    
    const fetchMedicacion = async () => {
      const ipAddressResponse = await fetch(
        'https://dns.google/resolve?name=harishan.hopto.org&type=A',
      );
      const ipAddressData = await ipAddressResponse.json();
      const ipAddress = ipAddressData.Answer[0].data;
      try {
        const response = await axios.get(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/medicacion/todos',
        );
        setMedicamentos(response.data.body);
        console.log(response.data.body);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fetchMedicacion();
  }, []);
  console.log(selectedMedication);
  return (
    <ScrollView>
      <View style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
        <Text style={styles.titulo}>2.Duración de la crisis</Text>
        <Text style={styles.subtitulo}>¿Cuánto duro la crisis?</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Duración:</Text>
          <View style={styles.horasMinutos}>
            <TextInput
              label="Horas"
              placeholder="Horas"
              keyboardType="numeric"
              maxLength={2}
              value={horas}
              onChangeText={texto => setHoras(texto)}
              style={styles.horas}
            />
            <Text style={styles.puntos}>:</Text>
            <TextInput
              label="Minutos"
              keyboardType="numeric"
              placeholder="Minutos"
              maxLength={2}
              value={minutos}
              onChangeText={texto => setMinutos(texto)}
              style={styles.minutos}
            />
          </View>
          <Text style={styles.label}>3.Intensidad:</Text>
          <View style={styles.contenedor}>
            <RadioButton.Group>
              <View style={styles.radioGroup}>
                <View style={styles.radio}>
                  <RadioButton
                    value="Leve"
                    status={Intensidad === 'Leve' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensidad('Leve')}
                  />
                  <TouchableWithoutFeedback onPress={() => setIntensidad('Leve')}>
                    <Text style={styles.radioText}>Leve</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    value="Moderada"
                    status={Intensidad === 'Moderada' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensidad('Moderada')}
                  />
                  <TouchableWithoutFeedback onPress={() => setIntensidad('Moderada')}>
                    <Text style={styles.radioText}>Moderada</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.radio}>
                  <RadioButton
                    value="Severa"
                    status={Intensidad === 'Severa' ? 'checked' : 'unchecked'}
                    onPress={() => setIntensidad('Severa')}
                  />
                  <TouchableWithoutFeedback onPress={() => setIntensidad('Severa')}>
                    <Text style={styles.radioText}>Severa</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <Text style={styles.label}>4.¿Necesitaste medicación para la crisis?</Text>
          <View style={styles.contenedorMedicamentos}>
            {medicamentos.map(medicamento => (
              <View
                key={medicamento.id_Medicacion}
                style={styles.medicamentoItem}>
                <TouchableWithoutFeedback onPress={() => setSelectedMedication(medicamento.id_Medicacion)}>
                  <Text style={styles.medicamentoLabel}>
                    {medicamento.tipoMedicacion}, {medicamento.gramaje}mg
                  </Text>
                </TouchableWithoutFeedback>
                <RadioButton.Item
                  value={medicamento.id_Medicacion}
                  style={styles.medicamentoRadio}
                  status={
                    selectedMedication === medicamento.id_Medicacion
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setSelectedMedication(medicamento.id_Medicacion)
                  }
                  color="#5E60CE"
                />
              </View>
            ))}
          </View>
        </View>
        <Button
          mode="contained"
          icon={'arrow-right-bold-outline'}
          style={styles.botonContinua}
          onPress={() => continuar()}>
          Continuar
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  medicamentoLabel: {
    marginLeft: 10,
    fontFamily: 'Questrial-Regular',
    fontWeight: '400',
    fontSize: 15,
    color: '#000',
    backgroundColor: 'rgba(83,144,217,0.20)',
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
  medicamentoRadio: {
    marginRight: 5,
    marginBottom: 2,
  },
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contenedorMedicamentos: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  medicamentoItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 1,
  },
  radioText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '400',
    textAlign: 'left',
    backgroundColor: 'rgba(83,144,217,0.20)',
    borderRadius: 5,
    padding: 5,
  },
  label: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
    
  },
  titulo: {
    marginBottom: 2,
    marginTop: 15,
    fontSize: 15,
    marginLeft: 30,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  subtitulo: {
    marginBottom: 6,
    marginTop: 3,
    fontSize: 25,
    marginLeft: 30,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnNuevaCita: {
    marginVertical: 50,
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  fecha: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#5E60CE',
    textAlign: 'center',
    marginBottom: 30,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenedorFecha: {
    borderRadius: 20,
    padding: 10,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
  botonContinua: {
    width: 300,
    marginTop: 25,
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#8187dc',
  },
  horasMinutos: {
    width: 100,
    marginTop: 10,
    flexDirection: 'row',
  },
  horas: {
    width: 100,
    marginLeft: 40,
    marginRight: 10,
  },
  minutos: {
    width: 100,
    marginLeft: 10,
    marginRight: 20,
  },
  puntos: {
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    fontSize: 60,
  },
  picker: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default RegistroHoraMedicacion;
