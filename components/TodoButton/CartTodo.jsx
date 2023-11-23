import React, { useEffect } from 'react'

function CartTodo({array}) {
    useEffect(()=>{
        console.log('Array actualizado:', array);
    },[array])
  return (
    <div>
        {
            array?.map((element, index)=>{
                return(
                    <div key={index}>
                        <h1>{element.title}</h1>
                        <p>{element.body}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CartTodo