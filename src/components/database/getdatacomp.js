// use-fetch-data.js
import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  var config = {headers: {'Access-Control-Allow-Origin': '*'}}

  useEffect(() => {
    fetchData()

  }, []);

    const fetchData = async () => {
      try {
        
        const { data: response } = await axios.get('https://dashoard-final.vercel.app/api/data/',config);

        // const { data: response } = await axios.get('http://localhost:3000/api/data/',config);


        setData(response);

      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };



  return {
   data,loading,
  };
};

export default useFetchData;
