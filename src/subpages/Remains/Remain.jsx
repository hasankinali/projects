import s from '../GetItems/GetItems.module.css'
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { TabContainer } from 'react-bootstrap'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Close } from '@mui/icons-material'


export const Remain = () => {
    const [open, setOpen] = React.useState(false)
    const [detalis, setDetalis] = React.useState(false)
    const [itemsData, setitemsData] = React.useState([])
    const [formData, setFormData] = React.useState({
        id: "",
        wareHouse: "",
        contrAgents: "",
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
      console.log(formData);

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/items'
            )
            console.log(responce.data);
            setitemsData(responce.data)
        }
        getData()
    }, [])

    const onPopulateData = (id) => {
        const selectedData = itemsData.filter((row) => row.id === id)[0];
        setDetalis({ ...selectedData });
        setDetalis(true)
        setOpen(false)
    }
    
    return (
        <div className='p-[1.5rem]'>
            <div className={s.getitems_block}>
            <h1 className='font-bold mb-[20px] uppercase'>Остатки товара</h1>
                {
                    detalis && itemsData.map((row) => (
                        <div className='border p-[20px] rounded-[20px] min-w-[500px] max-w-[700px] my-[40px]'>
                            <div className='flex justify-between'>
                                <h1 className='text-xl font-bold'>Подробности товара: <span>{row.name}</span></h1>
                                <Close onClick={() => setDetalis(false)} />
                            </div>
                            <p>Дата: <span>{row.date}</span></p>
                            <p>Контрагент: <span>{row.contrAgents}</span></p>
                            <p>Склад: <span>{row.wareHouse}</span></p>
                            <p>Категория: <span>{row.categories}</span></p>
                            <p>Штрих-код: <span>{row.shcode}</span></p>
                            <p>Память: <span>{row.memory} GB</span></p>
                            <p>Цвет: <span>{row.color}</span></p>
                            <p>Состояние: <span>{row.state}</span></p>
                            <p>Батарея: <span>{row.battary}</span></p>
                            <p>Цена: <span>{row.price} $</span></p>
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
                        {itemsData.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.wareHouse}</TableCell>
                            <TableCell align="center">{row.price} $</TableCell>
                            <TableCell align="center">{row.date}</TableCell>

                            <TableCell align="center">
                                <button
                                    variant="contained"
                                    className="my-2 bg-[#4eeb36] w-[100px] text-center text-white py-[7px] mx-auto rounded-[5px]"
                                    onClick={() => onPopulateData(row.id)}
                                    >
                                    Detalis
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