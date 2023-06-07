import React, {Fragment, useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {Header, StyleSheet, Text, Image, ScrollView} from 'react-native';
import globalStyles from './Styles/global';
import {NavigationContainer, StackAction} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  DefaultTheme,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';
import PantallaPrincipalCitas from './screens/medialAppointmentScreen/pantallaPrincipalCitas';
import Inicio from './screens/initialScreen/inicio';
import pantallaAcceso from './screens/initialScreen/pantallaAcceso';
import registro from './screens/initialScreen/registro';
import InicioSession from './screens/initialScreen/initSesion';
import PantallaPrincipal from './screens/initialScreen/pantallaPrincipal';
import pantallaOpciones from './screens/logScreen/PantallaOpciones';
import AniadirRegistro from './screens/logScreen/AniadirRegistro';
import RegistroHoraMedicacion from './screens/logScreen/RegistroHoraMedicacion';
import Desencadenantes from './screens/logScreen/Desencadenante';
import Dolor from './screens/logScreen/Dolor';
import FinalizarRegistro from './screens/logScreen/finalizarRegistro';
import GuardadoExitoso from './screens/logScreen/GuardadoExitoso';
import AniadirCita from './screens/medialAppointmentScreen/AniadirCita';
import finalCitas from './screens/medialAppointmentScreen/finalCitas';
import settings from './screens/SettingsScreen/Settings';
import ConfiguracionUsuario from './screens/SettingsScreen/Usuario/ConfiguracionUsuario';
import premium from './screens/SettingsScreen/PlanesPago/premium';
import PantallaPrincipalRegistros from './screens/painScreen/verRegistros';
import servicioTecnico from './screens/SettingsScreen/AtencionAlCliente/servicioTecnico';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8187dc',
    accent: '#EBFBFA',
    Text: '#fff',
  },
};
const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({navigation, route}) => ({
                headerTitleAlign: 'center',
                title: 'Inicio',
              })}
            />
            <Stack.Screen
              name="PantallaAcceso"
              component={pantallaAcceso}
              options={{
                headerTitleAlign: 'center',
                title: 'Inicio de Sessión',
              }}
            />

            <Stack.Screen
              name="registro"
              component={registro}
              options={{
                headerTitleAlign: 'center',
                title: 'Registro',
              }}
            />

            <Stack.Screen
              name="InicioSession"
              component={InicioSession}
              options={{
                headerTitleAlign: 'center',
                title: 'Iniciar Sesión',
              }}
            />
            <Stack.Screen
              name="PantallaPrincipal"
              component={PantallaPrincipal}
              options={{
                headerTitleAlign: 'center',
                title: 'Inicio',
              }}
            />

            <Stack.Screen
              name="AniadirRegistro"
              component={AniadirRegistro}
              options={({navigation, route}) => ({
                headerTitleAlign: 'center',
                title: 'Añadir nuevo registro',
              })}
            />

            <Stack.Screen
              name="pantallaOpciones"
              component={pantallaOpciones}
              options={{
                headerTitleAlign: 'center',
                title: 'Inicio',
              }}
            />
            <Stack.Screen
              name="RegistroHoraMedicacion"
              component={RegistroHoraMedicacion}
              options={{
                headerTitleAlign: 'center',
                title: 'Añadir nuevo registro',
              }}
            />
            <Stack.Screen
              name="Desencadenantes"
              component={Desencadenantes}
              options={{
                headerTitleAlign: 'center',
                title: 'Añadir nuevo registro',
              }}
            />
            <Stack.Screen
              name="Dolor"
              component={Dolor}
              options={{
                headerTitleAlign: 'center',
                title: 'Añadir nuevo registro',
              }}
            />
            <Stack.Screen
              name="finalizarRegistro"
              component={FinalizarRegistro}
              options={{
                headerTitleAlign: 'center',
                title: 'Añadir nuevo registro',
              }}
            />
            <Stack.Screen
              name="PantallaPrincipalCitas"
              component={PantallaPrincipalCitas}
              options={{
                headerTitleAlign: 'center',
                title: 'Citas Medicas',
              }}
            />
            <Stack.Screen
              name="GuardadoExitoso"
              component={GuardadoExitoso}
              options={{
                headerTitleAlign: 'center',
                title: 'Registro guardado exitosamente',
              }}
            />
            <Stack.Screen
              name="AniadirCita"
              component={AniadirCita}
              options={{
                headerTitleAlign: 'center',
                title: 'Añadir nueva cita',
              }}
            />
            <Stack.Screen
              name="finalCitas"
              component={finalCitas}
              options={{
                headerTitleAlign: 'center',
                title: 'Cita añadida',
              }}
            />

            <Stack.Screen
              name="settings"
              component={settings}
              options={{
                headerTitleAlign: 'center',
                title: 'Ajustes',
              }}
            />
             <Stack.Screen
              name="ConfiguracionUsuario"
              component={ConfiguracionUsuario}
              options={{
                headerTitleAlign: 'center',
                title: 'Usuario',
              }}
            />
            <Stack.Screen
              name="premium"
              component={premium}
              options={{
                headerTitleAlign: 'center',
                title: 'Hazte premium',
              }}
            />
            <Stack.Screen
              name="verRegistros"
              component={PantallaPrincipalRegistros}
              options={{
                headerTitleAlign: 'center',
                title: 'Mis registros',
              }}
            />

<Stack.Screen
              name="servicioTecnico"
              component={servicioTecnico}
              options={{
                headerTitleAlign: 'center',
                title: 'Ajustes',
              }}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
