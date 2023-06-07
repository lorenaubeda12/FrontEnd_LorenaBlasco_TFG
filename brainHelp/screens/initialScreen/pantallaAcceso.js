import React, {useEffect} from 'react';
import {View, Image, ScrollView, Text, Pressable} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import globalStyles from '../../Styles/global';
import {useNavigation} from '@react-navigation/native';

const PantallaAcceso = ({navigation}) => {


  navigation.setOptions({
    headerLeft: null
  });

  const usando = () => {
    console.log('Presionado');
  }

  const account = () => {
    console.log('Presionado');
    navigation.navigate('InicioSession');
  };

  const registrarse = () => {
    navigation.navigate('registro');
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={globalStyles.contendor}>
        <Text style={globalStyles.tituloAcceso}>¡Bienvenido!</Text>
        <Text style={globalStyles.subtituloAcceso}>
          ¡Tú vida sin dolor comienza ahora!
        </Text>
        <Image
          style={globalStyles.imagenAcceso}
          source={require('../../assets/img/brainAcceso.jpg')}></Image>

          <Button 
          icon={'account'}
          style={globalStyles.botonesAcceso}
          mode="contained" onPress={account}>
            Iniciar Sesión
          </Button>
          <Button 
          icon={'google'}
          style={globalStyles.botonesAcceso}
          mode="contained" onPress={usando}
          disabled={true}>
            Iniciar Sessión con Google
          </Button>

          <View style={globalStyles.registrarse}>
            <Text style={globalStyles.registrate}>¿No tienes cuenta? {' '}</Text>
            <Pressable  onPress={registrarse} ><Text style={globalStyles.registrarseTexto}>Registrate</Text></Pressable>
          </View>
      </View>
    </ScrollView>
  );
};

export default PantallaAcceso;
