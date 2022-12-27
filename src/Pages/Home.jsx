import { Box, Button, Container, Flex, Spinner, Text,useToast  } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import ModalComp from '../components/ModalComp'
import { useEffect } from 'react'
const Home = () => {
const [status,setStatus]=useState(false)
const navigate= useNavigate()
const toast = useToast()
const [deleteStatus,setDeleteStatus]= useState(false)
  const handleFetch= async()=>{
    console.log(status)
    if(status){
       alert("Feth in Progress")
    }
    setStatus(true)
   return await axios("https://randomuser.me/api/?results=50").then((res) =>
    
     res.data.results
  
  ).then((data)=>{
    // console.log(data)
    axios
      .post("https://cointabserver-production-da8a.up.railway.app/users/addusers", { results: data })
      .then((res) => {if(res.data=="added"){
        toast({
          title: 'Data added',
          position: "top",
          description: res.data,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        setStatus(false)
      }})

      .catch((err) => console.log(err));
 
  })
  }

  const handleDelete= ()=>{
   setDeleteStatus(true)
    axios
    .delete("https://cointabserver-production-da8a.up.railway.app/users/delete")
    .then((res) =>  toast({
      title: 'Deleted',
      position: "top",
      description: res.data,
      status: 'success',
      duration: 2000,
      isClosable: true,
    }),
    setDeleteStatus(false)
    )
    .catch((err) =>  toast({
      title: 'Error',
      position: "top",
      description: "Someting Error",
      status: 'error',
      duration: 5000,
      isClosable: true,
    }));
  

  }

  const handleNavigate= ()=>{
    navigate("/users")
  }


  useEffect(()=>{},[deleteStatus,status])

  
  return (
    <Container>
      <Text as="b" fontSize='5xl'>COINTAB</Text>
       <Flex gap={"1rem"}>
        <Button  colorScheme='green' onClick={handleFetch}>Fetch Users</Button>
        {/* <Button colorScheme='red' onClick={handleDelete}>Delete Users</Button> */}
        <Button colorScheme='cyan' onClick={handleNavigate}>View Users</Button>
        <ModalComp handleDelete={handleDelete} status={status}/>
       </Flex>
       {status && <Spinner mt="1rem" color='red.500' />}
    </Container>
  )
}

export default Home