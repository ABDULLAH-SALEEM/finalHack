import React, { useState,useEffect } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import './AddStudents.css'
import * as XLSX from "xlsx";
import { db } from '../../Firebase/Firebase';
import { setDoc, doc, updateDoc, collection, query, where, onSnapshot, } from 'firebase/firestore';


const AddStudents = () => {
    const [items, setItems] = useState([]);
    const [students, setStudents]=useState([])
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
            const nameRef = doc(db, "Students", 'addedStudents');
            updateDoc(nameRef, {
                students: d,
            })
        });
    };
    useEffect(() => {
        const q = query(collection(db, "Students"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().students);
                setStudents(doc.data().students)
            });
        });
    }, [items])

    const itemMap =
        students.map((d) => {
            return (
                <div className='courseDivAdmin'>
                    <div>{d.FirstName}</div>
                    <div>{d.LastName}</div>
                    <div>{d.NIC}</div>
                </div>
            )
        })

    return (
        <div>
            <div className='adminHeaderEdit'>
                <AdminHeader />
            </div>
            <div className='addStudentsArea'>
                <label for='studentFile' >
                    <div className='bloodRecieveSibmitBut' style={{ margin: 'auto', marginTop: '10px', borderRadius: '10px', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >Upload Excel Sheet </div>
                </label>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                    }}
                    id='studentFile'
                />
                <div className='courseHeading'>Only First Name, Last Name and NIC Columns are Accepted</div>
                <div className='courseAddHearder'>
                    <div>FirstName</div>
                    <div>LastName</div>
                    <div>NIC</div>
                </div>
                <div>{itemMap}</div>
                {/* <table class="table container">
                    <thead>
                        <tr>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">NIC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((d) => (
                            <tr key={d.Item}>
                                <th>{d.FirstName}</th>
                                <td>{d.LastName}</td>
                                <td>{d.NIC}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

            </div>
        </div>

    )
}

export default AddStudents