import React,{useState, useEffect} from 'react'
import Header from '../Header/Header'
import RegisterationForm from '../RegisterationForm/RegisterationForm'
import { db } from '../../Firebase/Firebase'
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import './Course.css'


const Courses = () => {
    let [courses, setCourses] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "CoursesAvalaible"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const coursesArr = [];
            querySnapshot.forEach((doc) => {
                coursesArr.push(doc.data())
            });
            setCourses(coursesArr)
        });
    }, [])

    const objMap = courses.map((ele, pos) => {
        return (
            <div className='courseDiv'>
                <div><span>Course Name: </span>{ele.courseName}</div>
                <div><span>Instructor: </span>{ele.instructor}</div>
                <div><span>Duration:</span>{ele.duration}</div>
                <div><span>Addmission:</span>{ele.addmission}</div>
                <div>{ele.addmission===('Open' || 'open' || 'OPEN')? <RegisterationForm courseName={ele.courseName} />:<button disabled className='editReqButtonDisabled'>Enroll Now</button>}</div>
            </div>
        )
    })
    return (
        <div>
            <div className='headerDivEditCourses'><Header /></div>
            <div className='courseHeading'>Avalaible Courses</div>
            <div className='courseDivMain'>
                {objMap}
            </div>
        </div>
    )
}

export default Courses
