import HomeIcon from '@mui/icons-material/Home';import Explore from "@mui/icons-material/Explore";
import Notifications from "@mui/icons-material/Notifications";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Message from "@mui/icons-material/Message";
import Group from "@mui/icons-material/Group";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListAlt from '@mui/icons-material/ListAlt';
export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon style={{color:"#26678A"}}/>,
    path: "/home",
  },
  {
    title: "Reels",
    icon: <Explore style={{color:"#26678A"}} />,
    path: "/reel",
  },
  {
    title: "Create Reels",
    icon: <ControlPointIcon style={{color:"#26678A"}} />,
    path: "/create-reels",
  },
  {
    title: "Notification",
    icon: <Notifications style={{color:"#26678A"}} />,
    path: "/",
  },
  {
    title: "Message",
    icon: <Message style={{color:"#26678A"}} />,
    path: "/",
  },
  {
    title: "Lists",
    icon: <ListAlt style={{color:"#26678A"}} />,
    path: "/",
  },
  {
    title: "Communities",
    icon: <Group  style={{color:"#26678A"}}/>,
    path: "/",
  },
  {
    title: "Profile",
    icon: <AccountCircle style={{color:"#26678A"}} />,
    path: '/home/profile',
  },
];
