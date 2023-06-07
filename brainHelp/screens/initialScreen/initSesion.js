import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const InicioSession = ({navigation, route}) => {
  const {goBack} = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault(); // Prevent default action
      unsubscribe(); // Unsubscribe the event on first call to prevent infinite loop
      navigation.navigate('PantallaAcceso'); // Navigate to your desired screen
    });
  }, []);

  const image = {
    uri: 'https://img.freepik.com/free-vector/purple-pastel-fluid-design-poster-vector_53876-93499.jpg?w=740&t=st=1684252659~exp=1684253259~hmac=e5ff279e338b200256bf3bf6945d1edca8e304af78cc0ea185703093e299aaf3',
  };
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  console.log('*****************************');
  const inicioSession = async () => {
    try {
      console.log('*****************************');
      console.log(email);
      console.log(pass);

      // For a given hostname, returns a promise that resolves with an array of strings
      // containing all of the ip addresses associated with the hostname.
      const ipAddressResponse = await fetch(
        'https://dns.google/resolve?name=harishan.hopto.org&type=A',
      );
      const ipAddressData = await ipAddressResponse.json();
      const ipAddress = ipAddressData.Answer[0].data;
      console.log('*****************************');
      console.log(ipAddress);
      const login = await axios.post(
        'http://' + ipAddress + ':4672/BrainHelp_TFG/api/usuario/login',
        //  'http://192.168.8.120:8080/api/usuario/login',
        null,
        {params: {email, pass}},
      );
      console.log(login.data.body.email);
      if (login.data.body.email === null) {
        console.log('Lo sentimos, no está registrado este usuario');
        Alert.alert('Error', 'Lo sentimos, no está registrado este usuario', [
          {
            text: 'Ok',
          },
        ]);
        setEmail('');
        setPass('');
        return;
      } else {
        console.log('Usuario registrado');
        navigation.navigate('PantallaPrincipal', {datos: login.data.body});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const atras = () => {
    goBack();
  };
  return (
    <ImageBackground
      source={image}
      style={{flex: 1, width: '100%', height: '100%'}}
      resizeMode="cover">
      <ScrollView>
        <View style={globalStyles.contenedorInicio}>
          <Text style={globalStyles.tituloInicioSession}>¡Hola de nuevo!</Text>
          <Text style={globalStyles.subtituloInicioSession}>
            Me alegro de volver a verte.{' '}
          </Text>
        </View>
        <View>
          <TextInput
            style={globalStyles.inputInicioSession}
            mode="outlined"
            left={<TextInput.Icon icon={'email-outline'} color="#22C55E" />}
            label={'E-mail'}
            placeholder={'Ej: correo@correo.com'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={correo => setEmail(correo)}
          />
          <TextInput
            style={globalStyles.inputInicioSession}
            mode="outlined"
            label={'Contraseña'}
            color="#22C55E"
            secureTextEntry
            value={pass}
            placeholder={'Ej: 1234Ab.'}
            onChangeText={contra => setPass(contra)}
            left={<TextInput.Icon icon={'lock-outline'} color="#22C55E" />}
          />

          <Button
            icon={'account-arrow-right'}
            style={globalStyles.botonesRegistro}
            onPress={inicioSession}
            mode="contained">
            Iniciar sesión
          </Button>

          <Button
            icon={'keyboard-backspace'}
            style={globalStyles.botonesAtras}
            mode="contained"
            onPress={atras}>
            Atrás
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default InicioSession;
