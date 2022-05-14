import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { collection, query, where, onSnapshot, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ViewLeaveApplication = () => {
    const [leaveReq, setLeaveReq] = useState([])
    useEffect(() => {
        const q = query(collection(db, "leaveRequest"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const leaveReqArr = [];
            querySnapshot.forEach((doc) => {
                leaveReqArr.push(doc.data())
            });
            setLeaveReq(leaveReqArr)
        });
    }, [])

    const LeaveReqMap = leaveReq.map((element, pos) => {
        const linkTo=`/LeaveApplicationDetail/${element.leaveId}`
        const onClickHandler=()=>{
            const leaveId = {
                reqId: element.leaveId
            }
            localStorage.setItem('CurrentLeaveReq', JSON.stringify(leaveId))     
        }
        return (
            <div className='courseDivAdmin'>
                <div >{element.leaveAppliedBy}</div>
                <div>{element.reason}</div>
                <Link to={linkTo}><div onClick={onClickHandler}>View Full Detail</div></Link>
            </div>
        )
    })

    return (
        <div>
            <div className='adminHeaderEdit'>
                <AdminHeader />
            </div>
            <div className='courseHeading'>Leave Applications</div>
            <div className='courseArea'>
                <div className='courseAddHearder'>
                    <div>Applied By</div>
                    <div>Reason</div>
                    <div>Details</div>
                </div>
                {LeaveReqMap}
            </div>

        </div>
    )
}

export default ViewLeaveApplication