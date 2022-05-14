import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase';
import StudentHeader from '../StudentHeader/StudentHeader';

const ViewLeaves = () => {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [leaves, setLeaves] = useState([])
    let [status, setStatus] = useState('')
    let [reason, setReason] = useState('')
    let [from, setFrom] = useState('')
    let [to, setTo] = useState('')
    useEffect(() => {
        if (currentUser) {
            const qry = query(collection(db, "leaveRequest"));
            const q = query(qry, where("userUid", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const leavesArr = [];
                querySnapshot.forEach((doc) => {
                    leavesArr.push(doc.data())
                });
                setLeaves(leavesArr)
            });
        }
    }, [status])

    const leavesMap = leaves.map((ele, pos) => {
        return (
            <div className='courseDiv'>
                <div><span>Reason: </span>{ele.reason}</div>
                <div><span>Starting From: </span>{ele.dateRangeFrom}</div>
                <div><span>Till:</span>{ele.dateRangeTo}</div>
                <div><span>Status:</span>{ele.status}</div>
            </div>
        )
    })
    return (
        <div>
            <div className='studentHeaderEdit'>
                <StudentHeader />
            </div>
            <div className='courseHeading'>All Leaves Will Appeare Here</div>
            <div className='courseDivMain'>
                {leavesMap}
            </div>
        </div>
    )
}

export default ViewLeaves