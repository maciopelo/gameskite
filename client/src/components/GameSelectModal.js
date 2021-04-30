import axios from 'axios';
import React from 'react';
import {Modal, Button} from "react-bootstrap"


const GameSelectModal = ({show, chosenGame, onHide}) => {

    return ( 
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {show && chosenGame.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          {show &&
            <>
                <h4>Description</h4>
                <p>
                    {chosenGame.description_raw}
                </p>
                <h4>Released data</h4>
                <p>
                    {chosenGame.released}
                </p>
                <h4>General rating</h4>
                <p>
                    {chosenGame.rating}
                </p>
                <h4>Available platforms</h4>
                {chosenGame.parent_platforms.map(p => <li key={p.platform.name}>{p.platform.name}</li>)}
        
                {chosenGame.website &&
                <>
                    <h4>Website</h4>
                    <a href={chosenGame.website}> {chosenGame.website}</a>
                </>
                }
            </>
          }
        
          
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
     );
}
 
export default GameSelectModal;