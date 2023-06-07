import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import PantallaOpciones from '../screens/logScreen/PantallaOpciones';
import { BottomNavigation } from 'react-native-paper';
import AniadirRegistro from '../screens/logScreen/AniadirRegistro';
const principal = () => <PantallaOpciones />;
const AlbumsRoute = () => <AniadirRegistro />;
const RecentsRoute = () => <AniadirRegistro />;

const BarraNavegacion = ({ navigation, route}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'principal', title: 'Home', icon: 'home' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    principal: () => <PantallaOpciones datos={datos} navigation={navigation} route={route} />,
    albums: () => <AniadirRegistro />,
    recents: () => <AniadirRegistro />,
  });

  return (
    <>
      <BottomNavigation 
      navigationState={{ index, routes }} 
      navigation={navigation}
      onIndexChange={setIndex} 
      renderScene={renderScene} />
    </>
  );
};

export default BarraNavegacion;
