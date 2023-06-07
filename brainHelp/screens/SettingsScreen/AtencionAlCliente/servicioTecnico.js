import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { Appbar, Card, Title, Paragraph, Colors, TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../../Styles/global';
import { useNavigation } from '@react-navigation/native';

const TechnicalSupportScreen = () => {
  const navigation = useNavigation();
  const [selectedError, setSelectedError] = useState('');
  const [errorReason, setErrorReason] = useState('');

  const handlePickerChange = value => {
    setSelectedError(value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos del formulario
    Alert.alert('Datos enviados', 'Gracias por contactar con nosotros', [
      {
        text: 'Aceptar',
      },
    ]);
    setErrorReason('');
    console.log('Error seleccionado:', selectedError);
    console.log('Razones del error:', errorReason);
  };

  return (
    <ScrollView style={[globalStyles.contenedorBordes, globalStyles.contendor]}>
      <Text style={styles.texto}>Servicio técnico</Text>
      <View style={styles.contenedorDatos}>
        <Text style={styles.subdatosInteres}>servicioTecnico@brainhelp.es</Text>
        <Text style={styles.subdatosInteres}>Horario de consulta:</Text>
        <Text style={styles.horario}>Lunes a Viernes: 9:00 a  19:00</Text>
        <Text style={styles.horario}>Sábados: 9:00 a 14:00</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.titulo}>¡Bienvenido al servicio técnico de nuestra aplicación!</Title>
          <Paragraph style={styles.subtitulo}>
            Si tienes alguna pregunta, duda o problema técnico, no dudes en contactarnos. Estamos aquí para ayudarte.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.formContainer}>
        <Title>Selecciona el error:</Title>
        <Picker
          selectedValue={selectedError}
          onValueChange={handlePickerChange}
          style={styles.picker}
        >
          <Picker.Item label="No se genera el PDF" value="Error 1" />
          <Picker.Item label="No me muestran mis registros" value="Error 2" />
          <Picker.Item label="No puedo crear un nuevo registro" value="Error 3" />
          <Picker.Item label="No puedo borrar registros" value="Error 4" />
          <Picker.Item label="No puedo crear citas nuevas" value="Error 5" />
          <Picker.Item label="No puedo ver mis citas registradas" value="Error 6" />
          <Picker.Item label="No borrar citas" value="Error 7" />
          <Picker.Item label="Otro problema" value="Error 8" />
        </Picker>

        <TextInput
          label="Indique la razón del error"
          value={errorReason}
          onChangeText={setErrorReason}
          multiline
          style={styles.textInput}
        />

        <Image
          source={require('../../../assets/img/tecnicalService.png')}
          style={styles.image}
        />

        <Button mode="elevated" onPress={handleSubmit} style={styles.button}>
          <Text style={styles.textoButton}>Enviar</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#6b8ce6',
  },
  card: {
    margin: 16,
    backgroundColor: '#f2f7ff',
  },
  formContainer: {
    padding: 16,
  },
  picker: {
    marginTop: 16,
    backgroundColor: '#f2f7ff',
  },
  textInput: {
    marginTop: 16,
    minHeight: 100,
    backgroundColor: '#f2f7ff',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 20,
    marginBottom: 3,
    backgroundColor: '#70b8ff',
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#6071d7',
    marginHorizontal: 16,
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 16,
    fontSize: 15,
    color: '#6b77ff',
    textAlign: 'justify',
  },
  subdatosInteres: {
    fontSize: 15,
    textAlign: 'justify',
    marginTop: 1,
    fontWeight: 'bold',
    marginBottom: 3,
    marginHorizontal: 16,
  },
  contenedorDatos: {
    marginHorizontal: 16,
    borderBottomColor: '#d9adfa',
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderRadius: 5,
  },
  horario: {
    fontSize: 15,
    textAlign: 'justify',
    marginTop: 1,
    marginBottom: 3,
    marginHorizontal: 16,
  },
  textoButton: {
    color: '#fff',
  },
});

export default TechnicalSupportScreen;
