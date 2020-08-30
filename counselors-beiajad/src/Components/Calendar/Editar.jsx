import React, { useState} from 'react'
import { Modal, ModalFooter, Button } from 'reactstrap';
import '../Modal/Logi.css'
import Edi from './Edi'

function Editar(props) {

    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);

    return (
        <div>
        <Button color="info" onClick={toggle}>Editar</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
        
        <ModalFooter>
            <Edi />       
        </ModalFooter>
        
      </Modal>
        </div>
    )
}

export default Editar
