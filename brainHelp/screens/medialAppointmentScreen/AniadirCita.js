import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import axios from 'axios';
import moment from 'moment';

export default function App({navegation, route}) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [medico, setMedico] = useState('');
  const [razon, setRazon] = useState('');
  const {id_Usuario} = route.params;
  const navigation = useNavigation();
  const {datos} = route.params;
  const onDateChange = date => {
    setFecha(date);
    console.log(fecha);
  };
  const formattedFecha = moment(fecha).format('YYYY-MM-DD'); // Formatear la fecha

  const guardarFecha = async () => {
    if (
      fecha === '' ||
      hora === '' ||
      lugar === '' ||
      medico === '' ||
      razon === ''
    ) {
      console.log('Campos vacios');
      Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'OK'}]);
      return;
    } else {
      console.log('Campos llenos');
      console.log('Fecha: ' + formattedFecha);
      console.log('Hora: ' + hora);
      console.log('Lugar: ' + lugar);
      console.log('Medico: ' + medico);
      console.log('Razon: ' + razon);
      console.log('Id_Usuario: ' + id_Usuario);

      try {
        const cita = {
          fecha: formattedFecha,
          hora: hora,
          lugar: lugar,
          medico: medico,
          razonCita: razon,
          activo: true,
          id_Usuario: {
            id_Usuario: id_Usuario,
          },
        };
        console.log(cita);
        const ipAddressResponse = await fetch(
          'https://dns.google/resolve?name=harishan.hopto.org&type=A',
        );
        const ipAddressData = await ipAddressResponse.json();
        const ipAddress = ipAddressData.Answer[0].data;

        const response = await axios.post(
          'http://' + ipAddress + ':4672/BrainHelp_TFG/api/citas',
          cita,
        );
        if (response.data.type === 'data' && response.data.rpta === 1) {
          Alert.alert('Cita añadida correctamente');
          navigation.navigate('finalCitas', { datos: datos });
        }
      } catch (error) {
        console.log('Error en la solicitud a la API', error);
      }
    }
  };

  return (
    <ScrollView style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <View style={styles.container}>
        <Text>Añadir cita médica</Text>
        <View>
          <Text style={styles.label}>Lugar:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLugar}
            value={lugar}
            placeholder="Ej: Hospital de la Ribera"
          />

          <Text style={styles.label}>Hora:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHora}
            value={hora}
            placeholder="Ej: 09:00"
          />
          <Text style={styles.label}>Médico:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMedico}
            value={medico}
            placeholder="Ej: Dr. Juan Pérez"
          />
          <Text style={styles.label}>Razón de la cita:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRazon}
            value={razon}
            placeholder="Ej: Revisión anual"
          />
        </View>
      </View>
      <Text style={[styles.fecha]}>Fecha:</Text>
      <View>
        <CalendarPicker
          onDateChange={onDateChange}
          weekdays={['D', 'L', 'M', 'Mi', 'J', 'V', 'S']}
          months={[
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
          ]}
          selectedDayTextColor="#FFF"
          selectedDayColor="#9163CB"
          todayTextStyle={{fontWeight: 'bold', color: '#fff'}}
          previousTitle="Anterior"
          nextTitle="Próximo"
          showTime={false}
          style={styles.calendar}
        />
      </View>
      <View style={globalStyles.contenedorBotones}>
        <Button
          mode="contained"
          icon="content-save"
          style={styles.button}
          onPress={guardarFecha}>
          Guardar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 3,
    marginHorizontal: 4,
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
  fecha: {
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 15,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  button: {
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  input: {
    fontFamily: 'Questrial-Regular',
    fontSize: 18,
    height: 40,
    width: 350,
    margin: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(159, 160, 255, 0.25)',
  },
});
