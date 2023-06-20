import { useState,useEffect } from 'react'

import './App.css'
import Country from './components/Country'

function App() {
  const [data, setMyData] = useState([])

  useEffect(() =>{
   fetch('https://restcountries.com/v2/all?fields=name,region,area')
   .then(res => res.json())
   .then( data =>{
    console.log(data)
    setMyData(data)
   })



  },[])

  return (
    <>
     <div className='grid grid-cols-3 gap-2'>
      {
        data.slice(0,40).map((country,index) => <Country index={index} country= {country}></Country>)
      }
     </div>
    </>
  )
}

export default App
