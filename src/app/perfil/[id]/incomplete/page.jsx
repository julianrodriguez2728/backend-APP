"use client"

import React , {useState, useEffect}from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";
import "../../../../../components/Home/styles.css"
import { useParams , useRouter} from 'next/navigation';
import axios from "axios"
import { Istok_Web } from "next/font/google";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { Montserrat_Alternates } from 'next/font/google';
import Image from "next/image";
import img from "../../../../../components/img/JR-removebg-preview 1.png"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
const istokFont = Istok_Web({
  subsets:["latin"],
  weight:["400", "700"]
})

const montserrat = Montserrat_Alternates({
  subsets:["latin"],
  weight:["200","600"]
})
import ListIcon from '@mui/icons-material/List';

function Completes() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useParams()
    const [userInfo, setUserInfo] = useState({ title: "", body: "", complete: false });
    const navigate = useRouter()
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = router;
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const title = event.target.elements.title.value;
      const body = event.target.elements.body.value;
      const complete = event.target.elements.complete.checked;
  
      setUserInfo({ title, body, complete });
  
    };
    const completeData = dataUser?.todo.filter((element)=> element.complete === false)
    useEffect(() => {
      const fetchData = async() => {
          try {
            const response = await axios.get(`https://todo-proyect.vercel.app/api/user/${id}`);
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
      if(completeData){
        console.log(completeData);
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

              <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}} onClick={()=>navigate.push(`/perfil/${id}`) } >
                <ChecklistIcon style={{fontSize:29, color:"white", marginRight:29}}/>
                All tasks
              </button>
              <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}} onClick={()=>navigate.push(`/perfil/${id}/complete`) }>
                <CheckIcon style={{fontSize:29, color:"white", marginRight:20}} />
                Completes
              </button>
              <button className={`${montserrat.className} buttonForm`} style={{fontWeight:600}}>
                <CancelScheduleSendIcon  style={{fontSize:25 , color:"white", marginRight:20}} onClick={()=>navigate.push(`/perfil/${id}/incomplete`) }/>
                Incompletes
              </button>
              </div>
              <div className="buttonCreate" onClick={()=> navigate.push(`/perfil/${id}/create`)}>
                <h3 className={montserrat.className} style={{fontSize:28 , color:"white"}}>+ Create Task</h3>
              </div>
      </div>
      <div className="todoContainer">
      <p className="istokFont" style={{ fontWeight: 700, background: 'linear-gradient( #FF00B8, #2A6ED3)', WebkitBackgroundClip: 'text', color: 'transparent', fontSize: 48, margin: 30, marginRight: 20 }}>Tasks</p>
      <div className='berenjenuda' style={{ width: "80%", borderRadius: 10, color: "white", padding: 20, display:"flex", justifyContent:"center", flexDirection:"column" }}>
        {
            completeData
        ?
        
        completeData?.map((task) => (
          <div key={task._id}>
            <Accordion isCompact>
              <AccordionItem key="1" aria-label="Accordion 1" title={<span style={{ color: "white" }}>{task.title}</span>} className={montserrat.className} style={{color:"white"}}>
                <hr style={{ paddingTop: 5, paddingBottom: 5 }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{task.body}</p>
                  <Dropdown>
                    <DropdownTrigger style={{ border:"none"}}>
                      <Button variant="bordered">
                        <ListIcon style={{color:"white"}}/>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" style={{ backgroundColor: "white", borderRadius: 20 }}>
                      <DropdownItem key="new" onPress={onOpen}>Edit</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" style={{ color: "red" }} onClick={async () => {
                        await axios.delete(`/api/user/${id}/${task._id}`);
                        alert('TASK ELIMINATED');
                        window.location.reload();
                      }}>
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </AccordionItem>
            </Accordion>
            <br />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} style={{  background: 'linear-gradient( #FF17A2, #070032)', }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"><Image src={img} height={50} width={100}/> </ModalHeader>
             <form action="" onSubmit={handleFormSubmit}>
            <ModalBody>
              <input type="text" placeholder='Edit the title' className={`${montserrat.className} modalInput`}  style={{fontWeight:600}} name='title' value={userInfo.title} onChange={(e) => setUserInfo({ ...userInfo, title: e.target.value })}/>
              <input type="text" placeholder='Edit the body' className={`${montserrat.className} modalInput`} style={{fontWeight:600}} name='body'  value={userInfo.body} onChange={(e) => setUserInfo({ ...userInfo, body: e.target.value })}/>
             <div className="complete">
              <p className={montserrat.className} style={{color:"white", margin:20, fontWeight:600}}>Complete</p>
                <Switch onClick={() => setUserInfo({ ...userInfo, complete: !userInfo.complete })} aria-label="Automatic updates"  color='secondary' name="complete"/>
             </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} className={`${montserrat.className} close`} style={{fontWeight:600, color:"white"}}>
                Close
              </Button>
              <Button type='submit' onPress={onClose}  className={`${montserrat.className} action`} style={{fontWeight:600, color:"white"}} onClick={async()=>{
                  await axios.put(`/api/user/${id}/${task._id}`, userInfo)
                  window.location.reload();
              }}>
                Action
              </Button>
            </ModalFooter>
             </form>
          </>
        )}
      </ModalContent>
    </Modal>
          </div>
        ))
        :
        <Spinner color="secondary"/>
        }
      </div>
    </div>
  </div>
  )
}

export default Completes