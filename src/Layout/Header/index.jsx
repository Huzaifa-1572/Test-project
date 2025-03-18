import Box from "@mui/material/Box";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import LOGO from 'src/Assets/images/PayvayLogo.png';
import './index.css';


function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const NAVIGATE_TO = useNavigate()


  const handleLogoClick = () => {
    NAVIGATE_TO('/')
  }

  return (
    <>
      <Box className='navbar' sx={{ background: { xs: '#f4f4f4', lg: 'white' }, boxShadow: "0px 2px 1px rgba(0,0,0,0.1)" }}>
        <div className='navbar-logo' onClick={handleLogoClick} >
          <img src={LOGO} alt='PAYVAY' title='PAYVAY' />
        </div>

        {/* RESPONSIVE ICONS */}
        {/* <div className='menu-icon' >
          {click ? <span className='close-icon'></span> : <GiHamburgerMenu onClick={handleClick} />}
        </div>

        <ul onClick={handleClick} className={click ? 'nav-menu active nav-backoverlay-active' : 'nav-menu nav-backoverlay-inactive '}>
          <li className={'nav-item'}>
            Contact Us
          </li>
          <li className={'nav-item'}>
            FAQS
          </li>
          <li className={'nav-item'}>
            Eligibility Criteria
          </li>
        </ul> */}
      </Box>
    </>
  );
}
export default Header;