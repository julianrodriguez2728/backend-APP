"use client"

import "../../../components/Login/Login.css"
import React, {useState} from 'react'
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import img from "../../../components/img/JR-removebg-preview 1.png"
import google from "../../../components/img/GOOG-0ed88f7c.png"
import git from "../../../components/img/GitHub-Emblem.png"
import axios, {AxiosError} from "axios"
import { useRouter } from "next/navigation";

import {signIn} from "next-auth/react"
const mont = Montserrat_Alternates({
    subsets:["latin"],
    weight:["600", "700","200", "300"]
})

function Login() {
    const [error, setError ] = useState()
    const [sign, setSign ] = useState(false)
    const signIn = () =>{
        setSign(true)
    }
    const Login = () =>{
        setSign(false)
    }
    const router = useRouter()
    const sendData = async(event) =>{
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        console.log(formData);
        try {
            const data = await axios.post("/api/user",{
                name: formData.get("name"),
                email: formData.get("email"),
            })
            if(data){
                const id = data.data.data._id;
                console.log(id);
                router.push(`/perfil/${id}`)
                return data
            }
        } 
        catch (error) {
          console.log(error);
          if(error instanceof AxiosError){
            setError(error.response?.data.message)
        }
        }
    }
  return (
    <div className="LoginContainer">
        <div className="pContainer">
        <h1 className={mont.className} style={{color:"white", fontSize:80}}>Welcome!</h1>
        <h3  className={mont.className} style={{color:"white", fontSize:40, marginBottom:30}}>We are happy to see you again.</h3>
        <p  className={mont.className} style={{color:"white", fontSize:30}}>Please log in to continue <br />your journey whit us</p>
        </div>
        <div className="loginForm">
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <PersonIcon style={{ marginRight:10, color:"#3D3D3F", fontSize:45}}/>
                {
                    sign === false 
                    ?
                    <h2 className={mont.className} style={{fontSize:40, fontWeight:"700", color:"#3D3D3F"}}>Login</h2>
                    :
                    <h2 className={mont.className} style={{fontSize:40, fontWeight:"700", color:"#3D3D3F"}}>Sign in</h2>
                }
            </div> 
            {/* <div className="btnsContainerLog">
            <button className="formButtons"><Image src={google} alt="LogoGoogle" height={30} width={30}/></button>
            <button className="formButtons"><Image src={git} alt="LogoGoogle" height={50} width={100}/></button>
            </div> */}
            <form onSubmit={sendData}>
                <div className="inputsLogin">
                <input type="text" className={mont.className} placeholder="Username" style={{
                    width: 450,
                    backgroundColor: "#433E3E",
                    border: "none",
                    padding: 26,
                    borderRadius: 40,
                    margin: 8,
                    fontSize:17,
                    color:"#FFFFFF",
                    fontWeight:600
                }} name="name"/>
                <input type="text" className={mont.className} style={{
                      width: 450,
                      backgroundColor: "#433E3E",
                      border: "none",
                      padding: 26,
                      borderRadius: 40,
                      margin: 15,
                      fontSize:17,
                      color:"#FFFFFF",
                    fontWeight:600

                }} placeholder="Email" name="email"/>
                <button className="butonLogin">Login</button>
                </div>
            </form>
            {
                sign === false 
                ?
                <p className={mont.className} style={{ fontSize:21 , cursor:"pointer"}} onClick={signIn}>or Sign up</p>
                :
                <p className={mont.className} style={{ fontSize:21,cursor:"pointer"}} onClick={Login}>or Login</p>
            }
        </div>
            <Image src={img} alt="Logo" height={200} width={200} className="imgLogo"/>
    </div>
  )
}

export default Login