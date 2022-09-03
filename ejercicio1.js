const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {sequelize, modelName: 'user'});




// PUNTO 1
//insertar registro
function crearRegistro(nombre, apellido){
  sequelize.sync()
  .then(() => User.create({
    firstName: nombre,
    lastName: apellido
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

}
//Creo  2 registros para solo modificar
const nombre = 'tomas'
const apellido = 'perez'
crearRegistro(nombre, apellido) 
crearRegistro(nombre, apellido)

//actualiza registro
function actualizaNombreRegistro(nombreABuscar, nombreACambiar){
  User.update({ firstName: nombreACambiar }, {
    where: {
      firstName: nombreABuscar
    },
    limit: 1,
  }).then(() => {
    console.log("Done");
  });
}s

const maria = 'maria'
//RETARDO PARA ACTUALIZAR BDD
setTimeout(()=>{
    actualizaNombreRegistro(nombre, maria)
},1000);