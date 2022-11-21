import s from './GetItems.module.css'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { TabContainer } from 'react-bootstrap'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Close } from '@mui/icons-material'
import { useState } from 'react'


export const GetItems = () => {
    const [open, setOpen] = React.useState(false)
    const [detalis, setDetalis] = React.useState(false)
    const [itemsData, setitemsData] = React.useState([])
    const [formData, setFormData] = React.useState({
        id: "",
        wareHouse: "",
        contrAgent: "",
        amount: "",
        date: "",
        categories: "",
        name: "",
        shcode: "",
        memory: "",
        color: "",
        state: "" ,
        battary: "",
        price: "",
        sale: "",
        quantity: "",
       })

    const [agents, setAgents] = useState([])
    useEffect(() => {
    axios.get('https://636b6c66ad62451f9fb11cc3.mockapi.io/contrAgents').then((res) => {
        setAgents(res.data)
        })
    }, [])

    const [wareHouse, setWareHouse] = useState([])
    useEffect(() => {
    axios.get('https://636b6c66ad62451f9fb11cc3.mockapi.io/warehouse').then((res) => {
        setWareHouse(res.data)
        })
    }, [])

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/items'
            )
            setitemsData(responce.data)
        }
        getData()
    }, [])

    const handleSubmit = async (formSubmittedData, { resetForm }) => {
        if (formData.id) {
            const responce = await axios.put(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/items/${formData.id}`,
                { ...formSubmittedData }
            )
        let update = {...itemsData}
        let index = itemsData.findIndex((row) => row.id === formData.id);
        update[index] = responce.data
        setitemsData(update)
        console.log(index);
        resetForm()
        } else {
            const responce = await axios.post(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/items',
                {...formSubmittedData}
            )
            setitemsData([...itemsData, responce.data])
            resetForm()
        }
        
    }

    const onPopulateData = (id) => {
        const selectedData = itemsData.filter((row) => row.id === id)[0];
        setDetalis({ ...selectedData });
        setDetalis(true)
        setOpen(false)
      };


    const handleDelete = async (id) => {
        let confrim = window.confirm(
            "Вы действительно хотите удалить данные товара?"
        )
        if (confrim) {
            const responce = await axios.delete(
                `https://636b6c66ad62451f9fb11cc3.mockapi.io/items/${id}`
            )
            const unDeleteData = itemsData.filter((row) => row.id !== id)
            setitemsData(unDeleteData) 
        }
    }

    

        
    
    return (
        <div className='p-[1.5rem]'>
            <div className={s.getitems_block}>
            <h1 className='font-bold mb-[20px] uppercase'>Закупка</h1>
                <button className={s.button} onClick={() => setOpen(true)}>
                    Новая закупка
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
                                     id="date"
                                     type="date"
                                     label="Дата"
                                     variant='outlined'
                                     value={values.date}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     /> <br />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="wareHouse"
                                        type="text"
                                        label="Склад"
                                        variant='outlined'
                                        value={values.wareHouse}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="categories"
                                        type="text"
                                        label="Категория"
                                        variant='outlined'
                                        value={values.categories}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="name"
                                        type="text"
                                        label="Название"
                                        variant='outlined'
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="shcode"
                                        type="number"
                                        label="Штрих-код"
                                        variant='outlined'
                                        value={values.shcode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     /> <br />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 100 },
                                        }}
                                        id="memory"
                                        type="text"
                                        label="Память"
                                        variant='outlined'
                                        value={values.memory}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 100 },
                                        }}
                                        id="color"
                                        type="text"
                                        label="Цвет"
                                        variant='outlined'
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 100 },
                                        }}
                                        id="state"
                                        type="text"
                                        label="Состояние"
                                        variant='outlined'
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 100 },
                                        }}
                                        id="battary"
                                        type="number"
                                        label="Батарея"
                                        variant='outlined'
                                        value={values.battary}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 190 },
                                        }}
                                        id="price"
                                        type="number"
                                        label="Цена"
                                        variant='outlined'
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 200 },
                                        }}
                                        id="sale"
                                        type="number"
                                        label="Продажа"
                                        variant='outlined'
                                        value={values.sale}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 100 },
                                        }}
                                        id="quantity"
                                        type="number"
                                        label="Кол-во"
                                        variant='outlined'
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     
                                      <br/>


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

                {
                    detalis && itemsData.map((row, index) => (
                        <div key={index} className='border p-[20px] rounded-[20px] min-w-[500px] max-w-[700px] my-[40px]'>
                            <div className='flex justify-between'>
                                <h1 className='text-xl font-bold'>Подробности товара: <span>{row.name}</span></h1>
                                <Close onClick={() => setDetalis(false)} />
                            </div>
                            <p>Дата: <span>{row.date}</span></p>
                            <p>Контрагент: <span>{row.contrAgents}</span></p>
                            <p>Склад: <span>{row.wareHouse}</span></p>
                            <p>Штрих-код: <span>{row.shcode}</span></p>
                            <p>Память: <span>{row.memory} GB</span></p>
                            <p>Цвет: <span>{row.color}</span></p>
                            <p>Состояние: <span>{row.state}</span></p>
                            <p>Батарея: <span>{row.battary}</span></p>
                            <p>Цена: <span>{row.price * row.quantity} $</span></p>
                            <p>Продажа: <span>{row.sale} $</span></p>
                            <p>Кол-во: <span>{row.quantity}</span></p>
                        </div>
                    ))
                }


                <TabContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">ID</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Склад</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Сумма</TableCell>
                                <TableCell align="center" className="text-dark fw-bolder fs-6">Дата</TableCell>
                                <TableCell align="center" className="text-secondary fw-bolder fs-6">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {itemsData.map( (row) => (
                            <TableRow key={row.id}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.wareHouse}</TableCell>
                            <TableCell align="center">{row.price * row.quantity}$</TableCell>
                            <TableCell align="center">{row.date}</TableCell>

                            <TableCell align="center">
                                <button
                                    variant="contained"
                                    className="my-2 bg-[#4eeb36] w-[100px] text-center text-white py-[7px] mx-auto rounded-[5px]"
                                    onClick={() => onPopulateData(row.id)}
                                    >
                                    Detalis
                                </button>{" "}
                                &nbsp;
                                <button
                                    className="bg-[#ee0f43] w-[100px] h-[40px] text-center text-white py-[7px] rounded-[5px]"
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