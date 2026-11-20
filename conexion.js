var { Sequelize } = require("sequelize");
var productoModelo = require("./models/producto");
/*

const conexion = new Sequelize('productosDSM1', 'root', 'bps140506#', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
})

*/
// conexion con la BD
const conexion = new Sequelize("productosDSM1","Qj3BCjM4ckwvzLc.root","nJZIXHB5gG74zL6S",
    {
    host: "gateway01.us-west-2.prod.aws.tidbcloud.com",
    port: "4000",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
    },
  },
);

const producto = productoModelo(conexion);

conexion
  .sync({ force: false })
  .then(() => {
    console.log("Conexion exitosa usuario");
  })
  .catch((e) => {
    console.log("Error en la conexion con la base de datos: " + e);
  });

module.exports = {
  producto,
};
