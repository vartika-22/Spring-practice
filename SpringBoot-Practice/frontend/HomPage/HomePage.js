import { Card, Grid, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Route, Routes, useLocation } from 'react-router-dom';
import MiddlePart from '../MiddlePart/MiddlePart';
import CreateReelForm from '../Reels/CreateReelForm';
import Reels from '../Reels/Reels';
import HomeRight from './HomeRight';
import { useDispatch ,useSelector} from "react-redux";
import Profile from '../Profile/Profile';

const HomePage = () => {

  const location = useLocation();
  const jwt=localStorage.getItem("jwt");
  const auth=useSelector(store=>store.auth);
  console.log("auth",auth)

  const [showSidebar, setShowSidebar] = useState(true);
  const isLargeScreen = useMediaQuery('(min-width: 1190px)'); // Adjust the breakpoint as needed

  useEffect(() => {
    setShowSidebar(isLargeScreen);
  }, [isLargeScreen]);

  
  return (
    <div className='flex flex-col' style={{backgroundColor:"#E5F0F1"}}>
      <Grid container spacing={0} >
      <Grid item xs={showSidebar ? 3 : false} lg={3} className={showSidebar ? 'fixed sticky top-0' : ''}>
      {showSidebar && <Sidebar />}
    </Grid>

       
          <Grid lg={location.pathname === '/home' ? 6 : 12} item className='px-5 flex justify-center'style={{zIndex:2}}>
            <Routes>
              <Route path='/*' element={<MiddlePart />} />
              <Route path='/home/reels' element={<Reels />} />
              <Route path='/home/create-reels' element={<CreateReelForm />} />
              <Route path="/home/profile" element={<Profile />} />
            </Routes>
          </Grid>

         <Grid lg={location.pathname === '/' ? 3 : 0} item className='relative' >
          <div style={{position:"fixed",width:"40%"}}>
                    <HomeRight/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
