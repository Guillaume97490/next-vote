/** Model user_vote
 * @module models/user
 * @requires mongoose
 */

const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

/**
 * @name userSchema
 * @requires mongoose
 * @memberof module:models/user
 * @function
 * @param {array} - Propriétés de mon schéma
 */
const userSchema = new mongoose.Schema({
 
    login: {
        type: String,
        required: [true, "Le nom d'utilisateur est requis"],
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.plugin(uniqueValidator, { message: "{VALUE} existe déja" });

module.exports = mongoose.models.User || mongoose.model('User', userSchema)