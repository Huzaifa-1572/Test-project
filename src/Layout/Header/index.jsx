import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LOGO from 'src/Assets/images/PayvayLogo.png';
import GoBack from "src/Common/Goback";
import './index.css';


function Header({ SHOW_BACK_BUTTON, setValue, getValues }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const NAVIGATE_TO = useNavigate()

  const handleLogoClick = () => {
    NAVIGATE_TO('/')
  }

  return (
    <>
      <Box className='navbar' sx={{ paddingTop: '10px', background: { xs: '#f9f9f9', lg: 'white' }, boxShadow: "0px 1px 1px rgba(0,0,0,0.1)" }}>
        {
          SHOW_BACK_BUTTON &&
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <GoBack setValue={setValue} getValues={getValues} />
          </Box>
        }

        <Box sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }} className='navbar-logo' >
          <Box sx={{ marginRight: '40px' }}>
            <img src={LOGO} alt='PAYVAY' title='PAYVAY' onClick={handleLogoClick} />
          </Box>
        </Box>

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