import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  BottomNavigation,
} from 'react-native-paper';

import globalStyles from '../../Styles/global';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';

const PantallaOpciones = ({navigation, route, datos}) => {


   const {
    nombreUsuario,
    apellidosUsuario,
    fechaNacimientoUsuario,
    correoUsuario,
    id_Usuario,
  } = datos;
  const addDatos = () => {
    console.log('Añadiendo datos');
    console.log(id_Usuario);
    navigation.navigate('AniadirRegistro', { id_Usuario: id_Usuario, datos: datos });
  };
  console.log(datos);
  
  const addCita = () => {
    navigation.navigate('PantallaPrincipalCitas', { datos });
  };
 
  const verRegistros = () => {
    navigation.navigate('verRegistros', { datos });
  };
 
  return (
    <ScrollView style={globalStyles.contenedorBordes}>
      <View>
        <Text style={styles.textoTitulo}>¡Hola, {nombreUsuario}!</Text>
        <Text style={styles.textoSubtitulo}>¿Tienes datos nuevos hoy?</Text>
      </View>
      <View>
        <View style={styles.contenedorOpciones}>
          <View>
            <Image
              style={styles.imagen}
              source={require('../../assets/img/cerebro1.png')}></Image>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto}>¿Has sufido dolor hoy?</Text>
            <Button
              style={styles.button}
              icon={'plus'}
              onPress={addDatos}
              mode="contained">
              {' '}
              Añadir un registro
            </Button>
          </View>
        </View>
        <View style={styles.contenedorOpciones}>
          <View>
            <Image
              style={styles.imagen}
              source={require('../../assets/img/trading1.png')}></Image>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto}>Mirar mis registros</Text>
            <Button
              style={styles.button}
              icon={'arrow-right-thick'}
              mode="contained"
              onPress={verRegistros}>
              {' '}
              Ver registros
            </Button>
          </View>
        </View>
        <View style={styles.contenedorOpciones}>
          <View>
            <Image
              style={styles.imagen}
              source={require('../../assets/img/medicine1.png')}></Image>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto}>¿Tomaste medicación?</Text>
            <Button style={styles.button} icon={'plus'} mode="contained">
              {' '}
              Añadir medicación
            </Button>
          </View>
        </View>
        <View style={styles.contenedorOpciones}>
          <View>
            <Image
              style={styles.imagen}
              source={require('../../assets/img/appointment1.png')}></Image>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto}>Mis citas medicas</Text>
            <Button
              style={styles.button}
              icon={'arrow-right-thick'}
              mode="contained"
              onPress={addCita}>
              {' '}
              Mis citas
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PantallaOpciones;

const styles = StyleSheet.create({
  textoTitulo: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 10,
    marginRight: 20,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },
  textoSubtitulo: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 1,
    marginRight: 20,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },

  contenedorOpciones: {
    backgroundColor: '#CACDF4',
    borderRadius: 20,
    width: 350,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  imagen: {
    width: 60,
    height: 61,
    marginLeft: 20,
  },
  contenedorTexto: {
    flex: 1,
    padding: 10,
  },
  texto: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginRight: 20,
    color: '#6247AA',
    fontFamily: 'Questrial-Regular',
  },
  button: {
    backgroundColor: '#7251B5',
    borderRadius: 20,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
