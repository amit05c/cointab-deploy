import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

import axios from 'axios'
import { useEffect, useState } from 'react'
function ModalComp({handleDelete,status}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteStatus,setDeleteStatus]= useState(false)
    const deleteFunc= ()=>{
       handleDelete()
       onClose()
    }

    useEffect(()=>{
      axios.get(`https://cointabserver-production-da8a.up.railway.app/users/getData`)
      .then(res=>{if(res.data.allusers.length>0){
        setDeleteStatus(true)}
      })
  },[status,handleDelete])

    return (
      <>
        <Button disabled={!deleteStatus}  colorScheme={"red"} onClick={onOpen}>Delete Users</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Want to Delete?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={deleteFunc}>
                Delete
              </Button>
              {/* <Button colorScheme={"red"}>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ModalComp