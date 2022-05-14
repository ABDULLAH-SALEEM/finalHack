import React,{useState, useEffect} from 'react'
import AddCourse from '../AddCourse/AddCourse'
import AdminHeader from '../AdminHeader/AdminHeader'
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import './Courses.css'
import EditCourse from '../EditCourse/EditCourse'

const AdminCourses = () => {

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
        const onClickHandler=()=>{
            const selectedCourseName = {
                selectedCourseName: ele.courseName
            }
            localStorage.setItem('selectedCourse', JSON.stringify(selectedCourseName))     
        }
        return (
            <div className='courseDivAdmin'>
                <div>{ele.courseName}</div>
                <div>{ele.instructor}</div>
                <div>{ele.duration}</div>
                <div>{ele.addmission}</div>
                <div onClick={onClickHandler}  ><EditCourse name={ele.courseName} /></div>
            </div>
        )
    })


    return (
        <div>
            <div className='adminHeaderEdit'>
                <AdminHeader />
            </div>
            <div className='courseArea'>
                <div className='addCourseDiv'><AddCourse /></div>
                <div className='courseAddHearder'>
                    <div>Name</div>
                    <div>Teacter</div>
                    <div>Duration</div>
                    <div>Admission</div>
                    <div>Edit</div>
                </div>
                <div>
                    {objMap}
                </div>
            </div>

        </div>

    )
}

export default AdminCourses