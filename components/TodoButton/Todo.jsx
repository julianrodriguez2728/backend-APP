import React from 'react'
import axios from "axios"
import "./todo.css";

function Todo({id}) {
    const formFunction = async(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        if(id && formData){

        await axios.post(`/api/user/${id}`,{
            title: formData.get("title"),
            body: formData.get("body"),
          })
        }
        window.location.reload()
    }
    console.log(id, "este es mi id");
  return (
    <div>
        <form onSubmit={formFunction} className='formContainer'>
          <div className="titulo">
            <h3>Title</h3>
            <input type="text" placeholder='Add new title' name='title' className='inputClass'/>
          </div>
          <div className="body">
            <h3>Body</h3>
            <textarea type="text" placeholder='Add new todo' name='body' className='inputClass textArea'/>
          </div>
            <button>+</button>
        </form>
    </div>
  )
}

export default Todo