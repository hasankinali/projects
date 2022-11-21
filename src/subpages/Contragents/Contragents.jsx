import { TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { TabContainer } from 'react-bootstrap'
import s from './Contragents.module.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

export const ContrAgents = () => {
    const [open, setOpen] = React.useState(false)
    const [contrData, setcontrData] = React.useState([])
    const [formData, setFormData] = React.useState({
        id: "",
        contrAgent: "", 
        phoneNumber: "",
        position: "",
        amount: "",
      })
      console.log(formData);

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/contrAgents'
            )
            console.log(responce.data);
            setcontrData(responce.data)
        }
        getData()
    }, [])

    const handleSubmit = async (formSubmittedData, { resetForm }) => {
        if (formData.id) {
            const responce = await axios.put(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/contrAgents/${formData.id}`,
                { ...formSubmittedData }
            )
        let update = {...contrData}
        let index = contrData.findIndex((row) => row.id === formData.id);
        update[index] = responce.data
        setcontrData(update)
        resetForm()
        } else {
            const responce = await axios.post(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/contrAgents',
                {...formSubmittedData}
            )
            setcontrData([...contrData, responce.data])
            resetForm()
        }
        
    }


    const handleDelete = async (id) => {
        let confrim = window.confirm(
            "Вы действительно хотите удалить контрагента?"
        )
        if (confrim) {
            const responce = await axios.delete(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/contrAgents/${id}`
            )
            const unDeleteData = contrData.filter((row) => row.id !== id)
            setcontrData(unDeleteData) 
        }
    }
 
    return (
        <div className='p-[1.5rem]'>
            <div className={s.contr_block}>
                <h1 className='font-bold mb-[20px] uppercase'>Контрагенты</h1>
                <button className={s.button} onClick={() => setOpen(true)}>
                    Добавить контрагента
                </button>
                {
                    open && (
                        <div className='mt-[40px]'>
                            <Formik 
                                initialValues={formData}
                                onSubmit={handleSubmit} 
                                enableReinitialize={true} 
                            >
                            {({
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                resetForm,
                            }) => (
                                <Box noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <TextField
                                    sx={{
                                        "& > :not(style)": { m: 1, width: 300 },
                                      }}
                                     id="contrAgent"
                                     type="text"
                                     label="Контрагент"
                                     variant='outlined'
                                     value={values.contrAgent}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     /> <br />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="phoneNumber"
                                        type="number"
                                        label="Номер телефона"
                                        variant='outlined'
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     /> <br />
                                     
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="position"
                                        variant='outlined'
                                        type="number"
                                        label="КОЛ-ВО ПОЗИЦИЙ"
                                        value={values.position}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     /> <br />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="amount"
                                        type="number"
                                        label="СУММА"
                                        variant='outlined'
                                        value={values.amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     /> <br/>
                                        <button className="my-[30px] bg-[#4eeb36] min-w-[180px] text-white py-[7px] mx-auto rounded-[5px]" type="submit" variant="contained" disabled={isSubmitting} onClick={handleSubmit}>
                                            Сохранить
                                        </button>{" "}
                                        &nbsp;
                                        <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px] mr-[10px]"  variant="contained" onClick={resetForm}>
                                        Очистить
                                        </button>
                                        <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px]"  variant="contained"  onClick={() => setOpen(false)}>
                                         Закрыть
                                        </button>
                                </Box>
                            )}
                            </Formik>
                        </div>
                    )
                }


                <TabContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Контрагент</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Номер телефона</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">КОЛ-ВО ПОЗИЦИЙ</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">СУММА</TableCell>
                                <TableCell align="center" className="text-secondary fw-bolder fs-6">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {contrData.map( (row) => (
                            <TableRow key={row.id}>
                            <TableCell align="center">{row.contrAgent}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">{row.position}</TableCell>
                            <TableCell align="center">{row.amount} $</TableCell>

                            <TableCell align="center">
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
                </TabContainer>
            </div>
        </div>
    )
}