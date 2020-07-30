import dbConnect from 'utils/dbConnect'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

const voteControler = {}
import Vote from 'models/Vote'
import User from 'models/User'
import UsersVotes from 'models/UsersVotes'

voteControler.list = async (limit = 0, skip = 0, filter = {}) => {
  
  try {
    await dbConnect()
    const votes = await Vote.find(filter).sort({'_id': -1})
      .lean()
      .limit(limit)
      .skip(skip)
      .populate("createdBy", "login") /* find all the data in our database */

    const total = await Vote.countDocuments(filter)
    return {success: true, data: votes, total}
  } catch (error) {
    return {success: false}
  }
}

voteControler.getOne = async (id, userId) => {
  try {
    await dbConnect()
    const vote = await Vote.findById(id).lean().populate("createdBy", "login")
    const userVote = await UsersVotes.find({user: userId, vote: vote._id})
    
    const hasVoted = userVote.length ? true : false
    if (!vote) return {success: false, message: "Vote introuvable"}
    return {success: true, data: vote, hasVoted}
  } catch (error) {

    return {success: false, message: "Vote introuvable"}
  }
}

voteControler.create = async (voteData) => {
  try {
    await dbConnect()
    const vote = await Vote.create(voteData)
    return {success: true, data: vote}
  } catch (error) {
    return {success: false, message: "Erreur de création", error}
  }
}

voteControler.addPartipate = async (voteId, userId) => {
  try {
    await dbConnect()
    const vote = await Vote.findById(voteId)
    const participantMax = vote.quota
    const actualParticipants = vote.participants

    const filter = { _id: voteId }
    const update = { $addToSet: { participants: [new ObjectId(userId)] } }
    const opts = { new: true } // to return updated document

    const updatedVote = await Vote.findOneAndUpdate(filter, update, opts)

    if (updatedVote.quota === updatedVote.participants.length) {
      updatedVote.status = 'inprogress'
      await updatedVote.save()
    }
    
    return {success: true, data: updatedVote}
  } catch (error) {
    return {success: false, message: "Erreur de participation", error}
  }

}

voteControler.validateVote = async (voteId, userId, choice) => {
  try {
    await dbConnect()
    const vote = await Vote.findById(voteId)
    if (vote.status === "finished" || vote.nbVote > vote.quota) throw 'Maximum de vote déja atteint'

    const alreadyVoted = await UsersVotes.find({user: userId, vote: voteId})
    if (alreadyVoted.length) throw 'Vous avez déja voté'
    
    const choicesArray = vote.choices

    await UsersVotes.create({
    user: userId,
    vote: voteId,
    choix: choicesArray.indexOf(choice)
    })

    const nbVote = vote.nbVote
    vote.nbVote = nbVote + 1

    if (vote.nbVote === vote.quota) vote.status = 'finished'

    await vote.save()

    return {success: true, data: vote}
  } catch (error) {
    return {success: false, data: null, error}
  }
}

voteControler.result = async (voteId) => {
  try {
    await dbConnect()
    const vote = await Vote.findById(voteId)
    if (vote.status !== 'finished') throw "le vote est en cours" 
    const choices = vote.choices
    const userVotes = await UsersVotes.find({vote: voteId})
    
    const choiceWin = userVotes.map( e => choices[e.choix])

    const result = { };
    for(var i = 0; i < choiceWin.length; ++i) {
      if(!result[choiceWin[i]])
        result[choiceWin[i]] = 0;
      ++result[choiceWin[i]];
    }

    return {success: true, result: result }
  } catch (error) {
      return {success: false, result: null , error}
  }
  
}

export default voteControler
