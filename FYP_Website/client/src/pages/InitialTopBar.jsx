import React, { useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom'
import '../css/InitialTopBar.css'
import { faSignInAlt, faUserPlus, faInfoCircle, faHome } from '@fortawesome/free-solid-svg-icons';


function InitialTopBar() {

    //logout
    function refreshPage() {
       // window.location.reload(false)
      }
    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        refreshPage();
      }
    

return (
        <div className="initial-top-top-bar">
            <div className="initial-top-User">
                <Link  to='/'>
                    <button className='profilebutton2'>
                    <FontAwesomeIcon icon={faHome} /> Home
                    </button>
                </Link>
                <Link  to='/about'>
                    <button className='profilebutton2' >
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                </Link>
                <Link to='/login'>
                    <button className='profilebutton2' >
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                    </button>
                </Link>
                <Link  to='/register'>
                    <button className='profilebutton2' >
                        <FontAwesomeIcon icon={faUserPlus} /> Register
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default InitialTopBar;