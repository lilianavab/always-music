import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

//Esto es para que funcione la ruta el .env
dotenv.config();

const config = {
    // Debemos ingresar los datos de conexión 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const pool = new Pool(config);


const nuevoEstudiante = async () => {

    const text = "INSERT INTO Estudiante (rut, nombre, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [rut, nombre, curso, nivel];

    const result = await pool.query( text, values );
    console.log(`Estudiante ${nombre} agregado con éxito-->`, result.rows);
    return result.rows;
};

const registroActual = async () => {
    const text = "SELECT * FROM Estudiante"
    
    const result = await pool.query(text);
    console.log('Estudiantes registrados:', result.rows);
    return result.rows;
};

const getEstudiante = async () => {
    const text = "SELECT * FROM Estudiante WHERE rut = $1";
    const values = [rut]

    const result = await pool.query(text, values);
    console.log('Estudiante encontrado:', result.rows);
    return result.rows;
};

const updateEstudiante = async (rut, nuevoNombre, nuevoCurso, nuevoNivel) => { 
   
    const text = "UPDATE estudiante SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *"
    const values = [rut, nuevoNombre, nuevoCurso, nuevoNivel];

    const result = await pool.query(text, values);
    console.log(`Estudiante con rut ${rut} editado con éxito-->`, result.rows);
    return result.rows;
};

const deleteEstudiante = async () => {

    const text = "DELETE FROM Estudiante WHERE rut= $1 RETURNING *";
    const values = [rut];

    const result = await pool.query( text, values );
    console.log(`Registro de Estudiante con rut ${rut} eliminado-->`, result.rows);
    return result.rows;
};

const argumentos  = process.argv.slice(2);
// node index.js consulta
// node index.js nueva camisa negra M
// node index.js editar Camiseta negra M 33

const funcion = argumentos[0];
const rut = argumentos[1];
const nombre = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

// const rut = argumentos[1]

console.log( funcion )
console.log( rut )
console.log( nombre )
console.log( curso )
console.log( nivel )

const testConsultas = () => {
    switch ( funcion ) {
        case 'nueva':
            nuevoEstudiante( rut, nombre, curso, nivel );
            break;
        case 'consulta':
            registroActual();
            break;
        case 'consultaRut':
            getEstudiante();
            break;
        case 'editar':
            const nuevoNombre = argumentos[2];
            const nuevoCurso = argumentos[3];
            const nuevoNivel = argumentos[4];
            updateEstudiante(rut, nuevoNombre, nuevoCurso, nuevoNivel);
            break;
        case 'eliminar':
            deleteEstudiante(rut);
            break;
        default:
            console.log('Ingrese una consulta correcta!!');
            break;
    }    
}

testConsultas();

//nuevoEstudiante();
//registroActual();
//getEstudiante(); 
//updateEstudiante();
//deleteEstudiante();    
    
