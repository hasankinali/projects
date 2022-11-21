import'./CreateCandidates.module.css'
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik } from "formik";

export const Student = () => {
  const [open, setOpen] = React.useState(false)
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    studentName: "",
    section: "",
    gender: "",
    averageMark: "",
    attendance: "",
  });

  let clientLenth = studentData.length

  // GET
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


  // Validation
  const handleValidate = (formDataToValidate) => {
    var error = {};
    if (formDataToValidate.studentName === "")
      error.studentName = "Введите имя клиента";
    if (formDataToValidate.section === "") error.section = "Введите покупки";
    if (formDataToValidate.gender === "") error.gender = "Enter a  Gender";
    if (formDataToValidate.averageMark === "")
      error.averageMark = "Введите номер клиента";
    return error;
  };


  // PUT
  const handleSubmit = async (formSubmittedData, { resetForm }) => {
    if (formData.id) {
      // Update student details
      const response = await axios.put(
        `https://62f27b4218493ca21f34beae.mockapi.io/student/${formData.id}`,
        { ...formSubmittedData }
      );
      let update = [...studentData];
      let index = studentData.findIndex((row) => row.id === formData.id);
      update[index] = response.data;
      setStudentData(update);
      resetForm();
    } else {

      // POST  Create new client details
      const response = await axios.post(
        "https://62f27b4218493ca21f34beae.mockapi.io/student",
        { ...formSubmittedData }
      );
      setStudentData([...studentData, response.data]);
      resetForm();
    }
  };

  // Edit Client
  const onPopulateData = (id) => {
    const selectedData = studentData.filter((row) => row.id === id)[0];
    setFormData({ ...selectedData });
    setOpen(true)
  };

  // deleting student details
  const handleDelete = async (id) => {
    let confirm = window.confirm(
      "Вы действительно хотите удалить данного клиента?в"
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
    <>
      {/* Form */}
      <div className="container m-[1.5rem] client_block">
        <h1 className='font-bold mb-[20px]'>КЛИЕНТЫ</h1>
        <button onClick={() => setOpen(true)} className="my-2 bg-[#9155fd] w-[180px] text-white py-[7px] mx-auto rounded-[5px]">
          Добавить клиента
        </button>
      {
        open && (
          <div >
            <Formik
              initialValues={formData}
              validate={handleValidate}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm,
              }) => (
                <Box
                  className="form"
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    sx={{
                      "& > :not(style)": { m: 1, width: 400 },
                    }}
                    id="studentName"
                    type="text"
                    label="Имя"
                    variant="outlined"
                    value={values.studentName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span style={{ color: "red" }}>
                    <p>{touched.studentName && errors.studentName}</p>
                  </span>
                  <TextField
                    sx={{
                      "& > :not(style)": { m: 1, width: 400 },
                    }}
                    id="section"
                    type="number"
                    label="Покупок"
                    variant="outlined"
                    value={values.section}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p>
                    <span style={{ color: "red" }}>
                      {touched.section && errors.section}
                    </span>
                  </p>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Пол
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="gender"
                      id="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Мужчина"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Женщина"
                      />
                    </RadioGroup>
                  </FormControl>
                  <p>
                    <span style={{ color: "red" }}>
                      {touched.gender && errors.gender}
                    </span>
                  </p>
                  <TextField
                    sx={{
                      "& > :not(style)": { m: 1, width: 400 },
                    }}
                    id="averageMark"
                    type="number"
                    label="Номер телефона"
                    variant="outlined"
                    value={values.averageMark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p>
                    <span style={{ color: "red" }}>
                      {touched.averageMark && errors.averageMark}
                    </span>
                  </p>
                  <TextField
                    sx={{
                      "& > :not(style)": { m: 1, width: 400 },
                    }}
                    id="attendance"
                    type="date"
                    label="Data"
                    variant="outlined"
                    value={values.attendance}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span style={{ color: "red" }}>
                    <p>{touched.attendance && errors.attendance}</p>
                  </span>
                  <button className="my-2 bg-[#4eeb36] min-w-[180px] text-white py-[7px] mx-auto rounded-[5px]" type="submit" variant="contained" disabled={isSubmitting}>
                    Сохранить
                  </button>{" "}
                  &nbsp;
                  <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px] mr-[10px]"  variant="contained" onClick={resetForm}>
                    Очистить
                  </button>
                  <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px]" onClick={() => setOpen(false)}>
                    Закрыть
                  </button>
                  

                </Box>
              )}
            </Formik>
          </div>
        )
      }

        {/* Table */}
        <p className="my-3"></p>
        <TableContainer >
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
                  Имя
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Покупок
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Пол
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Номер телефона
                </TableCell>
                <TableCell align="center" className="text-dark fw-bolder fs-6">
                  Дата
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
              {studentData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.studentName}</TableCell>
                  <TableCell align="center">{row.section}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.averageMark}</TableCell>
                  <TableCell align="center">{row.attendance}</TableCell>
                  <TableCell align="center">
                    <button
                      variant="contained"
                      className="my-2 bg-[#4eeb36] min-w-[100px] text-white py-[7px] mx-auto rounded-[5px]"
                      onClick={() => onPopulateData(row.id)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      className="bg-[#ee0f43] w-[100px] h-[40px] text-center text-white py-[7px] rounded-[5px]"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Student

