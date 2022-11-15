import React from 'react'
import Pagination from '@mui/material/Pagination'
import { createTheme, ThemeProvider } from "@material-ui/core";


const CustomPagination = ({setpage,page,numOfPages = 10}) => {

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const HandlePages= (page)=>{
  setpage(page);
  window.scroll(0,0)
  }

 
  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    }}>
       {/* <Stack spacing={2}> */}
      <ThemeProvider  theme={darkTheme}>
      <Pagination 
      count={numOfPages}
       color="primary" 
        onChange={(event)=>HandlePages(event.currentTarget.textContent)}
       />
      </ThemeProvider>
      
      
    {/* </Stack> */}
    </div>
  )
}

export default CustomPagination
