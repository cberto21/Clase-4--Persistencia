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




// PUNTO 3
//insercion registro
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
//CREAR 3 registros para  modificar todos
const nombre = 'carlos'
const apellido = 'miranda'
crearRegistro(nombre, apellido) 
crearRegistro(nombre, apellido)
crearRegistro(nombre, apellido)

//actualizar registros
function actualizaNombreRegistro(nombreABuscar, nombreACambiar){
  User.update({ firstName: nombreACambiar }, {
    where: {
      firstName: nombreABuscar
    },
  }).then(() => {
    console.log("Done");
  });
}


const maria = 'maria'
//RETARDO PARA ACTUALIZAR BDD
setTimeout(()=>{
    actualizaNombreRegistro(nombre, maria)
},1000);