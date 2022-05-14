import React, { useState } from 'react'
import { Routes as AppRoutes, Route } from "react-router-dom";
import { useNavigate } from 'react-router';
import Login from '../Home/Login/Login';
import Signup from '../Home/Signup/Signup';
import Home from '../Home/Home';
import Courses from '../Home/Courses/Courses';
// import Courses   from '../Home/Courses/Courses';
import StudentDashboard from '../Student/StudentDashboard/StudentDashboard';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';
import AdminCourses from '../Admin/Courses/AdminCourses';
import AddStudents from '../Admin/AddStudents/AddStudents';
import AdminLogin from '../Admin/AdminLogin/AdminLogin';
import ViewLeaveApplication from '../Admin/ViewLeaveApplication/ViewLeaveApplication';
import ViewLeaves from '../Student/ViewLeaves/ViewLeaves';
import ViewDetailLeaveApp from '../Admin/ViewDetailLeaveApp/ViewDetailLeaveApp';


const Routes = () => {
    // const navigate=useNavigate();
    // const [token, setToken] = useState('')
    // const authContext = {
    //     signIn: async () => {
    //         let userToken = localStorage.getItem('userToken')
    //         userToken = JSON.parse(userToken)
    //         setToken(userToken)
    //         navigate('home')
    //     },
    //     signOut: async () => {
    //         localStorage.removeItem('userToken')
    //         setToken(null)
    //         navigate('/')
    //     },
    // }

    return (
        // <AuthContext.Provider value={authContext}>
        //     {token ? <AppRoutes>
        //         <Route path="/home" element={<Home />} />
        //     </AppRoutes> : <AppRoutes>
        //         <Route path="/" element={<Login />} />
        //         <Route path="/signup" element={<Signup />} />
        //     </AppRoutes>}
        // </AuthContext.Provider>
        <AppRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/studentDasboard" element={<StudentDashboard />} />
            <Route path="/admin" element={ <AdminLogin /> } />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/adminCourses" element={ <AdminCourses /> } />
            <Route path="/adminAddStudents" element={ <AddStudents /> } />
            <Route path="/adminViewApplications" element={ <ViewLeaveApplication /> } />
            <Route path="/viewLeaves" element={ <ViewLeaves /> } />
            <Route path="/LeaveApplicationDetail/:id" element={<ViewDetailLeaveApp />} />
        </AppRoutes>
    )
}

export default Routes