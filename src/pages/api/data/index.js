import connectMongo from 'src/components/database/connection'
import { getoverviewdata,postoverviewdata } from 'src/components/database/overviewcontroller'

export default async function handler(req, res) {
  await connectMongo().catch(() => res.status(405).json({ error: 'Error in the Connection' }))

  // type of request
  const { method } = req

  switch (method) {
    case 'GET':
      getoverviewdata(req,res)
      break
    case 'POST':
      postoverviewdata(req,res)
      break
    case 'PUT':
      res.status(200).json({ method, name: 'PUT Request' })
      break
    case 'DELETE':
      res.status(200).json({ method, name: 'DELETE Request' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break
  }
}
