import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../Firebase/Firebase';

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

const AddAdmin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const storage = getStorage();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const recipientSubmitHandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    localStorage.setItem('currentUser', JSON.stringify(user))
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                })
    }

    return (
        <div>
            <div className='editReqLeaveButton' onClick={handleOpen}>
                Add Admin
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
                            <p className='reqHeading'>Add Admin</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={nameChangeHandler} id="standard-basic" label="Name" variant="standard" />
                            <TextField className="emailInput" type='email' onChange={emailChangeHandler} id="standard-basic" label="Email" variant="standard" />
                            <TextField className="phoneInput" type='password' onChange={passwordChangeHandler} id="standard-basic" label="Password" variant="standard" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Add Admin</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default AddAdmin