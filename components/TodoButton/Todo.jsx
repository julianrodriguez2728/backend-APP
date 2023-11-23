import React from 'react'
import axios from "axios"
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
        <form onSubmit={formFunction}>
            <input type="text" placeholder='Add new title' name='title'/>
            <textarea type="text" placeholder='Add new todo' name='body'/>
            <button>+</button>
        </form>
    </div>
  )
}

export default Todo