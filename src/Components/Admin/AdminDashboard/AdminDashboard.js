import React from 'react'
import AddAdmin from '../AddAdmin/AddAdmin'
import AdminHeader from '../AdminHeader/AdminHeader'
import { Link } from 'react-router-dom'
import './AdminDashboard.css'
import PasswordReset from '../PasswordReset/PasswordReset'

const AdminDashboard = () => {
    return (
        <div>
            <div className='adminHeaderEdit'>
                <AdminHeader />
            </div>
            <div className='adminDashboard'>
                <div>
                    <AddAdmin />
                </div>
                <div className='viewLeave'>
                    <Link to="/adminCourses" className="link" style={{color:'white', fontSize:'20px'}} >Courses</Link>
                </div>
                <div>
                    <PasswordReset />
                </div>

                <div className='viewLeave'>
                    <Link to="/adminAddStudents" className="link" style={{color:'white', fontSize:'20px'}} >Add Students</Link>
                </div>

                <div className='viewLeave'>
                    <Link to="/adminViewApplications" className="link" style={{color:'white', fontSize:'20px'}} >Leave Applications</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

