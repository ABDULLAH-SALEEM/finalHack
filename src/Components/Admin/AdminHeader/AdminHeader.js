import React from 'react'
import logo from '../../../Assets/Images/logo.png'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate()
    const auth1 = getAuth();
    const adminLogout = () => {
        signOut(auth1).then(() => {
            navigate('/admin')
        }).catch((error) => {
        });
    }

    onAuthStateChanged(auth1, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            adminLogout();
        }
    });
    const dashboardClick=()=>{
        navigate('/admin/dashboard')

    }
    const addStudentsClick=()=>{
        navigate('/adminAddStudents')
        
    }
    const coursesClick=()=>{
        navigate('/adminCourses')
        
    }
    const leaveReqClick=()=>{
        navigate('/adminViewApplications')
        
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
                        <button class="loginButton" onClick={coursesClick}>Courses</button>
                    </li>
                    <li>
                        <button class="loginButton" onClick={addStudentsClick}>Add Students</button>
                    </li>
                    <li>
                        <button class="loginButton" onClick={leaveReqClick}>Leave Application</button>
                    </li>
                    <li>
                        <button class="loginButton" onClick={adminLogout}>Log Out</button>
                    </li>

                </ul>
            </div>

            <div></div>
        </div></div>
    )
}

export default AdminHeader