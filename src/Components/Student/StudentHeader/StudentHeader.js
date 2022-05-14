import React from 'react'
import logo from '../../../Assets/Images/logo.png'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const StudentHeader = () => {
    const navigate = useNavigate()
    const auth2 = getAuth();
    const studentLogout = () => {
        signOut(auth2).then(() => {
            navigate('/')
        }).catch((error) => {
        });
    }

    onAuthStateChanged(auth2, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            studentLogout();
        }
    });

    const dashboardClick=()=>{
        navigate('/studentDasboard')
    }

    const viewLeavesClick=()=>{
        navigate('/viewLeaves')
    }

    return (
        <div><div class="navbar">
            <div class="logo"><img className='logoImg' src={logo} /></div>
            <input type="checkbox" id="check" />
            <label for="check">
                <span class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </span>
            </label>


            <div class="components">
                <ul>
                    <li>
                        <button class="loginButton" onClick={dashboardClick}>Dashboard</button>
                    </li>
                    <li>
                        <button class="loginButton" onClick={viewLeavesClick}>View Leaves</button>
                    </li>
                    <li>
                        <button class="loginButton" onClick={studentLogout}>Log Out</button>
                    </li>
                </ul>
            </div>

            <div></div>
        </div></div>
    )
}

export default StudentHeader