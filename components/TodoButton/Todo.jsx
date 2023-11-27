"use client"

import React , {useState} from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";

import "./todo.css"
import axios  from 'axios';
import { Istok_Web } from "next/font/google";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { Montserrat_Alternates } from 'next/font/google';
import Image from "next/image";
import img from "../img/JR-removebg-preview 1.png"
import AllTodo from "../TodoButton/AllTodo.jsx"
import {useRouter} from "next/navigation"
import {useParams} from "next/navigation"
import {Spinner} from "@nextui-org/react";

const istokFont = Istok_Web({
  subsets:["latin"],
  weight:["400", "700"]
})

const montserrat = Montserrat_Alternates({
  subsets:["latin"],
  weight:["200","600"]
})



function Todo({dataUser}) {
  const [task, setTask] = useState('task');
  const [loading, setLoading]  = useState(false);
  
  const navigate = useRouter()
  const router = useParams()
  console.log(dataUser);
  const navigateTask = (task) => {
    setTask(task)
  };
  const {id} = router;

  const formFunction = async(event) => {
    event.preventDefault()
    const titleValue = event.currentTarget.elements.title.value;
    const bodyValue = event.currentTarget.elements.body.value;
  
    if (!titleValue.trim() || !bodyValue.trim()) {
      console.log("Please complete all fields");
      return;
    }else{

      const formData = new FormData(event.currentTarget);
      console.log(formData);
      if(id && formData){
         try {
            setLoading(true)
            await axios.post(`/api/user/${id}`,{
              title: formData.get("title"),
              body: formData.get("body"),
            })
         } catch (error) {
          
         } 
      }
      window.location.reload()
    }
} 
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

                <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}} onClick={()=> navigate.push(`/perfil/${id}`)}>
                  <ChecklistIcon style={{fontSize:29, color:"white", marginRight:29}}/>
                  All tasks
                </button>
                <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}}>
                  <CheckIcon style={{fontSize:29, color:"white", marginRight:20}} onClick={()=> navigateTask('Completes')}/>
                  Completes
                </button>
                <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}}>
                  <CancelScheduleSendIcon  style={{fontSize:25 , color:"white", marginRight:20}} onClick={()=> navigateTask('Incompletes')}/>
                  Incompletes
                </button>
                </div>
                <div className="buttonCreate" onClick={()=> navigate.push(`/perfil/${id}/create`)}>
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
                  {
                    loading === true
                    ?
                    <div className="flex gap-4">
                    <Spinner color="secondary"/>
                    </div> 
                    :
                      <div className='berenjenuda' style={{backgroundColor:"#2B2B34", width:"80%", borderRadius:10, color:"white", padding:20}}>
                                  <div>
                            <form onSubmit={formFunction} className='formContainer'>
                              <div className="titulo">
                                <h3 className={montserrat.className} style={{color:"white", fontSize:22, margin:20}}>Title</h3>
                                <input type="text" placeholder='Add new title' name='title' className={`${montserrat.className} inputClass`} style={{color:"white", fontSize:12}}/>
                              </div>
                              <div className="body">
                                <h3 className={montserrat.className} style={{color:"white", fontSize:22, margin:20}}>Body</h3>
                                <textarea type="text" placeholder='Add new todo' name='body' className={`${montserrat.className} inputClass`} style={{color:"white", fontSize:12}}/>
                              </div>
                                <button className={`${montserrat.className} botonFormTask`} style={{color:"white", fontSize:22, backgroundColor:"#553470", borderRadius: 10, fontWeight:800}} onClick={()=> navigate.push(`/perfil/${id}`)}>Create</button>
                            </form>
                        </div>        
                      </div>
                  }

        </div>
    </div>
  )
}

export default Todo;

