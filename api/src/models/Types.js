const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    // id: {
    //   type: DataTypes.STRING,
    //   primaryKey: true
    // },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
    { timestamps: false });
};

