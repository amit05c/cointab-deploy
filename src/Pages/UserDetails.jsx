import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { Box, Button, Container, Flex, Input, Select, Text, filter } from '@chakra-ui/react'
import TableComp from '../components/TableComp'
import { useState } from 'react'
import Pagination from '../components/Pagination'
const UserDetails = () => {
 const [data,setData]= useState([])
 const [total,setTotal]= useState()
 const [page,setPage]= useState(1)
 const [country,setCountry]= useState("")
 const [gender,setGender]= useState("")
 const [countryList,setCountryList]=useState([])
 const [search,setSearch]= useState(false)
const getCountries= ()=>{
  console.log(country)
  axios
  .get(`https://cointabserver-production-da8a.up.railway.app/users/country`)
  .then((res) => setCountryList(res.data) )
  
  .catch((err) => console.log(err));
}

  useEffect(()=>{

       
  getCountries()


    // console.log(gender,country)

     if(gender =="Filter by Gender" && country == "Filter by Country"){
      console.log("FF")
      axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
      return
    
     }

     if(gender  && country == "Filter by Country"){
      console.log("gf")
      axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&gender=${gender}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
      return
     }

     if(gender=="Filter by Gender"  && country){
      console.log("amit")
      axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&country=${country}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
      return
     }

     
    
      if(gender && country  && gender !=="Filter by Gender" && filter !== "Filter by Country"){
        console.log(gender,country,"all")
        axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&gender=${gender}&country=${country}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
  
      .catch((err) => console.log(err));
      }else if(country){
        axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&country=${country}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
  
      .catch((err) => console.log(err));
      }else if(gender){
        axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&gender=${gender}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
  
      .catch((err) => console.log(err));
      }else{
        axios
      .get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}`)
      .then((res) => {setData(res.data.allusers);setTotal(res.data.totalPages)})
  
      .catch((err) => console.log(err));
      }

  
    
   
  },[page,gender,country,search])

const handlePage= (value)=>{
  console.log(value)
    setPage(value)
}

const handleGender= (e)=>{
   setGender(e.target.value)
}

const handlCountry= (e)=>{
   setCountry(e.target.value)
}

const handlePageByOne = (value)=>{
  // console.log(value)
        setPage(page+value)
}

const handleSearch= (e)=>{
  let x= e.target.value
  setSearch(true)
  // if(x=""){
  //   axios.get(`http://localhost:8080/users/getData?page=${page}`)
  // .then(res=>setData(res.data), setSearch(false))
  // .catch((err)=>console.log(err))
  // }
  axios.get(`https://cointabserver-production-da8a.up.railway.app/users/getData?page=${page}&search=${x}`)
  .then(res=>setData(res.data), setSearch(false))
  .catch((err)=>console.log(err))
  console.log(search)
 
}


  return (
    <Box w={"100%"} >
      <Text as="b" fontSize='5xl'>USERS PAGE</Text>
      <Flex mt="1rem" justifyContent="center" gap={"1rem"}>
        <div>

        {/* <Button onClick={()=>handlePageByeOne(-1)}>Pre</Button> */}
        </div>
        <Pagination totalPages={total} handlePage={handlePage} currentPage={page} handlePageByOne={handlePageByOne}/>
        {/* <Button onClick={()=>handlePageByeOne(1)}>Next</Button> */}
      </Flex>

      <Flex gap={"2rem"} justify="center">
        <Select onChange={handleGender} w="30%">
          <option >Filter by Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </Select>

        <Select onChange={handlCountry} w="30%">
          <option>Filter by Country</option>
          {countryList.map((el,i)=>(

          <option key={i}>{el}</option>
          ))}
        </Select>

     <Box><Input placeholder={"Search by First name"} onChange={handleSearch}/></Box>   
      </Flex>
      {data.length>0 ? <TableComp data={data}/> : <Text textAlign={"center"} color={"red"} fontSize={"3xl"}>No Data Found</Text>}
      
    </Box>
    
  )
}

export default UserDetails