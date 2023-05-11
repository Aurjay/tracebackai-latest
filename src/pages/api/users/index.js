import main from '../../../components/database/connection'
import kitten from '../../../model/overview_model'
import { getoverviewdata } from 'src/components/database/overviewcontroller'
import connectMongo from 'src/components/database/connection'

export default async function get_Users(req, res) {
  connectMongo().catch(() => res.status(405).json({ error: 'Error in the Connection' }))

  // type of request
  const { method } = req

  switch (method) {
    case 'GET':
      getoverviewdata(req, res)
      break
    case 'POST':
      res.status(200).json({ method, name: 'POST Request' })
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
