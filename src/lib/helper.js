const BASE_URL = "http://localhost:3000"

export const getoverviewdatahelper = async () =>{
 const response = await fetch(`${BASE_URL}/api/data`)
 const json = await response.json()

 return json
}
