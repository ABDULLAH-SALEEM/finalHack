import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { db } from '../../Firebase/Firebase';
import './ViewDetailLeaveApp.css'

const ViewDetailLeaveApp = () => {
    let leaveId = localStorage.getItem('CurrentLeaveReq');
    leaveId = JSON.parse(leaveId);

    const approveHandler = async () => {
        try {
            const nameRef = doc(db, "leaveRequest", leaveId.reqId);
            await updateDoc(nameRef, {
                status: "Approved",
            })
        } catch (error) {
            console.log(error);
        }
    }
    const denyHandler = () => {
        const nameRef = doc(db, "leaveRequest", leaveId.reqId);
        updateDoc(nameRef, {
            status: "Denied",
        })
    }
    const [leaveReq, setLeaveReq] = useState([])
    useEffect(() => {
        const qry = query(collection(db, "leaveRequest"));
        const q = query(qry, where("leaveId", "==", leaveId.reqId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const leaveReqArr = [];
            querySnapshot.forEach((doc) => {
                leaveReqArr.push(doc.data())
            });
            setLeaveReq(leaveReqArr)
        });
    }, [])

    let leaveReqMap = leaveReq.map((element, pos) => {
        return (
            <div className='leaveDetails'>
                <span><b>Leave Id:</b> {element.leaveId} <br /></span>
                <span><b>AppliedBy:</b> {element.leaveAppliedBy} <br /></span>
                <span><b>Reason:</b> {element.reason} <br /></span>
                <span><b>Starting Date:</b> {element.dateRangeFrom} <br /></span>
                <span><b>Ending Date:</b> {element.dateRangeTo} <br /></span>
                <span><b>Report:</b>{element.reportUrl?<img src={element.reportUrl} style={{width:'200px',height:'200px'}} />:'N/A'}</span>
                <span><b>Status:</b> {element.status} <br /></span>
                <div><div><button className='approve' onClick={approveHandler}>Approve</button><br /><br /><button className='deny' onClick={denyHandler}>Deny</button></div></div>
            </div>
        )

    })

    return (
        <div><div className='adminHeaderEdit'>
            <AdminHeader />
        </div>
            <div className='courseHeading'>Leave Application Details</div>
            <div className='courseArea'>
                {leaveReqMap}
            </div>
        </div>
    )
}

export default ViewDetailLeaveApp