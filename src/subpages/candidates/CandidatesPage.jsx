

import { Candidates } from '../candidatesUser/Candidates'
import styles from './CandidatesPage.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'



export const CandidatesPage = () => {
    const [value,setValue] = useState('')
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        const getData = async () => {
          const response = await axios.get(
            "https://62f27b4218493ca21f34beae.mockapi.io/student"
          );
          console.log(response.data);
          setStudentData(response.data);
        };
        getData();
      }, []);

     
// console.log(studentData.studentName);

const filterStudentst = studentData.filter(student => {
    return student.studentName
    .toLowerCase()
    .includes(value.toLocaleLowerCase())
})

console.log(filterStudentst);
    return (
        <div>
            <div className={styles.candidates_navigation}>
                <h1>Кандидаты</h1>
                <div className={styles.serch}>
                    <input type="text" placeholder='Search' onChange={e => setValue(e.target.value)}/>
                    <button><span className={ `material-icons ${ styles.icon }` }>search</span></button>
                </div>
            </div>
            <div className={styles.candidates}>
                
            </div>
            <div className={styles.candidates_block}>
                <Candidates filterStudentst={filterStudentst}/>

            </div>
        </div>
    )
}