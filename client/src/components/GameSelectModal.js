import axios from 'axios';
import React from 'react';
import {Modal, Button} from "react-bootstrap"


const GameSelectModal = ({show, chosenGame, onHide}) => {

    return ( 
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

      <Modal.Header closeButton className = "modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className = "modal-title">
          {show && chosenGame.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className = "modal-body">
          {show &&
            <div className = "content">
              <div className = "row">
                <div className="col-3">
                  <img src= {chosenGame.background_image} alt="" className="modal-img"/>
                  <p className ="add_p">Add to list</p>
                  <p className = "add_p">Add to favourites</p>
                  <p className = "score">Score</p>
                  <p className = "p_rating"><img src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/icons-mint-individual-81_2.jpg?w=1000&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7a6bc3c6c3975085365c7f1fca7757b7" alt="star"/> {chosenGame.rating}</p>
               
                
                </div>
                <div className="col-9">
                <h4>Description</h4>
                <p>
                    {chosenGame.description_raw}
                </p>
                <h4>Released data</h4>
                <p>
                    {chosenGame.released}
                </p>
                <h4>Available platforms</h4>
                {chosenGame.parent_platforms.map(p => <li key={p.platform.name}>{p.platform.name}</li>)}
        
                {chosenGame.website &&
                <>
                    <h4>Website</h4>
                    <a href={chosenGame.website}> {chosenGame.website}</a>
                </>
                }
            </div>
            </div>
            </div>
          }
        
          
      </Modal.Body>
      
      <Modal.Footer className = "modal-footer">
        <Button onClick={onHide} className = "close-button">Close</Button>
      </Modal.Footer>
    </Modal>
     );
}
 
export default GameSelectModal;