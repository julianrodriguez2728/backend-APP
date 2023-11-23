"use client"

import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation"
import axios from "axios"
import Todo from "../../../../components/TodoButton/Todo.jsx"
import CartTodo from "../../../../components/TodoButton/CartTodo.jsx"

function Page() {
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useParams()
  const {id} = router;
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        if(response){
          setDataUser(response.data.data);
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } 
  }, [id]);
  return (
    <div>
      Welcome! {dataUser?.name}
      <Todo id={dataUser?._id}/>
      <CartTodo array={dataUser?.todo}/> 
    </div>
  )
}

export default Page