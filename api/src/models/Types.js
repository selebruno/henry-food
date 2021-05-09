const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

// TYPES = TIPOS DE DIETA

  sequelize.define('types', {
    id:{
     type: DataTypes.UUID,
     allowNull: false,
     primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
});
};
