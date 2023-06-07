import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Registro = ({ navigation, route }) => {
  const { goBack } = useNavigation();
  const atras = () => {
    goBack();
  };
  const image = require('../../assets/img/fondoRegistro.png');

  const [nombreUsuario, setNombre] = useState('');
  const [apellidosUsuario, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const registro = async () => {
    if (
      nombreUsuario.trim() === '' ||
      apellidosUsuario.trim() === '' ||
      email.trim() === '' ||
      contrasena.trim() === ''
    ) {
      console.log('Campos vacios');
      Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }]);
      return;
    } else if (contrasena.length < 8) {
      console.log('Contraseña demasiado corta');
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres', [{ text: 'OK' }]);
      return;
    } else if (!isValidEmail(email)) {
      console.log('Email no válido');
      Alert.alert('Error', 'Por favor, introduce un email válido', [{ text: 'OK' }]);
      return;
    } else {
      try {
        // Realizar la solicitud a la API
        const ipAddressResponse = await fetch('https://dns.google/resolve?name=harishan.hopto.org&type=A');
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const user = { nombreUsuario, apellidosUsuario, email, contrasena };
        const response = await axios.post('http://' + ipAddress + ':4672/BrainHelp_TFG/api/usuario/', user);

        if (response.data.message === 'Lo sentimos, este usuario ya existe con este email') {
          console.log('Este usuario ya está registrado');
          Alert.alert('Error', 'Este usuario ya está registrado', [{ text: 'OK' }]);
        } else if (response.data.message === 'Usuario registrado correctamente') {
          console.log('Usuario nuevo registrado');
          Alert.alert('Usuario registrado correctamente', 'Redirigiendo a la pantalla de inicio de sesión');
          setTimeout(() => { navigation.navigate('InicioSession'); }, 2000);

        } else {
          console.log('Error en la respuesta de la API');
          Alert.alert('Error', 'Error en la respuesta de la API', [{ text: 'OK' }]);
        }
      } catch (error) {
        console.log('Error en la solicitud a la API', error);
        Alert.alert('Error', 'Error en la solicitud a la API', [{ text: 'OK' }]);
      }
    }
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover">
      <ScrollView>
        <View>
          <Text style={globalStyles.tituloRegistro}>Registrate</Text>
          <Text style={globalStyles.subtituloRegistro}>
            ¡Y disfruta de todas nuestras ventajas!{' '}
          </Text>
        </View>
        <View>
          <TextInput
            style={globalStyles.inputRegistro}
            label={'Nombre'}
            mode="outlined"
            value={nombreUsuario}
            left={<TextInput.Icon icon={'account'} color="#22C55E" />}
            placeholder={'Ej: Juan'}
            onChangeText={texto => setNombre(texto)}
          />
        </View>
        <View>
          <TextInput
            style={globalStyles.inputRegistro}
            mode="outlined"
            value={apellidosUsuario}
            left={
              <TextInput.Icon icon={'account-arrow-right'} color="#22C55E" />
            }
            label={'Apellidos'}
            placeholder={'Ej: Pérez Pérez'}
            onChangeText={texto => setApellidos(texto)}
          />
          <TextInput
            style={globalStyles.inputRegistro}
            mode="outlined"
            label={'E-mail'}
            value={email}
            placeholder={'Ej: correo@correo.com'}
            keyboardType='email-address'
            onChangeText={texto => setEmail(texto)}
            left={<TextInput.Icon icon={'email-outline'} color="#22C55E" />}
          />
          <TextInput
            style={globalStyles.inputRegistro}
            mode="outlined"
            label={'Contraseña'}
            color="#22C55E"
            secureTextEntry
            value={contrasena}
            placeholder={'Ej: 1234Ab.'}
            onChangeText={texto => setContrasena(texto)}
            left={<TextInput.Icon icon={'lock-outline'} color="#22C55E" />}
          />

          <Button
            icon={'login'}
            style={globalStyles.botonesRegistro}
            mode="contained"
            onPress={registro}>
            Registrarse
          </Button>
          <Button
            icon={'keyboard-backspace'}
            style={globalStyles.botonesAtras}
            mode="contained">
            Atrás
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  botonAtras: {
    marginTop: 10,
    marginBottom: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    width: 300,
    backgroundColor: '#56CFE1',
  },
});

export default Registro;
