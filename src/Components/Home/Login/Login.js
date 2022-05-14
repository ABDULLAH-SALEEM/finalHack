import { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../Header/Header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';



const Login = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onLoginFormSubmitHandler = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('currentUser', JSON.stringify(user))
                navigate('/studentDasboard');
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                console.log(errorMessage);
            })

    }


    return (
        <div>
            <div className='headerDivEditLogin'>
                <Header />
            </div>
            <div><p className='name'>Enrolled Student Login Pannel</p></div>
            <div className='loginWraper' >
                
                {/* <p className='tagline'>Give and let Live.</p> */}
                <div className='loginFormDiv'>
                    <form onSubmit={onLoginFormSubmitHandler} className='loginForm' >
                        <TextField required className="email" value={email} type='email' id="standard-basic" onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                        <TextField required value={password} className="password" type='password' id="standard-basic" onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                        <button className="Button">Login</button>
                        <p>{msg}</p>
                        <Link to="/signup" className="jumpToLogin">Not Registered? Signup Now.</Link>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
