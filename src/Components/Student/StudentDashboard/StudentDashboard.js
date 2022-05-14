import React from 'react'
import StudentHeader from '../StudentHeader/StudentHeader'
import StundentRequestLeave from '../StundentRequestLeave/StundentRequestLeave'
import './StudentDashboard.css'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    return (
        <div>
            <div className='studentHeaderEdit'>
                <StudentHeader />
            </div>
            <div className='StudentDashboard'>
                <div className='reqLeave'>
                    <StundentRequestLeave />
                </div>
                {/* <div className='viewLeave'>
                    View Leaves
                </div> */}
                <div className='viewLeave'>
                    <Link to="/viewLeaves" className="link" style={{color:'white'}} >View Leaves</Link>
                </div>
            </div></div>


    )
}

export default StudentDashboard