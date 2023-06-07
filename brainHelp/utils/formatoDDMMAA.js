export const formatearFechaDD = date => {
    const fechaNueva = new Date(date);
    const opciones = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
  };