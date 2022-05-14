import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import './RegisterationForm.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const RegisterationForm = (prop) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [nic, setNIC] = useState('')
    const [city, setCity] = useState('')

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }
    const phoneChangeHandler = (e) => {
        setPhone(e.target.value)
    }
    const nicChangeHandler = (e) => {
        setNIC(e.target.value)
    }
    const cityChangeHandler = (e) => {
        setCity(e.target.value)
    }
    const recipientSubmitHandler = (e) => {
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const random = head + tail;
        e.preventDefault();
        setDoc(doc(db, 'EnrolledApplications', random), {
            enrolledIn:prop.courseName,
            name,
            email,
            phone,
            nic,
            city 
        })
    }
    return (
        <div>
            <div className='editReqButton' onClick={handleOpen}>
                Enroll Now
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='reqHeader'>
                            <p className='reqHeading'>Course Registeration Form For {prop.courseName}</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={nameChangeHandler} id="standard-basic" label="Name" variant="standard" />
                            <TextField className="emailInput" onChange={emailChangeHandler} id="standard-basic" label="Email" variant="standard" />
                            <TextField className="phoneInput" onChange={phoneChangeHandler} id="standard-basic" label="Phone Number" variant="standard" />
                            <TextField className="nicInput" onChange={nicChangeHandler} id="standard-basic" label="NIC" variant="standard" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Submit Application</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default RegisterationForm