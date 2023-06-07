import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import globalStyles from '../../../Styles/global';
import {TextInput, Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {formatDateToDisplay, formatearFecha} from '../../../utils/index';
import {formatearFechaDD} from '../../../utils/formatoDDMMAA';

const Configuracion = ({navigation, route}) => {
  const {datos, idUsuario} = route.params;
  console.log('Datos:', datos);
  const [nombre, setNombre] = useState(datos.nombreUsuario);
  const [apellidos, setApellidos] = useState(datos.apellidosUsuario);
  const [email, setEmail] = useState(datos.email);
  const [contrasena, setContrasena] = useState(datos.contrasena);
  const {goBack} = useNavigation();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;

        const response = await axios.get(
          `http://` +
            ipAddress +
            `:4672/BrainHelp_TFG/api/usuario/consultar/${idUsuario}`,
        );
        const datosActualizados = response.data.body;
        console.log('Respuesta');
        console.log(datosActualizados.nombreUsuario);
        setNombre(datosActualizados.nombreUsuario);
        console.log('El nombre es ' + datosActualizados.nombreUsuario);

        setApellidos(datosActualizados.apellidosUsuario);
        setEmail(datosActualizados.email);
        setContrasena(datosActualizados.contrasena);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatos();
  }, [navigation]);

  console.log('Datos:', datos);
  console.log('Id usuario:', idUsuario);
  console.log('Nombre:', nombre);
  console.log('Apellidos:', apellidos);
  console.log('Email:', email);
  console.log('Contraseña:', contrasena);

  const guardarCambios = async () => {
    if (
      nombre.trim() === '' ||
      apellidos.trim() === '' ||
      email.trim() === '' ||
      contrasena.trim() === ''
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}]);
      return;
    } else {
      const usuarioActualizado = {
        nombreUsuario: nombre.trim() !== '' ? nombre : datos.nombreUsuario,
        apellidosUsuario:
          apellidos.trim() !== '' ? apellidos : datos.apellidosUsuario,
        email: email.trim() !== '' ? email : datos.email,
        contrasena: contrasena.trim() !== '' ? contrasena : datos.contrasena,
        id_Usuario: idUsuario,
      };

      console.log('Usuario actualizado:', usuarioActualizado);
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const resultado = await axios.post(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/usuario/actualizar',
          usuarioActualizado,
        );
        console.log('Resultado:', resultado.data);
        console.log('Usuario actualizado:', usuarioActualizado);
        Alert.alert('Éxito', 'Cambios guardados correctamente', [{text: 'OK'}]);
        goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <View>
        <Text style={styles.title}>Configuración de cuenta</Text>
        <Text style={styles.subtitulo}>Mis datos:</Text>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          left={<TextInput.Icon icon={'account-arrow-right'} color="#6071D7" />}
          placeholder="Ejemplo: Juan"
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          left={
            <TextInput.Icon
              icon={'account-arrow-right-outline'}
              color="#6071D7"
            />
          }
          placeholder="Ejemplo: Pérez Pérez"
          onChangeText={setApellidos}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Ejemplo:correo@correo.com"
          left={<TextInput.Icon icon={'email'} color="#6071D7" />}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={contrasena}
          placeholder="Ejemplo: 123456"
          onChangeText={setContrasena}
          left={<TextInput.Icon icon={'lock'} color="#6071D7" />}
        />
        <Image
          style={styles.imagenRegistro}
          source={require('../../../assets/img/userEdit.png')}
        />
        <Button
          title="Guardar Cambios"
          onPress={guardarCambios}
          mode="contained"
          style={styles.guardarInfo}>
          Guardar Cambios
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 20,
    color: 'rgba(83, 144, 217, 1)',
  },
  input: {
    height: 40,
    borderColor: 'rgba(83, 144, 217, 0.25)',
    backgroundColor: 'rgba(83, 144, 217, 0.25)',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: 300,
    marginLeft: 25,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'rgba(83, 144, 217, 0.60)',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
    marginHorizontal: 20,
    color: 'rgba(83, 144, 217, 0.75)',
  },
  imagenRegistro: {
    width: '80%',
    height: 200,
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  guardarInfo: {
    width: 300,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#8187dc',
  },
});

export default Configuracion;
