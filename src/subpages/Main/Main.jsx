import { Statistics } from '../../components/Statistics/Statistics'
import s from './Main.module.css'
import React from 'react';
import axios from 'axios';

export const Main = () => {
    const [studentData, setStudentData] = React.useState([]);
    const [itemsData, setitemsData] = React.useState([])
    const [saleData, setSaleData] = React.useState([])
  
    let clientLenth = studentData.length
    let itemsLenth = itemsData.length
    let saleLenth = saleData.length

  
    // GET
    React.useEffect(() => {
      const getData = async () => {
        const response = await axios.get(
          "https://62f27b4218493ca21f34beae.mockapi.io/student"
        );
        console.log(response.data);
        setStudentData(response.data);
      };
      getData();
    }, []);

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636b6c66ad62451f9fb11cc3.mockapi.io/items'
            )
            setitemsData(responce.data)
        }
        getData()
    }, [])

    React.useEffect(() => {
        const getData = async () => {
            const responce = await axios.get(
                'https://636e96f7bb9cf402c805aa92.mockapi.io/sale'
            )
            setSaleData(responce.data)
        }
        getData()
    }, [])




    let spendd = localStorage.getItem('spendd');
    let valuee = localStorage.getItem('valuee');

    return (
        <div className={s.main_block}>
            <Statistics/>
            <div className={s.kassa}>
                <h1 className='mb-10 text-xl font-bold'>СТАТИСТИКА</h1>
                <div className={s.statistics}>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#9155fd] p-[13px] rounded-[5px] text-white'>trending_up</h1>
                        <div>
                            <p>ПРОДАЖИ</p>
                            <p className='text-2xl font-semibold'>{saleLenth}</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#14cb17] p-[13px] rounded-[5px] text-white'>person</h1>
                        <div>
                            <p>НОВЫЕ КЛИЕНТЫ</p>
                            <p className='text-2xl font-semibold'>{clientLenth}</p>
                        </div>
                    </div>
                    <div className='flex items-center mb-[20px]'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#ffb400] p-[13px] rounded-[5px] text-white'>label</h1>
                        <div>
                            <p>ПРИНЯТО ТОВАРА</p>
                            <p className='text-2xl font-semibold'>{itemsLenth}</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <h1 className='material-icons text-[35px] font-bold mr-2 bg-[#16b1ff] p-[13px] rounded-[5px] text-white'>label</h1>
                        <div>
                            <p>ВЫРУЧКА</p>
                            <p className='text-2xl font-semibold'>{valuee - spendd} $</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}