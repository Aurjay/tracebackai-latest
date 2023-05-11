import mongoose from 'mongoose'

// const MONGO_URI = process.env.MONGODB_URI
const MONGO_URI = "mongodb+srv://Nikolaus:passworddemo@ml-metadata.j2mktaf.mongodb.net/?retryWrites=true&w=majority"

const db = mongoose.connection

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI)
    if (connection.readyState == 1) {
      db.on('error', console.error.bind(console, 'connection error :'))
      db.once('open', function () {
        console.log('Mongodb Atlas connected...')
        console.log('Database Connected')
      })
      module.exports.db = db
    }
  } catch (errors) {
    return Promise.reject(errors)
  }
}

export default connectMongo


// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// const connectMongo = async () => {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: true,
//       useCreateIndex: true
//     }

//     cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
//       return mongoose
//     })

//     cached.conn = await cached.promise

//     return cached.conn
//   }
// }


// const main = async () => {
//   await mongoose.connect(MONGO_URI)
//   console.log('Database Connected ...')
// }

// export default main;
//
