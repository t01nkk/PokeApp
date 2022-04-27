const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // Nombre * Vida Fuerza Defensa Velocidad Altura Peso
  sequelize.define('Pokemon', {
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4
    // },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    img: {
      type: DataTypes.STRING
    },
    type:
      DataTypes.ARRAY(DataTypes.STRING)

    // typeOne: {
    //   type: DataTypes.STRING,

    // },
    // typeTwo: {
    //   type: DataTypes.STRING
    // },
  },
    { timestamps: false });
};
