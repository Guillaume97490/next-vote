/* This is a database connection function*/
import mongoose from 'mongoose'

const connection = {} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */  
  let url = ''
  if (process.env.MONGODB_URI) {
    url = process.env.MONGODB_URI
  } else {
    url = 'mongodb://localhost:27017/simplonvote'
  }
  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect