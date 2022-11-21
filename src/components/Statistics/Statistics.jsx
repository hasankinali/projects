import { Main } from '../../subpages/Main/Main';
import s from './Statistics.module.css'


export const Statistics = ({spend, active}) => {
    let spendd = localStorage.getItem('spendd');
    let valuee = localStorage.getItem('valuee');
    return (
        <div>
            <div className={s.profit_block}>
                <div className={s.rashod}>
                    <h1 className='text-[27px]'>РАСХОД</h1>
                    
                    <h2 className='text-[27px] m-0 font-semibold'>{spendd} $</h2>
                </div>
                <div className={s.prihod}>
                    <h1 className='text-[27px]'>ПРИХОД</h1>
                    
                    <h2 className='text-[27px] m-0 font-semibold'>{valuee} $</h2>
                </div>
                <div className={s.profit}>
                    <h1 className='text-[27px]'>ПРОФИТ</h1>
                    
                    <h2 className='text-[27px] m-0 font-semibold'>{valuee - spendd} $</h2>
                </div>
            </div>
            <div className={s.kassa}>
                <h1 className='mb-10 text-xl font-bold'>КАССА</h1>
                <div className={s.st}>
                    <div className='flex items-center'>
                        <h1 className='text-[35px] mr-2 bg-[#14cb17] px-[15px] rounded-[5px] text-white'>$</h1>
                        <div>
                            <p>ДОЛЛАРЫ</p>
                            <p className='text-2xl font-semibold'>{valuee - spendd} $</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}