import { IconButton, Paper, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { Statistics } from '../../components/Statistics/Statistics';
import { useState } from 'react';
import * as React from 'react';
import s from './Finance.module.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { TabContainer, Table, Tabs } from 'react-bootstrap';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Formik, setIn } from 'formik';

export const Finance = () => {
  const [spend, setSpend] = React.useState(0)
  const [valueSpend, setValueSpend] = useState()
  const [active, setActive] = useState(0)
  const [valueActive, setValueActive] = useState()
  const [analitics, setAnalitics] = useState(false)
  const [int, setInt] = useState(false)

  const [introdaction, setIntrodaction] = React.useState([])
  const [formData, setFormData] = React.useState({
    id: "",
    user: "",
    amount: "",
    article: "",
    time: "",
  })

  // GET
  React.useEffect(() => {
    const getData = async () => {
      const responce = await axios.get(
        'https://636b6c66ad62451f9fb11cc3.mockapi.io/introdaction'
      )
      console.log(responce.data);
      setIntrodaction(responce.data)
    }
    getData()
  }, [])

  // PUT POST
  const handleSubmit = async (formSubmittedData, {resetForm}) => {
    if (FormData.id) {
      const responce = await axios.put(
        `https://636b6c66ad62451f9fb11cc3.mockapi.io/introdaction/${formData.id}`,
        {...formSubmittedData}
      )
      let update = {...introdaction}
      let index = introdaction.findIndex((row) => row.id === formData.id) 
      update[index] = responce.data
      setIntrodaction(update)
      resetForm()
    } else {
      const responce = await axios.post(
        'https://636b6c66ad62451f9fb11cc3.mockapi.io/introdaction',
        {...formSubmittedData}
      )
      setIntrodaction([...introdaction, responce.data])
      resetForm()
    }
  }

  // Delete
  const handleDelete = async (id) => {
    let confrim = window.confirm(
        "Вы действительно хотите удалить историю внесений?"
    )
    if (confrim) {
        const responce = await axios.delete(
            `https://636b6c66ad62451f9fb11cc3.mockapi.io/introdaction/${id}`
        )
        const unDeleteData = introdaction.filter((row) => row.id !== id)
        setIntrodaction(unDeleteData) 
    }
  }

  


  // Сохранение суммы приход/расход
  let spendd = localStorage.getItem('spendd');
  let valuee = localStorage.getItem('valuee');
  const handleChangeSpend = () => {
    setSpend(prev => Number(prev) + Number(valueSpend))
    localStorage.setItem('spendd', Number(spendd)+Number(valueSpend));
  }
  function handleChangeActive  () {
    setActive(prev => Number(prev) + Number(valueActive))
    localStorage.setItem('valuee', Number(valuee)+Number(valueActive));
  }

  return (
    <div className='p-[1.5rem]'>
      <div>
          <div>
            <h1 className='my-[10px] font-bold text-xl uppercase'>Финансы</h1>
            <div>
              <button onClick={() => setAnalitics(true)}>Аналитика</button>
              <button onClick={() => setInt(true)}>Внесения</button>
            </div>
              <Box sx={{ maxWidth: "100%" }}>
                      <Statistics spend={spend} active={active}/>
                      <div className={s.finance_block}>
                      <Formik initialValues={formData} onSubmit={handleSubmit} enableReinitialize={true}>
                        {({
                          values,
                          handleSubmit,
                          isSubmitting,
                          resetForm,
                        }) => (
                          <div className={s.finance_input}>
                            <Box component={Paper} sx={{ maxWidth: 530, p: 2, borderRadius: 5, mt: 5  }}>
                              <h1 className='text-[15px] font-bold uppercase'>Внести Доход</h1>
                              <TextField
                              sx={{
                                "& > :not(style)": { mt: 1, width: 500},
                              }}
                              type="number"
                              label="Сумма"
                              id='amount'
                              onChange={e => setValueActive(e.target.value)}/>
                            <button onClick={handleChangeActive} className={s.button} type="submit" variant="contained">
                              Внести
                            </button>
                            </Box>
                            <Box component={Paper} sx={{ maxWidth: 530, p: 2, borderRadius: 5, mt: 5 }}>
                            <h1 className='text-[15px] font-bold uppercase'>Внести расход</h1>
                            <TextField
                              sx={{
                                "& > :not(style)": { mt: 1, width: 500},
                              }}
                              type="number"
                              label="Сумма"
                              onChange={e => setValueSpend(e.target.value)}/>
                            <button onClick={handleChangeSpend} className={s.button} type="submit" variant="contained">
                              Внести
                            </button>
                            </Box>
                          </div>
                        )}
                        </Formik>
                    </div>

                   
              </Box>
          </div>
      </div>
    </div>
  )
}