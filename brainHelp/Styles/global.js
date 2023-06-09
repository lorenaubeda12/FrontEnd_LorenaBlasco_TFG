import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
  },
  portada: {
    width: '100%',
    height: '100%',
  },
  contenedorRegistro: {
    flex: 1,
  },
  contendor: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
  contendorRegistro: {
    flex: 1,
  },
  imagenAcceso: {
    width: '100%',
    height: 300,
    marginHorizontal: '2.5%',
  },
  
  tituloAcceso: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 2,
    fontSize: 50,
    color: '#6247AA',
    fontFamily: 'TitilliumWeb-Bold',
  },
  subtituloAcceso: {
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 30,
    fontSize: 15,
    color: '#9163CB',
    fontFamily: 'TitilliumWeb-Bold',
  },
  botonesAcceso: {
    marginTop: 10,
    marginBottom: 10,
    marginVertical: 20,
    marginHorizontal: 40,
    color: '#6247AA',
    width: 300,
  },
  contenedorBotones: {
    marginTop: 10,
    marginBottom: 10,
    marginBottom: 10,
    marginVertical: 20,
    marginHorizontal: 40,
    color: '#6247AA',
    width: 300,
  },
  registrarse: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginVertical: 10,
  },
  registrarseTexto: {
    fontFamily: 'TitiliumWeb-SemiBold',
    fontSize: 15,
    color: '#9163CB',
  },
  registrate: {
    fontFamily: 'TitiliumWeb-SemiBold',
    fontSize: 15,
    color: '#000000',
  },
  inputRegistro: {
    color: '#fff',
    marginVertical: '2.5%',
    marginBottom: 5,
    backgroundColor: '#fff',
    marginHorizontal: 30,
  },
  inputInicioSession: {
    color: '#fff',
    marginVertical: '2.5%',
    marginBottom: 5,
    backgroundColor: '#fff',
    marginHorizontal: 40,
  },
  tituloRegistro: {
    textAlign: 'left',
    marginTop: 85,
    marginBottom: 2,
    marginLeft: 30,
    fontSize: 50,
    color: '#000000',
    fontFamily: 'Questrial-Regular',
  },
  contenedorBordes: {
    borderColor: '#8187dc',
    borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  subtituloRegistro: {
    textAlign: 'left',
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 30,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Questrial-Regular',
  },
  botonesRegistro: {
    width: 300,
    marginTop: 30,
    marginBottom: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    backgroundColor: '#8187dc',
  },
  botonesAtras: {
    marginTop: 10,
    marginBottom: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    width: 300,
    backgroundColor: '#5a189a',
  },
  tituloInicioSession: {
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 50,
    color: '#000000',
    marginHorizontal: 10,
    fontFamily: 'Questrial-Regular',
  },

  contenedorInicio: {
    marginVertical: 20,
    marginTop: 200,
  },
  subtituloInicioSession: {
    marginBottom: 2,

    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Questrial-Regular',
  },
  botonContinuar: {
      width: 300,
      marginTop: 60,
      marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
      backgroundColor: '#8187dc',
  },
});

export default globalStyles;
