import overview_model from 'src/model/overview_model'

const db = require('../database/connection')

var collection_name = "experiments"
const cors = require('cors')


// GET http://localhost:3000/api/data/
export async function getoverviewdata(req, res) {
  try {
    const overview_data = await db.db.collection(collection_name).find().sort({$natural:-1}).limit(1).toArray()
    if (!overview_data) return res.status(404).json({ error: 'Overview data is not retrived from database' })
    console.log('I am back Motherfucker')
    res.status(200).json(overview_data)
  } catch (error) {
    res.status(404).json({ error: 'Error while Fetching Overview data' })
  }
}

// POST http://localhost:3000/api/data/
export async function postoverviewdata(req, res) {
  try {
    const PutData = req.body
    if (!PutData) return res.status(404).json({ error: 'Data not provoided' })

    // await overview_model.create(PutData,function(err,data){
    //   return res.status(200).json(data)
    // })
    const overview_data = await db.db.collection(collection_name).insertOne(PutData)
    console.log(overview_data)

    return res.status(200).json(overview_data)
  } catch (error) {
    res.status(404).json({ error: 'Error while Putting Overview data' })
  }
}




