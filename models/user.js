'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   return sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }, setterMethods: {
                encryptPassword(password) {
                    let newPass = bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
                    this.setDataValue('password', newPass);
                },
            }

        }
    );
};