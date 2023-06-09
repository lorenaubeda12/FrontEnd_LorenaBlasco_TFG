import React, {useEffect, useState} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {formatearFecha} from '../../utils';

const PantallaPrincipalRegistros = ({navigation, route}) => {
  const {datos} = route.params;
  const [registros, setRegistros] = useState([]);
  const correo = datos.email;
  console.log('Datos:', datos);
  console.log('email:', datos.email);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;
        const response = await axios.get(
          `http://` +
            ipAddress +
            `:4672/BrainHelp_TFG/api/regis/misRegistros/${datos.id_Usuario}`,
        );
        const responseData = response.data;
        if (responseData.type === 'data' && responseData.rpta === 1) {
          const registrosData = responseData.body;
          setRegistros(registrosData);
          console.log('Registros:', registrosData);
        } else {
          console.log('Error en la respuesta:', responseData);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fetchRegistros();
  }, [useIsFocused()]);

  const conversorHoras = duracion => {
    let horas = Math.floor(duracion / 60);
    let minutos = duracion % 60;

    // Añade ceros a la izquierda si los minutos son menores a 10
    const minutosString = minutos < 10 ? `0${minutos}` : minutos.toString();

    // Retorna el tiempo en formato "horas:minutos"
    return `${horas} horas y ${minutosString} minutos`;
  };

  const generarPDF = async () => {
    try {
      const ipAddressResponse = await fetch(
        'https://dns.google/resolve?name=harishan.hopto.org&type=A',
      );
      const ipAddressData = await ipAddressResponse.json();
      const ipAddress = ipAddressData.Answer[0].data;
      const response = await axios.post(
        'http://'+ipAddress +':8000/generar-pdf',
        {
          registros: registros,
          correo: correo, // Reemplaza con la propiedad correcta que contiene el correo electrónico del usuario
        },
      );
      console.log('PDF generado correctamente');
      Alert.alert(
        'PDF generado correctamente',
        'Este será enviado a su correo electrónico registrado',
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      console.error(error.response.data);
      Alert.alert(
        'No se creo el PDF',
        'No se ha podido crear el pdf, intentelo más tarde',
        [{text: 'OK'}],
      );
    }
  };

  const borrarRegistro = async id => {
    Alert.alert(
      'Eliminar registro',
      '¿Estás seguro que deseas eliminar este registro?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const ipAddressResponse = await fetch(
                'https://dns.google/resolve?name=harishan.hopto.org&type=A',
              );
              const ipAddressData = await ipAddressResponse.json();
              const ipAddress = ipAddressData.Answer[0].data;

              const response = await axios.post(
                `http://` +
                  ipAddress +
                  `:4672/BrainHelp_TFG/api/regis/borrar/${id}`,
              );
              const responseData = response.data;
              if (responseData.type === 'data' && responseData.rpta === 1) {
                const registrosActualizados = registros.filter(
                  registro => registro.id_Registro !== id,
                );
                console.log(registrosActualizados);
                setRegistros(registrosActualizados);
                Alert.alert(
                  'Éxito',
                  'El registro ha sido borrado correctamente',
                  [{text: 'OK'}],
                );
              } else {
                console.log('Error en la respuesta:', responseData);
                Alert.alert('Error', 'No se pudo borrar el registro', [
                  {text: 'OK'},
                ]);
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'No se pudo borrar el registro', [
                {text: 'OK'},
              ]);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <View style={styles.contenedorTitulo}>
        <Headline style={styles.titulo}>Mis registros</Headline>
      </View>

      {registros.length === 0 ? (
        <View style={styles.contenedorSinRegistros}>
          <Text style={styles.textoSinRegistros}>
            No hay registros disponibles
          </Text>
          <Image source={require('../../assets/img/sinRegistro.png')} />
        </View>
      ) : (
        <View style={styles.contenedorRegistros}>
          <View>
            <Button
              mode="elevated"
              onPress={generarPDF}
              style={styles.botones}
              icon={'file-pdf-box'}>
              Generar PDF
            </Button>
          </View>
          <View>
            <Button
              mode="elevated"
              style={styles.botones}
              icon={'chart-timeline-variant'}>
              Generar Gráficos
            </Button>
          </View>

          {registros.map(registro => (
            <View style={styles.registroContainer} key={registro.id_Registro}>
              <View style={styles.registroHeader}>
                <Image
                  source={require('../../assets/img/brain.png')}
                  style={styles.imagenRegistro}
                />
                <View style={styles.lineaVertical} />
                <View style={styles.contenedorTexto}>
                  <Text style={styles.label}>Fecha:</Text>
                  <Text style={styles.subtituloFecha}>
                    {formatearFecha(registro.fechaRegistro)}
                  </Text>
                  <View style={styles.textoContenedor}>
                    <View style={styles.contenedorFecha}>
                      <Text style={styles.label}>Duración:</Text>
                      <Text style={styles.subtitulo}>
                        {conversorHoras(registro.duracionCrisis)}
                      </Text>
                    </View>
                    <View style={styles.contenedorHora}>
                      <Text style={styles.label}>Medicamento consumido:</Text>
                      <Text style={styles.subtitulo}>
                        {registro.id_Medicacion.tipoMedicacion}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.contenedorMedico}>
                    <Text style={styles.label}>Intensidad:</Text>
                    <Text style={styles.subtitulo}>{registro.intensidad}</Text>
                  </View>
                  <View style={styles.textoContenedor}>
                    <View style={styles.contenedorCategoria}>
                      <Text style={styles.label}>Causa:</Text>
                      <Text style={styles.subtitulo}>
                        {registro.id_Desencadenante.tipo}
                      </Text>
                    </View>
                    <View style={styles.contenedorMedico}>
                      <Text style={styles.label}>Dolor experimentado:</Text>
                      <Text style={styles.subtitulo}>
                        {registro.id_Dolor.tipo}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.contenedorBotones}>
                <Button
                  mode="contained"
                  style={styles.buttonBorrar}
                  icon={'delete-empty'}
                  onPress={() => borrarRegistro(registro.id_Registro)}
                  labelStyle={styles.buttonBorrarText}>
                  Borrar
                </Button>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedorBotones: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  contenedorRegistros: {
    flex: 1,
    alignItems: 'center',
  },
  registroContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  registroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagenRegistro: {
    width: 70,
    height: 70,
  },
  lineaVertical: {
    width: 2,
    height: '100%',
    backgroundColor: '#8187dc',
    marginHorizontal: 10,
  },
  contenedorTexto: {
    flex: 1,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 2,
    marginTop: 5,
    marginLeft: 15,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  subtitulo: {
    fontFamily: 'Questrial-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#5E60CE',
    marginLeft: 30,
  },
  contenedorSinRegistros: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  textoSinRegistros: {
    fontSize: 18,
    textAlign: 'center',
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },
  buttonBorrar: {
    borderRadius: 20,
    backgroundColor: '#ab3585',
    width: '50%',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonBorrarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contenedorTitulo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  titulo: {
    fontFamily: 'Questrial-Regular',
    fontSize: 30,
    textAlign: 'center',
    color: '#5E60CE',
    fontWeight: 'bold',
  },
  subtituloFecha: {
    fontFamily: 'Questrial-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#5E60CE',
    marginLeft: 15,
  },
  botones: {
    borderRadius: 20,
    width: 200,
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default PantallaPrincipalRegistros;
