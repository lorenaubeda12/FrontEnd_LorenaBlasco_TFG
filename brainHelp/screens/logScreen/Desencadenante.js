import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { formatearFecha } from '../../utils';
import globalStyles from '../../Styles/global';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const Desencadenantes = ({ navigation, route }) => {
  // Otros
  const { id_Usuario } = route.params;
  const { fecha } = route.params;
  const { duracion } = route.params;
  const { Intensidad } = route.params;
  const { selectedMedication } = route.params;
  const { datos } = route.params;
  // Desencadenantes
  const [selectDesencadenante, setDesencadenante] = useState('');
  const [desencadenantes, setDesencadenantes] = useState([]);

  const continuar = () => {
    if (selectDesencadenante === '') {
      Alert.alert('Error', 'No ha especificado el desencadenante de la crisis', [
        {
          text: 'OK',
        },
      ]);
      return;
    } else {
      navigation.navigate('Dolor', {
        fecha: fecha,
        id_Usuario: id_Usuario,
        duracion: duracion,
        Intensidad: Intensidad,
        selectedMedication: selectedMedication,
        selectDesencadenante: selectDesencadenante,
        datos: datos,
      });
      console.log('fecha ' + fecha);
      console.log('Id ' + id_Usuario);
      console.log('Intensidad ' + Intensidad);
      console.log('selectDesencadenante ' + selectDesencadenante);
      console.log('duracion ' + duracion);
      console.log('selectedMedication ' + selectedMedication);
    }
  };

  useEffect(() => {
    const fetchMedicacion = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const response = await axios.get(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/tiposDesencadenantes/todos'
        );
        setDesencadenantes(response.data.body);
        console.log(response.data.body);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fetchMedicacion();
  }, []);
  
  console.log(selectDesencadenante);

  return (
    <ScrollView>
      <View style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
        <Text style={styles.label}>5. Desencadenante de la crisis</Text>
        <Text style={styles.subtitulo}>¿Qué desencadenó tu crisis?</Text>
        <View style={styles.contenedorDesencadenante}>
          {desencadenantes.map((desencadenante) => (
            <View key={desencadenante.id_Desencadenante} style={styles.medicamentoItem}>
              <RadioButton.Item
                value={desencadenante.id_Desencadenante}
                style={styles.medicamentoRadio}
                status={
                  selectDesencadenante === desencadenante.id_Desencadenante
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => setDesencadenante(desencadenante.id_Desencadenante)}
                color="#5E60CE"
              />
              <TouchableOpacity
                onPress={() => setDesencadenante(desencadenante.id_Desencadenante)}
                style={styles.radioTextWrapper}
              >
                <Text style={styles.radioText}>
                  {desencadenante.tipo.length > 20
                    ? desencadenante.tipo.slice(0, 32) + '...'
                    : desencadenante.tipo}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Button
          mode="contained"
          icon={'arrow-right-bold-outline'}
          style={styles.botonContinua}
          onPress={continuar}
        >
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
  contenedorDesencadenante: {
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  contenedorDecoracion: {
    padding: 5,
    width: 250,
    backgroundColor: 'rgba(83,144,217,0.20)',
    borderRadius: 5,
  },
  radioTextWrapper: {
    flex: 1,
    marginRight: 10,
  },
  radioText: {
    marginLeft: 2,
    fontSize: 15,
    backgroundColor: 'rgba(83,144,217,0.20)',
    borderRadius: 5,
    padding: 6,
    color: '#000000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '400',
    textAlign: 'left',
  },
  label: {
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 15,
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
    marginTop: 2,
    fontSize: 25,
    marginLeft: 2,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
  botonContinua: {
    width: 300,
    marginTop: 20,
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 40,
    backgroundColor: '#8187dc',
  },
});

export default Desencadenantes;
