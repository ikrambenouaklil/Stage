
import { useState , useEffect } from "react"
import Axios from 'axios'

export default function testbesoin() {


  const [data, setData]=useState("")
  const getData =async()=>{
    const response = await Axios.get('http://localhost:3000/besoin');
    setData(response.data)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    // <div>testbesoin</div>

      <> {data} </>
        /*  { <li> valorisation: {besoin.valorisation} </li>
          <li> quantité: {besoin.quantité} </li>
          <li> duréeContrat: {besoin.duréeCont} </li>
 
          <li> compteComptable: {besoin.compteComptable?.numeroCompte} </li> }*/
  )
}

