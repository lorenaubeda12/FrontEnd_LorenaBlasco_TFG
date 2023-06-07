import mysql from 'mysql2';

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'db4free.net:3306',
  user: 'lorenaubeda12',
  password: '12059851269@',
  database: 'brainhelp'
});

// Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});


export default connection;