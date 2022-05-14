import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../Header/Header';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../../Firebase/Firebase';
import { setDoc, doc } from 'firebase/firestore'


const Signup = () => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNIC] = useState('')
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onFNameChangeHandler = (e) => {
        setFName(e.target.value);
    }
    const nicChangeHandler = (e) => {
        setNIC(e.target.value)
    }
    const onLNameChangeHandler = (e) => {
        setLName(e.target.value);
    }

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onCnfPasswordChangeHandler = (e) => {
        setCnfPassword(e.target.value);
    }
    const onSignupFormSubmitHandler = (e) => {
        e.preventDefault();
        console.log(fName, lName, email, password, cnfPassword);

        if (password === cnfPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    navigate('/login')
                    setDoc(doc(db, 'users', user.uid), {
                        fName, lName, email
                    })
               
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                   
                })
        } else {
            alert("Password doesn't match")
        }
    }
    return (
        <div>
            <Header />
            <div className='signupWraper' >
                <p className='name'>Enrolled Student Signup Pannel</p>
                <div className='signupFormDiv'>
                    <form onSubmit={onSignupFormSubmitHandler} className='signupForm' >
                        <TextField required value={fName} onChange={onFNameChangeHandler} className="fullName" id="standard-basic" label="Enter First Name" variant="standard" />
                        <TextField required value={lName} onChange={onLNameChangeHandler} className="fullName" id="standard-basic" label="Enter Last Name" variant="standard" />
                        <TextField className="nic" value={nic} required onChange={nicChangeHandler} id="standard-basic" label="NIC" variant="standard" />
                        <TextField required value={email} onChange={onEmailChangeHandler} className="email" type='email' id="standard-basic" label="Enter Email" variant="standard" />
                        <TextField required value={password} onChange={onPasswordChangeHandler} className="password" type='password' id="standard-basic" label="Enter Password" variant="standard" />
                        <TextField required value={cnfPassword} onChange={onCnfPasswordChangeHandler} className="cnfPassword" type='password' id="standard-basic" label="Confirm Password" variant="standard" />
                        <button className="Button-Signup">Signup</button>
                        <p>{msg}</p>
                        <Link to="/login" className="backToSignIn">Already Registered? Login Now.</Link>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default Signup