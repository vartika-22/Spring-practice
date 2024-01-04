import React from 'react';
import Grid from "@mui/material/Grid";
import LoginImage from "../Components/Images/Social-media.png";
import { Button, Card, Hidden, colors } from '@mui/material';
import Login from './Login';
import Logo from "../Components/Images/Logo.png"
import Register from './Register';
import { Routes,Route, Router } from 'react-router-dom';

const cardStyle={
    paddingTop:"20px",
    paddingBottom:"40px",
    paddingLeft:"50px",
    paddingRight:"50px",
    boxShadow:"1px 2px 4px 3px lightgrey"
}
const logoImage={
    width:"700px",
    height:"auto",
    marginTop:"100px",
    marginLeft:"50px"
}
const Authentication = () => {
  return (
    <div>
    <Grid container >
            <Hidden smDown>
            <Grid className='h-screen overflow' item xs={7} md={7}>
                <img src= {LoginImage} alt='Login' className='h-full w-full' style={logoImage} />

            </Grid>
            </Hidden>
            <Grid item xs={12} md={5}>
               <div className='px-10 flex flex-col justify-center h-full'>
                <Card style={cardStyle}>
                <h1 className='logo text-center'><img src={Logo} style={{width:"150px" ,marginLeft:"30%"}}/></h1>
                    <div className='flex flex-col items-center mb-5 space-y-1'>
                       
                    </div>
                    
                        <Routes>
                        
                        <Route path='/' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        </Routes>
                    
                </Card>
               </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Authentication;