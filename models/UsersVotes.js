/** Model user_vote
 * @module models/user_vote
 * @requires mongoose
 */

const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

/**
 * @name userVoteSchema
 * @requires mongoose
 * @memberof module:models/user_vote
 * @function
 * @param {array} - Propriétés de mon schéma
 * @param {array} - Collection
 */
const userVoteSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    vote: {
        type: ObjectId,
        required: true,
        ref: 'vote'
    },
    
    choix: {
        type: Number,
        required: true,
        min: 0
    },
},{ collection: 'usersVotes' })

module.exports = mongoose.models.UsersVotes || mongoose.model('UsersVotes', userVoteSchema)