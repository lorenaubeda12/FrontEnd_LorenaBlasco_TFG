import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import 'react-native-gesture-handler';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import globalStyles from '../../Styles/global';
import {NavigationContainer, StackActions} from '@react-navigation/native';

const Stack = createStackNavigator();

const Inicio = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('PantallaAcceso');
        }, 3000); // redirigir después de 1 segundo
    }, [navigation]);

  return (
    
    <View>
      <Image
        style={globalStyles.portada}
        source={require('../../assets/img/fondoInicio.png')}
      />
      
    </View>
  );
};

export default Inicio;
