import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Testbesoin() {
  const [besoins, setBesoin] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3010/besoin').then((response) => {
      console.log(response.data);
      setBesoin(response.data);
    });
  }, []);

  return (
    <>
      {besoins.map((lesbesoins) => {
        return (
          <div  key={lesbesoins._id}>
            <ul>
              <li> item: {lesbesoins.item} </li>
              <br />
      
            </ul>
          </div>
        );
      })}
    </>
  );
}
