import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import axios from 'axios';

import { ScrollView } from 'react-native-gesture-handler';

const Dolor = ({ navigation, route }) => {
  // Otros
  const { id_Usuario } = route.params;
  const { fecha } = route.params;
  const { duracion } = route.params;
  const { Intensidad } = route.params;
  const { selectedMedication } = route.params;
  const { selectDesencadenante } = route.params;
  const { datos } = route.params;
  // Desencadenantes
  const [selectDolor, setDolor] = useState('');
  const [dolores, setDolores] = useState([]);

  const continuar = () => {
    if (selectDolor === '') {
      Alert.alert('Error', 'No has especificado el dolor sufrido durante la crisis', [
        {
          text: 'OK',
        },
      ]);
      return;
    } else {
      navigation.navigate('finalizarRegistro', {
        fecha: fecha,
        id_Usuario: id_Usuario,
        duracion: duracion,
        Intensidad: Intensidad,
        selectedMedication: selectedMedication,
        selectDesencadenante: selectDesencadenante,
        selectDolor: selectDolor,
        datos: datos,
      });
      console.log('fecha ' + fecha);
      console.log('Id ' + id_Usuario);
      console.log('Intensidad ' + Intensidad);
      console.log('selectDesencadenante ' + selectDesencadenante);
      console.log('duracion ' + duracion);
      console.log('selectedMedication ' + selectedMedication);
      console.log('selectDolor ' + selectDolor);
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
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/tiposDolor/todos'
        );
        setDolores(response.data.body);
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
        <Text style={styles.label}>6. Tipo de dolor experimentado.</Text>
        <Text style={styles.subtitulo}>¿Cuáles fueron tus síntomas?</Text>
        <View style={styles.contenedorDesencadenante}>
          {dolores.map(dolor => (
            <View key={dolor.id_Dolor} style={styles.medicamentoItem}>
              <RadioButton.Item
                value={dolor.id_Dolor}
                style={styles.medicamentoRadio}
                status={selectDolor === dolor.id_Dolor ? 'checked' : 'unchecked'}
                onPress={() => setDolor(dolor.id_Dolor)}
                color="#5E60CE"
              />
              <TouchableOpacity onPress={() => setDolor(dolor.id_Dolor)}>
                <View style={styles.contenedorDecoracion}>
                  <Text style={styles.radioText}>
                    {dolor.tipo.length > 20 ? dolor.tipo.slice(0, 32) + '...' : dolor.tipo}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Button
          mode="contained"
          icon={'arrow-right-bold-outline'}
          style={styles.botonContinua}
          onPress={() => continuar()}
        >
          Finalizar
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
  radioText: {
    marginLeft: 2,
    fontSize: 15,
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

export default Dolor;
