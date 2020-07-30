/** Model user_vote
 * @module models/vote
 * @requires mongoose
 */

const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

/**
 * @name voteSchema
 * @requires mongoose
 * @memberof module:models/vote
 * @function
 * @param {array} - Propriétés de mon schéma
 */
const voteSchema = new mongoose.Schema({
   
    subject: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} doit étre un entier"
        },
        min: 1
    },
    choices: {
        type: Array,
        required: true,
        validate: {
            validator: function(array) {
                return array.length >= 2;
            },
            message: "{VALUE} doit etre un tableau de 2 éléments min."
        }
    },
    nbVote: {
        type: Number,
        // required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} doit etre un entier"
        },
        default: 0,
        min: 0
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    
    participants:[{
        type: ObjectId,
        ref: 'User',
        default: ''

    }],
    status: {
        type: String,
        required: true,
        enum: ['created', 'inprogress', 'finished'],
        default: "created"
    },

})

module.exports = mongoose.models.Vote || mongoose.model('Vote', voteSchema)