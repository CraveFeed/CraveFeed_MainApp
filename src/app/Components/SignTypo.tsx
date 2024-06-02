import React from 'react'
import dish from "../assets/pngwing.png"
import { Image } from 'antd'
import '../styles/login.css'

export default function SignTypo() {
  return (
    <>
    
     <div style={{paddingLeft:"7%", display:"flex", flexDirection:"column" , alignItems:"center", justifyItems:"center" , paddingRight:"3%"}} className='typo-part'>
      <span className='heading-style typo-part'>CraveFeed</span>
      
      <img src={dish.src} className='dish-style typo-part' alt='dish'></img>
   </div>
   
 
    </>
  )
}
