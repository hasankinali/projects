import { Paper, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { TabContainer, Table } from 'react-bootstrap'
import s from './Market.module.css'

export const Market = () => {
    const [sale, setSale] = React.useState(false)
    const [product, setProduct] = React.useState([])
    const [client, setClient] = React.useState([])
    const [marketData, setMarketData] = React.useState([])
    const [formData, setFormData] = React.useState({
        date: '',
        client: '',
        product: '',
        sNumber: '',
        color: '',
        spetification: '',
        battary: '',
        state: '',
        amount: '',
    })

    // Get product name
    React.useEffect(() => {
        axios.get('https://636e96f7bb9cf402c805aa92.mockapi.io/sale').then((res) => {
            setProduct(res.data)
            })
    }, [])

    // Get client name
    React.useEffect(() => {
        axios.get('https://62f27b4218493ca21f34beae.mockapi.io/student').then((res) => {
            setClient(res.data)
            })
    }, [])

    // Get sale data
    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636e96f7bb9cf402c805aa92.mockapi.io/sale'
            )
            setMarketData(responce.data)
        }
        getData()
    }, [])
    

    const handleSubmit = async (formSubmittedData, { resetForm }) => {
        if (formData.id) {
            const responce = await axios.put(
                `https://636e96f7bb9cf402c805aa92.mockapi.io/sale/${formData.id}`,
                { ...formSubmittedData }
            )
        let update = {...marketData}
        let index = marketData.findIndex((row) => row.id === formData.id);
        update[index] = responce.data
        setMarketData(update)
        resetForm()
        } else {
            const responce = await axios.post(
                'https://636e96f7bb9cf402c805aa92.mockapi.io/sale',
                {...formSubmittedData}
            )
            setMarketData([...marketData, responce.data])
            resetForm()
        }
        
    }

    const handleDelete = async (id) => {
        let confrim = window.confirm(
            "Вы действительно хотите удалить данные товара?"
        )
        if (confrim) {
            const responce = await axios.delete(
                `https://636e96f7bb9cf402c805aa92.mockapi.io/sale/${id}`
            )
            const unDeleteData = marketData.filter((row) => row.id !== id)
            setMarketData(unDeleteData) 
        }
    }
    
    let marketSale = marketData.length

    return (
        <div className='p-[1.5rem]'>
            <div className={s.kassa}>
                <h1 className='mb-10 text-xl font-bold'>СТАТИСТИКА</h1>
                <div className={s.statistics}>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#9155fd] p-[13px] rounded-[5px] text-white'>trending_up</h1>
                        <div>
                            <p>ПРОДАЖИ</p>
                            <p className='text-2xl font-semibold'>{marketSale}</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#ffb400] p-[13px] rounded-[5px] text-white'>replay</h1>
                        <div>
                            <p>ВОЗВРАТЫ</p>
                            <p className='text-2xl font-semibold'>0</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#de4c4a] p-[13px] rounded-[5px] text-white'>loop</h1>
                        <div>
                            <p>TRADE-IN</p>
                            <p className='text-2xl font-semibold'>0</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#c426c4] p-[13px] rounded-[5px] text-white'>attach_money</h1>
                        <div>
                            <p>ПРИБИЛЬ</p>
                            <p className='text-2xl font-semibold'>0.00 $</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.market_block}>
                <h1 className='text-xl font-semibold'>МАГАЗИН</h1>
                <div className={s.market_button}>
                    <button onClick={() => setSale(true)}>Продажа</button>
                    <button>Возврат</button>
                    <button>Обмен</button>
                </div> 
                <div>
                    <div>
                    {
                    sale && (
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
                                     variant='outlined'
                                     value={values.date}
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     /> <br />
                                     
                                     <select name="" id="">
                                        <option disabled>Клиент</option>
                                        {
                                            client.map((name) => (
                                                <option value={values.client}>{name.studentName}</option>
                                            ))
                                        }
                                     </select>
                                        <br />
                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="product"
                                        type="text"
                                        label="Товар"
                                        value={values.product}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     /> <br/>

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="sNumber"
                                        type="number"
                                        label="Серийный номер"
                                        value={values.sNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="client"
                                        type="text"
                                        label="Клиент"
                                        value={values.client}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="spetification"
                                        type="text"
                                        label="Характеристики"
                                        value={values.spetification}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="color"
                                        type="text"
                                        label="Цвет"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="battary"
                                        type="number"
                                        label="Батарейка"
                                        value={values.battary}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                    <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="state"
                                        type="text"
                                        label="Состояние"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />
                                     <TextField
                                        sx={{
                                            "& > :not(style)": { m: 1, width: 300 },
                                        }}
                                        id="amount"
                                        type="text"
                                        label="Цена"
                                        value={values.amount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                     />

                                     <br />
                                        <button className="my-[30px] bg-[#4eeb36] min-w-[180px] text-white py-[7px] mx-auto rounded-[5px]" type="submit" variant="contained" disabled={isSubmitting} onClick={handleSubmit}>
                                            Сохранить
                                        </button>{" "}
                                        &nbsp;
                                        <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px] mr-[10px]"  variant="contained" onClick={resetForm}>
                                        Очистить
                                        </button>
                                        <button className="bg-[#ee0f43] w-[180px] h-[40px] text-center text-white py-[7px] rounded-[5px]"  variant="contained"  onClick={() => setSale(false)}>
                                         Закрыть
                                        </button>
                                </Box>
                            )}
                            </Formik>
                        </div>
                    )
                }

                    <div className='mt-10 w-full'>
                        <TabContainer component={Paper}>
                            <Table style={{width: "100%"}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className="text-dark fw-bolder fs-6">Клиент</TableCell>
                                        <TableCell align="center" className="text-dark fw-bolder fs-6">Сумма</TableCell>
                                        <TableCell align="center" className="text-dark fw-bolder fs-6">Дата</TableCell>
                                        <TableCell align="center" className="text-secondary fw-bolder fs-6">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {marketData.map( (row) => (
                                    <TableRow key={row.id}>
                                    <TableCell align="center">{row.client}</TableCell>
                                    <TableCell align="center">{row.amount} $</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>

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
                </div>   
            </div>
        </div>
    )
}