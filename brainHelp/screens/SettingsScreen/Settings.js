import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import globalStyles from '../../Styles/global';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Settings = ({navigation, route, datos}) => {
  const {nombreUsuario, apellidosUsuario, email} = datos;
  console.log('Datos:', JSON.stringify(datos, null, 2));

  const configuracion = () => {
    navigation.navigate('ConfiguracionUsuario', {
      datos: datos,
      idUsuario: datos.id_Usuario,
    });
  };
  const premium = () => {
    navigation.navigate('premium');
  };
  const servicioTecnico = () => {
    navigation.navigate('servicioTecnico');
  };

  const nombreCompleto = nombreUsuario + ' ' + apellidosUsuario;

  const cerrarSesion = () => {
    navigation.navigate('InicioSession');
  };

  return (
    <ScrollView
      style={[globalStyles.contenedor, globalStyles.contenedorBordes]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageUser}
            source={require('../../assets/img/user.png')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={configuracion}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/img/ajustes.png')}
          />
          <Text style={styles.buttonText}>Configuración de cuenta.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={premium}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/img/VIP.png')}
          />
          <Text style={styles.buttonText}>¡Hazte premium!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} disabled>
        <View style={styles.buttonContent}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/img/puntosrecompnesa.png')}
          />
          <Text style={[styles.buttonText, styles.disabledText]}>
            Mis puntos.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={servicioTecnico}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.buttonIcon}
            source={require('../../assets/img/atencion.png')}
          />
          <Text style={styles.buttonText}>Atención al cliente.</Text>
        </View>
      </TouchableOpacity>

      <Button
        mode="contained"
        style={styles.cerrarSesion}
        onPress={cerrarSesion}>
        Cerrar sesión
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(94,96,206,0.70)',
    fontFamily: 'Questrial-Regular',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 2,
  },
  imageUser: {
    width: 70,
    height: 70,
    borderColor: 'rgba(83,144,217,0.75)',
    borderWidth: 2,
    borderRadius: 45,
    padding: 30,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'rgba(83,144,217,0.75)',
    borderRadius: 20,
    width: 250,
    marginLeft: 2,
    padding: 2,
  },

  email: {
    fontSize: 18,
    paddingVertical: 10,
    marginLeft: 5,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    color: 'rgba(94,96,206,0.70)',
    fontFamily: 'Questrial-Regular',
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(94,96,206,0.25)',
    backgroundColor: 'rgba(94,96,206,0.30)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Questrial-Regular',
    textAlign: 'center',
    marginLeft: 10,
  },
  cerrarSesion: {
    fontFamily: 'Questrial-Regular',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginVertical: 30,
    marginLeft: 110,
    backgroundColor: 'rgba(83,144,217,0.75)',
    width: 150,
  },
  disabledText: {
    color: '#888',
  },
});

export default Settings;
