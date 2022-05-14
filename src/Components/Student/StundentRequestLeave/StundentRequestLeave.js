import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import './StundentRequestLeave.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../../Firebase/Firebase';
import { setDoc, doc } from 'firebase/firestore';

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

const StundentRequestLeave = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const storage = getStorage();
    const [reason, setReason] = useState('')
    const [dateRangeTo, setDateRangeTo] = useState('')
    const [dateRangeFrom, setDateRangeFrom] = useState('')
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState("");
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);

    const reasonChangeHandler = (e) => {
        setReason(e.target.value)
    }
    const dateRangeToChangeHandler = (e) => {
        setDateRangeTo(e.target.value)
    }
    const dateRangeFromChangeHandler = (e) => {
        setDateRangeFrom(e.target.value)
    }
    let reportName = ""
    const onImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            reportName = file.name
            uploadHandler(file)
        }
    }
 const uploadHandler = (files) => {
        const storangeRef = ref(storage, `Reports/${reportName}`);
        const uploadTask = uploadBytesResumable(storangeRef, files)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = "Progress: " + Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + " %";
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        setUrl(url);
                    })
            }
        )
    }
    const recipientSubmitHandler = (e) => {
        e.preventDefault();
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const random = head + tail;
        setDoc(doc(db, 'leaveRequest', random), {
            userUid: currentUser.uid,
            reason,
            dateRangeTo,
            dateRangeFrom,
            reportUrl: url,
            leaveAppliedBy:currentUser.email,
            leaveId:random,
            status:"Pending"
        })

    }
    return (
        <div>
            <div className='editReqLeaveButton' onClick={handleOpen}>
                Request Leave
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
                            <p className='reqHeading'>Request Leave</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={reasonChangeHandler} id="standard-basic" label="Leave Reason" variant="standard" />
                            <TextField className="phoneInput" type='date' onChange={dateRangeFromChangeHandler} id="standard-basic" label="From" variant="standard" />
                            <TextField className="emailInput" type='date' onChange={dateRangeToChangeHandler} id="standard-basic" label="To" variant="standard" />
                            <label for='uploadReport'><p className='uploadReports'><PublishIcon />Upload Reports</p></label>
                            <input id='uploadReport' onChange={onImageChangeHandler} type="file" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Request Leave</button>    
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default StundentRequestLeave