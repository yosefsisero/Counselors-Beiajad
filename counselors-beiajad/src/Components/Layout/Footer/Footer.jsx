import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { FaInstagram } from "react-icons/fa";

// import your icons

import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';


function Footer() {
    
    return (
        <>
         <div className="footerIzq">
             <h6>© 2020 Counselors Beiajad. Todos los derechos reservados</h6>
         </div>
         <div>
         {/* <FontAwesomeIcon icon={faFacebook} size="md"/>
         <FontAwesomeIcon icon={faInstagram} /> */}
         <FaInstagram className="instagram"/>
         </div>

        </>
    )
}

export default Footer
