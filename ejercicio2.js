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

const nombre = 'carlos'
const apellido = 'miranda'
crearRegistro(nombre, apellido)
crearRegistro(nombre, apellido)

//Eliminar 1 registro
function eliminarRegistroPorNombre(registroConNombre){
    User.destroy({
        where: {
          firstName: registroConNombre
        },
        limit:1, //limite 1 registro
      }).then(() => {
        console.log("Elimine Registro");
      });      
  }
  

//RETARDO PARA ACTUALIZAR BD
setTimeout(()=>{
    eliminarRegistroPorNombre(nombre)
},1000)
  