import React, { useState, useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { collection, query, where, onSnapshot, updateDoc  } from 'firebase/firestore'

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


const EditCourse = (prop) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const instructorChangeHandler = (e) => {
        setInstructor(e.target.value)
    }
    const durationChangeHandler = (e) => {
        setDuration(e.target.value)
    }
    const addmissionChangeHandler = (e) => {
        setAddmission(e.target.value)
    }
    // let selectedCourse = localStorage.getItem('selectedCourse');
    // selectedCourse = JSON.parse(selectedCourse);


    const recipientSubmitHandler = (e) => {
        e.preventDefault()
        const nameRef = doc(db, "CoursesAvalaible",  prop.name);
        updateDoc(nameRef, {
            courseName: name,
            instructor,
            duration,
            addmission
        })
    }
    const [name, setName] = useState('')
    const [instructor, setInstructor] = useState('')
    const [duration, setDuration] = useState('')
    const [addmission, setAddmission] = useState('')
    const onClickHandler=()=>{
        const qry = query(collection(db, "CoursesAvalaible"));
        const q = query(qry, where("courseName", "==", prop.name));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setName(doc.data().courseName);
                setInstructor(doc.data().instructor);
                setDuration(doc.data().duration);
                setAddmission(doc.data().addmission);
            });
        });
        handleOpen()
    }
   
    return (
        <div>
            <div className='editReqButton' onClick={onClickHandler}>
                Edit
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
                            <p className='reqHeading'>Edit Course</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput"  onChange={nameChangeHandler} id="standard-basic" label="Name" variant="standard" value={name} />
                            <TextField className="emailInput" onChange={instructorChangeHandler} id="standard-basic" label="Instructor" variant="standard" value={instructor} />
                            <TextField className="phoneInput" onChange={durationChangeHandler} id="standard-basic" label="Duration" variant="standard" value={duration} />
                            <TextField className="nicInput" onChange={addmissionChangeHandler} id="standard-basic" label="Addmission" variant="standard" value={addmission} />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Update Course</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default EditCourse