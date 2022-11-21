import { TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { TabContainer } from 'react-bootstrap'
import s from './Warehouse.module.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";


export const Warehous = () => { 
    const [open, setOpen] = React.useState(false)
    const [wareData, setWareData] = React.useState([])
    const [formData, setFormData] = React.useState({
        id: "",
        warehouse: "",
        position: "",
        amount: "",
      })
      console.log(formData);

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/warehouse'
            )
            console.log(responce.data);
            setWareData(responce.data)
        }
        getData()
    }, [])

    const handleSubmit = async (formSubmittedData, { resetForm }) => {
        if (formData.id) {
            const responce = await axios.put(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/warehouse/${formData.id}`,
                { ...formSubmittedData }
            )
        let update = {...wareData}
        let index = wareData.findIndex((row) => row.id === formData.id);
        update[index] = responce.data
        setWareData(update)
        resetForm()
        } else {
            const responce = await axios.post(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/warehouse',
                {...formSubmittedData}
            )
            setWareData([...wareData, responce.data])
            resetForm()
        }
        
    }

    const onPopulateData = (id) => {
        const selectedData = wareData.filter((row) => row.id === id)[0];
        setFormData({ ...selectedData });
      };
    


    const handleDelete = async (id) => {
        let confrim = window.confirm(
            "Вы действительно хотите удалить данные склада?"
        )
        if (confrim) {
            const responce = await axios.delete(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/warehouse/${id}`
            )
            const unDeleteData = wareData.filter((row) => row.id !== id)
            setWareData(unDeleteData) 
        }
    }
 
    return (
        <div className='p-[1.5rem]'>
            <div className={s.warehouse_block}>
                <h1 className='font-bold mb-[20px]'>СКЛАДЫ</h1>
                <button className={s.button} onClick={() => setOpen(true)}>
                    Добавить склад
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
                                     id="warehouse"
                                     type="text"
                                     label="Склад"
                                     variant='outlined'
                                     value={values.warehouse}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     /> <br />
                                     
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="position"
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
                    <Table style={{width: '100%'}} >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Склад</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6"></TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">СУММА</TableCell>
                                <TableCell align="center" className="text-secondary fw-bolder fs-6">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {wareData.map( (row) => (
                            <TableRow key={row.id}>
                            
                            <TableCell align="center">{row.warehouse}</TableCell>
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