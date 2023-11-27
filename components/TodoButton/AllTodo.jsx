"use client"
import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";

import "../Home/styles.css"
import { Istok_Web } from "next/font/google";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { Montserrat_Alternates } from 'next/font/google';
import Image from "next/image";
import img from "../img/JR-removebg-preview 1.png"
import Todo from '../TodoButton/Todo';
import {useRouter} from "next/navigation"
import {useParams} from "next/navigation"

const istokFont = Istok_Web({
  subsets:["latin"],
  weight:["400", "700"]
})

const montserrat = Montserrat_Alternates({
  subsets:["latin"],
  weight:["600"]
})


function AllTodo({dataUser}) {
 
    const navigate = useRouter()
    const {id} = useParams()
  return (
    <div style={{backgroundColor:"#101010", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <Image src={img} height={140} width={140} className='imageFormTask'/> 
      <div className="filterCategories">
          <p className={istokFont.className} style={{
              fontWeight: 700,
              background: 'linear-gradient( #FF00B8, #2A6ED3)', // Ajusta los colores según tus preferencias
              WebkitBackgroundClip: 'text',
              color: 'transparent', // Hace que el texto sea transparente
              fontSize: 48,
              margin:30,
              marginRight: 270
              }}>Filters</p>
              <div className="buttonContainer">

              <button className={`${montserrat.className} buttonForm`}>
                <ChecklistIcon style={{fontSize:29, color:"white", marginRight:29}}/>
                All tasks
              </button>
              <button className={`${montserrat.className} buttonForm`}>
                <CheckIcon style={{fontSize:29, color:"white", marginRight:20}} onClick={()=> navigateTask('Completes')}/>
                Completes
              </button>
              <button className={`${montserrat.className} buttonForm`}>
                <CancelScheduleSendIcon  style={{fontSize:25 , color:"white", marginRight:20}} onClick={()=> navigateTask('Incompletes')}/>
                Incompletes
              </button>
              </div>
              <div className="buttonCreate"  onClick={()=> navigate.push(`/perfil/${id}`)}>
                <h3 className={montserrat.className} style={{fontSize:28 , color:"white"}}>+ Create Task</h3>
              </div>
      </div>
      <div className="todoContainer">
        <p className={istokFont.className} style={{
                fontWeight: 700,
                background: 'linear-gradient( #FF00B8, #2A6ED3)', // Ajusta los colores según tus preferencias
                WebkitBackgroundClip: 'text',
                color: 'transparent', // Hace que el texto sea transparente
                fontSize: 48,
                margin:30,
                marginRight: 270
                }}>Tasks</p>
                 <Todo/>
      </div>
  </div>
  )
}

export default AllTodo
