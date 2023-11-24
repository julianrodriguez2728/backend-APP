import React from 'react'
import axios from "axios"
import { useParams } from 'next/navigation';
import "./todo.css";
import { Montserrat_Alternates } from 'next/font/google';
const montserrat = Montserrat_Alternates({
  subsets:["latin"],
  weight:["600"]
})

function Todo() {
  const params = useParams()
  const {id} = params;
  console.log(id);
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
            
            await axios.post(`/api/user/${id}`,{
              title: formData.get("title"),
              body: formData.get("body"),
            })
          }
          window.location.reload()
        }
    }
  return (
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
            <button className={`${montserrat.className} botonFormTask`} style={{color:"white", fontSize:22}}>Create</button>
        </form>
    </div>
  )
}

export default Todo