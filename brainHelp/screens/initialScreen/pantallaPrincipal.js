import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import Settings from '../SettingsScreen/Settings';

import PantallaOpciones from '../logScreen/PantallaOpciones';

const principal = () => <PantallaOpciones />;
const AlbumsRoute = () => <Settings />;

const PantallaPrincipal = ({ navigation, route }) => {
  const datos = route.params.datos;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'principal', title: 'Home', icon: require('../../assets/img/myIcon.png') },
    { key: 'settings', title: 'Mi cuenta', icon: require('../../assets/img/mySettingsIcon.png') },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'principal':
        return <PantallaOpciones datos={datos} navigation={navigation} route={route} />;
      case 'settings':
        return <Settings datos={datos} navigation={navigation} route={route} />;
      default:
        return null;
    }
  };

  const renderIcon = ({ route, focused }) => {
    return (
      <Image
        source={route.icon}
        style={[styles.icon, focused ? styles.activeIcon : null]}
      />
    );
  };

  return (
    <>
      <BottomNavigation
        barStyle={{ backgroundColor: 'rgba(83, 144, 217, 0.6)' }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        theme={{ colors: { secondaryContainer: 'rgba(94, 96, 206, 0.25)' } }}
      />
    </>
  );
};

export default PantallaPrincipal;

const styles = StyleSheet.create({
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
    fontSize: 20,
    marginTop: 1,
    marginRight: 20,
    color: '#5E60CE',
    fontFamily: 'Questrial-Regular',
  },

  contenedorOpciones: {
    backgroundColor: '#CACDF4',
    borderRadius: 20,
    width: 350,
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  imagen: {
    width: 60,
    height: 61,
    marginLeft: 20,
  },
  contenedorTexto: {
    flex: 1,
    padding: 10,
  },
  texto: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginRight: 20,
    color: '#6247AA',
    fontFamily: 'Questrial-Regular',
  },
  button: {
    backgroundColor: '#7251B5',
    borderRadius: 20,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    tintColor: '#3a3b9c', // Cambia el color activo según tus necesidades
  },
});
