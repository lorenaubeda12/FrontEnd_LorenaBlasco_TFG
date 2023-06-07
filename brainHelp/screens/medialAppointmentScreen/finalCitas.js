import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import axios from 'axios';
import {formatearFecha} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const FinalizarRegistro = ({navigation, route}) => {
  //Otros
  const {datos} = route.params;
  console.log('Datos:', JSON.stringify(datos, null, 2));

  return (
    <ScrollView>
    <View style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>¡Cita añadida!</Text>
      </View>
      <View style={styles.contenedorImagen}>
      <Image
        style={styles.imagen}
        source={require('../../assets/img/image23.png')}
      />
      </View>
      <Text style={styles.recordatorio}>
       <Text style={styles.recordatorio2}> Recuerda: {'\n'}</Text>No olvides revisar tus citas frecuentemente.
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('PantallaPrincipalCitas', {datos})}
        style={styles.boton}>
        Finalizar
      </Button>
    </View>
    </ScrollView>
  );
};
export default FinalizarRegistro;

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  boton: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: 'rgba( 83, 144, 217, 0.75)',

  },
  titulo: {
    textAlign: 'center',
    marginBottom: -20,
    fontSize: 25,
    paddingTop: 10,
    fontFamily: 'Questrial-Regular',
    color: '#000',
    backgroundColor: 'rgba( 83, 144, 217, 0.25)',
    borderRadius: 60,
    height: 60,
    width: 300,

  },
  contenedorImagen: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,

  },
  imagen: {
    width: 350,
    height: 350,
  },
  recordatorio: {
    textAlign: 'center',
    marginBottom: 3,
    marginHorizontal: 15,
    fontSize: 18,
    paddingTop: 10,
    fontFamily: 'Questrial-Regular',
    color: '#000',
    backgroundColor: 'rgba( 83, 144, 217, 0.25)',
    borderRadius: 60,
    height: 80,
    width: 350,

  },
  recordatorio2: {
    color: '#5e60ce',
    fontSize: 15,
  },
});
