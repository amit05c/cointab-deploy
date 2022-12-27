import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Avatar,
    Box,
    Text,
  } from '@chakra-ui/react'

const TableComp = ({data}) => {
    // console.log(data)
  return (
    <TableContainer w={"80%"} m="auto"  mt={data.length>0 && "2rem"}>
  <Table variant='striped' colorScheme='teal'>
    {/* <TableCaption>Employee of CoinTab</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Photo</Th>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th>Email</Th>
        <Th>Country</Th>
        <Th>City</Th>
      </Tr>
    </Thead>

     <Tbody>
        {data.map(el=>(
          <Tr key={el._id}>
          <Td><Avatar src={el.photo}/></Td>
          <Td>{`${el.firstName} ${el.lastName}`}</Td>
          <Td>{el.gender}</Td>
          <Td>{el.email}</Td>
          <Td>{el.country}</Td>
          <Td>{el.city}</Td>
        </Tr>
        ))}
     </Tbody>
    
    
  </Table>
</TableContainer>
  )
}

export default TableComp