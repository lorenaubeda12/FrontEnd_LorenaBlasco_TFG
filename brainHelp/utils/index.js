export const formatearFecha = date => {
    const fechaNueva = new Date(date);
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
  };