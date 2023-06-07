import React, { useEffect, useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';

const PantallaPrincipalCitas = ({ navigation, route }) => {
  const { datos } = route.params;
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;

        const response = await axios.get(
          `http://` + ipAddress + `:4672/BrainHelp_TFG/api/citas/todas/${datos.id_Usuario}`
        );
        const responseData = response.data;
        if (responseData.type === 'data' && responseData.rpta === 1) {
          const citasData = responseData.body;
          setCitas(citasData);
        } else {
          console.log('Error en la respuesta:', responseData);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch medications');
      }
    };

    fetchCitas();
  }, [useIsFocused()]);

  const borrarCita = async (id) => {
    Alert.alert('Eliminar cita', '¿Estás seguro que deseas eliminar esta cita?', [
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
              `https://dns.google/resolve?name=harishan.hopto.org&type=A`,
            );
            const ipAddressData = await ipAddressResponse.json();
            const ipAddress = ipAddressData.Answer[0].data;
              
            const response = await axios.post(
              `http://` + ipAddress + `:4672/BrainHelp_TFG/api/citas/borrar/${id}`,	
            );
            const responseData = response.data;
            if (responseData.type === 'data' && responseData.rpta === 1) {
              const citasActualizadas = citas.filter((cita) => cita.id_Cita !== id);
              setCitas(citasActualizadas);
              Alert.alert('Éxito', 'La cita ha sido borrada correctamente', [
                { text: 'OK' },
              ]);
            } else {
              console.log('Error en la respuesta:', responseData);
              Alert.alert('Error', 'No se pudo borrar la cita', [{ text: 'OK' }]);
            }
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo borrar la cita', [{ text: 'OK' }]);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <View>
        <View style={styles.contenedorOpciones}>
          <Image
            source={require('../../assets/img/doctor.png')}
            style={styles.imagen}
          />
          <Text style={styles.textoSubtitulo}>Mis citas</Text>
        </View>
      </View>
      <View>
        <View style={styles.contenedores}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() =>
              navigation.navigate('AniadirCita', {
                datos: datos,
                id_Usuario: datos.id_Usuario,
              })
            }>
            Añadir una cita
          </Button>
        </View>
        {citas.length > 0 ? (
         <View>
         {citas.map(cita => (
           <View style={styles.contenedor} key={cita.id_Cita}>
             <View style={styles.contenedorDatos}>
               <Image
                 source={require('../../assets/img/medico.png')}
                 style={styles.imagenCita}
               />
               <View style={styles.lineaVertical} />
               <View style={styles.contenedorTexto}>
                 <Text style={styles.label}>Lugar:</Text>
                 <Text style={styles.subtitulo}>{cita.lugar}</Text>
                 <View style={styles.textoContenedor}>
                   <View style={styles.contenedorFecha}>
                     <Text style={styles.label}>Fecha:</Text>
                     <Text style={styles.subtitulo}>{cita.fecha}</Text>
                   </View>
                   <View style={styles.contenedorHora}>
                     <Text style={styles.label}>Hora:</Text>
                     <Text style={styles.subtitulo}>{cita.hora}</Text>
                   </View>
                 </View>
                 <View style={styles.textoContenedor}>
                   <View style={styles.contenedorCategoria}>
                     <Text style={styles.label}>Categoría:</Text>
                     <Text style={styles.subtitulo}>{cita.razonCita}</Text>
                   </View>
                   <View style={styles.contenedorMedico}>
                     <Text style={styles.label}>Médico:</Text>
                     <Text style={styles.subtitulo}>{cita.medico}</Text>
                   </View>
                 </View>
               </View>
             </View>
             <Button
               mode="elevated"
               style={styles.buttonBorrar}
               onPress={() => borrarCita(cita.id_Cita)}
               labelStyle={styles.buttonBorrarText} >
               Borrar
             </Button>
           </View>
         ))}
       </View>
        ) : (
          <View style={styles.contenedorSinCitas}>
             <Text style={styles.textoSinCitas}>No tienes citas programadas</Text>
            <ImageBackground
              source={require('../../assets/img/noCitas.jpg')}
              style={styles.imagenSinCitas}
              resizeMode="contain">     
            </ImageBackground>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedorOpciones: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textoSubtitulo: {
    fontFamily: 'Questrial-Regular',
    fontSize: 20,
    color: '#5E60CE',
  },
  contenedores: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5E60CE',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: '80%',
  },
  contenedorCita: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contenedorTexto: {
    flex: 1,
  },
  textoTitulo: {
    fontFamily: 'Questrial-Regular',
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  textoFecha: {
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  textoDescripcion: {
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  botonBorrar: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoBotonBorrar: {
    fontFamily: 'Questrial-Regular',
    fontSize: 14,
    color: '#FFF',
  },
  contenedorSinCitas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  imagenSinCitas: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  textoSinCitas: {
    fontSize: 18,
    textAlign: 'center',
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
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
    fontSize: 35,
    marginLeft: 10,
    marginTop: 1,
    marginRight: 20,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },
  subtitulo: {
    fontFamily: 'Questrial-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#5E60CE',
    marginLeft: 30,
  },
  contenedorOpciones: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 2,
  },
  imagen: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  contenedorDatos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imagenCita: {
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
  button: {
    borderRadius: 20,
    width: 200,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  buttonBorrar: {
    marginLeft: 100,
    borderRadius: 20,
    backgroundColor: '#b100e8',
    width: 200,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    color: 'white',
  },
  contenedor: {
    paddingTop: 5,
    flex: 1,
    marginTop: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 3,
    borderColor: '#8187dc',
    borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  contenedores: {
    marginTop: 2,
    marginHorizontal: 75,
    marginVertical: 5,
    borderRadius: 10,
  },
  textoContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contenedorFecha: {
    marginRight: 20,
  },
  contenedorHora: {
    marginLeft: 20,
  },
  contenedorCategoria: {
    marginRight: 20,
  },
  contenedorMedico: {
    marginLeft: 20,
  },
  buttonBorrarText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PantallaPrincipalCitas;