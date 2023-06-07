import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {formatearFecha} from '../../utils';
import globalStyles from '../../Styles/global';

const AniadirRegistro = ({navigation, route}) => {
  //Otros
  const [date, setDate] = useState(new Date());
  const {id_Usuario} = route.params;
  const {datos} = route.params;
  console.log(id_Usuario);
  const [open, setOpen] = useState(false);
  const handleCita = () => {
    console.log('Añadiendo cita');
    return;
  };

  //formato fecha
  let today = new Date();

  let fecha =
    date.getFullYear() +
    '-' +
    parseInt(date.getMonth() + 1) +
    '-' +
    date.getDate();

  const fechaFormateada = formatearFecha(fecha);
  console.log(fecha);

  const continuar = () => {
    navigation.navigate('RegistroHoraMedicacion', {
      fecha: fecha,
      id_Usuario: datos.id_Usuario,
      datos:datos,
    });
  };

  return (
    <View style={[globalStyles.contendor, globalStyles.contenedorBordes]}>
      <Text style={styles.titulo}>1.Día de la crisis</Text>
      <Text style={styles.subtitulo}>¿Cuándo sufriste la crisis?</Text>
      <View style={styles.campo}>
        <Text style={styles.label}>Sufri la crisis el día:</Text>
        <Text style={styles.fecha}>{fechaFormateada}</Text>
        <Text style={styles.label}>Elegir fecha:</Text>
        <View style={styles.contenedorFecha}>
          <DatePicker
            date={date}
            mode="date"
            onDateChange={date => setDate(date)}
            locale="es"
          />
        </View>
        <Button
          mode="contained"
          icon={'arrow-right-bold-outline'}
          style={styles.botonContinua}
          onPress={() => continuar()}>
          Continuar
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  titulo: {
    marginBottom: 2,
    marginTop: 15,
    fontSize: 15,
    marginLeft: 30,
    color: '#000',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'left',
  },
  subtitulo: {
    marginBottom: 6,
    marginTop: 3,
    fontSize: 25,
    marginLeft: 30,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnNuevaCita: {
    marginVertical: 50,
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  fecha: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#5E60CE',
    textAlign: 'center',
    marginBottom: 30,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenedorFecha: {
    borderRadius: 20,
    padding: 10,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
  botonContinua: {
    width: 300,
    marginTop: 60,
    fontFamily: 'Questrial-Regular',
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: '#8187dc',
  },
});

export default AniadirRegistro;
