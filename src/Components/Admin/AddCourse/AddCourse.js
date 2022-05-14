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


const AddCourse = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('')
    const [instructor, setInstructor] = useState('')
    const [duration, setDuration] = useState('')
    const [addmission, setAddmission] = useState('')


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

    const recipientSubmitHandler = (e) => {
        e.preventDefault()
        setDoc(doc(db, 'CoursesAvalaible', name), {
            courseName: name,
            instructor,
            duration,
            addmission
        })
    }

    return (
        <div>
            <div className='editReqButton' onClick={handleOpen}>
                Add Course
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
                            <p className='reqHeading'>Add New Course</p>
                            <CancelIcon onClick={handleClose} />
                        </div>

                        <form className='recieveBloodForm' onSubmit={recipientSubmitHandler}>
                            <TextField className="nameInput" onChange={nameChangeHandler} id="standard-basic" label="Name" variant="standard" />
                            <TextField className="emailInput" onChange={instructorChangeHandler} id="standard-basic" label="Instructor" variant="standard" />
                            <TextField className="phoneInput" onChange={durationChangeHandler} id="standard-basic" label="Duration" variant="standard" />
                            <TextField className="nicInput" onChange={addmissionChangeHandler} id="standard-basic" label="Addmission" variant="standard" />
                            <button onClick={handleClose} className='bloodRecieveSibmitBut'>Add Course</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>

        </div>
    )
}

export default AddCourse