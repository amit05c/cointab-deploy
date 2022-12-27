import { Button } from '@chakra-ui/react';
import React from 'react'

const  createPageArray=(n)=> {
    return new Array(n).fill(0);
  }
  
const Pagination = ({totalPages,currentPage,handlePage,handlePageByOne}) => {
    // console.log(totalPages,currentPage,handlePage)
    let pages = createPageArray(totalPages).map((a, i) => <Button colorScheme='blue' m={"0.5rem"} className="page-btn" key={i} onClick={()=>handlePage(i+1)} disabled={currentPage == i+1}>{i+1}</Button>);
    return <div><Button colorScheme='blue' disabled={currentPage==1} onClick={()=>handlePageByOne(-1)}>Pre</Button>{pages}<Button ml={totalPages==0 && "1rem"} colorScheme='blue' disabled={totalPages==currentPage} onClick={()=>handlePageByOne(1)}>Next</Button></div>;
}

export default Pagination