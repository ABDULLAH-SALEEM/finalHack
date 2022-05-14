import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from '@firebase/auth';
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

const PasswordReset = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const oldPasswordChangeHandler = (e) => {
        setOldPassword(e.target.value)
    }
    const newPasswordChangeHandler = (e) => {
        setNewPassword(e.target.value)
    }
    const recipientSubmitHandler = (e) => {
        e.preventDefault()
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            oldPassword
        );
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            updatePassword(auth.currentUser, newPassword).then(() => {
                alert('password Changed')
            });
        }).catch((error) => {
            console.log(error);
            alert('Current Password Does not match')
        });
    }
    return (
        <div>
            <div className='editReqLeaveButton' onClick={handleOpen}>
                Reset Password
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
                            <p className='reqHeading'>Reset Password</p>
                            <CancelIcon onClick={handleClose} />
                        </div>
                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={oldPasswordChangeHandler} type='password' id="standard-basic" label="Current Password" variant="standard" />
                            <TextField className="emailInput" onChange={newPasswordChangeHandler} type='password' id="standard-basic" label="New Password" variant="standard" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Reset Password</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default PasswordReset