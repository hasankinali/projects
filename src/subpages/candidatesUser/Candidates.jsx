import React, { useEffect, useState } from "react";
import "./../Student/App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const Candidates = ({filterStudentst}) => {
    const [studentData, setStudentData] = useState([]);
    console.log(filterStudentst);

    const onPopulateData = (id) => {
        const selectedData = studentData.filter((row) => row.id === id)[0];
        setFormData({ ...selectedData });
      };
     

      const [formData, setFormData] = useState({
        id: "",
        studentName: "",
        section: "",
        gender: "",
        averageMark: "",
        attendance: "",
      });
      const handleDelete = async (id) => {
        let confirm = window.prompt(
          "Why the meeting was canceled?"
        );
        if (confirm) {
          const response = await axios.delete(
            `https://62f27b4218493ca21f34beae.mockapi.io/student/${id}`
          );
          const unDeletedData = studentData.filter((row) => row.id !== id);
          setStudentData(unDeletedData);
        }
      }
    

     
    return (
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="text-secondary fw-bolder fs-6"
              >
                Id
              </TableCell>
              <TableCell align="center" className="text-dark fw-bolder fs-6">
                Candidates Full Name
              </TableCell>
              <TableCell align="center" className="text-dark fw-bolder fs-6">
                Interviewer
              </TableCell>
              <TableCell align="center" className="text-dark fw-bolder fs-6">
                Gender
              </TableCell>
              <TableCell align="center" className="text-dark fw-bolder fs-6">
                Phone Number
              </TableCell>
              <TableCell align="center" className="text-dark fw-bolder fs-6">
                Data
              </TableCell>
              <TableCell
                align="center"
                className="text-secondary fw-bolder fs-6"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterStudentst.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="center">
                  {index}
                </TableCell>
                <TableCell align="center">{row.studentName}</TableCell>
                <TableCell align="center">{row.section}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.averageMark}</TableCell>
                <TableCell align="center">{row.attendance}</TableCell>
                <TableCell align="center">
                  
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(index)}
                  >
                    Mark a meeting
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}