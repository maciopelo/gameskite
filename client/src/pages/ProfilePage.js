import React, {useContext, useState} from 'react'
import { StoreContext } from '../store/StoreProvider';
import "../styles/profilePage.scss"
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


const BASE_URL = 'http://localhost:8080';

const BasicExample = () => (
    <div >
      <h1>My Form</h1>
      <Formik
        initialValues={
            { 
                nick: '',
                password:'' 
            }
        }
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <label for="name">Name:
                <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
                />
            </label>

            
            <label for="name">Name:
                <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
                />
            </label>
            
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );




export default function ProfilePage() {

    const [show, setShow] = useState(false);
    const [nickToChange, setNickToChange] = useState("")
    const [isAvailable, setIsAvailable] = useState(false)
    const { userData } = useContext(StoreContext);
    const nick = userData.nick
 

    const checkIfNickAvailable = async () =>{
      const res = await Axios.get(`${BASE_URL}/change/nick/${nickToChange}`)
      setIsAvailable(res.data)
    }

    const handleButtonCheck = (e) =>{
      e.preventDefault()
      handleShow()
      if(nickToChange.length > 2 && nickToChange.length < 30){
        checkIfNickAvailable()
      }else{
        console.log("less then 2 or more than 30")
      }
      
    }
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="profile-page-container">
          <div className="profile-wrapper">
            <h1 className="user-nick">{`${nick}'s profile`}</h1>
            <form>
              <label htmlFor="name">Name:
                <input 
                  name="name" 
                  type="text" 
                  value={nickToChange}
                  onChange={e=>{setNickToChange(e.target.value)}}/> 
              </label>
              <button onClick={e => handleButtonCheck(e)}>Check</button>

            </form>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>

              <Modal.Title>
                {isAvailable ? "Warning" : "Error"}
              </Modal.Title>

            </Modal.Header>

            <Modal.Body>
              {isAvailable ? 
              "Are you sure u want to change your current nick ?" 
              : "Entered name is already in use, pick other. "}
            </Modal.Body>

            <Modal.Footer>
              {isAvailable ? 
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button> : 
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              }
            </Modal.Footer>
          </Modal>


        </div>


    )
}
