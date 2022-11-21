import { Route, Routes } from 'react-router-dom'
import { CandidatesPage } from '../../subpages/candidates/CandidatesPage'
import Student from '../../subpages/Student/Student'

import { Profile } from '../../subpages/Profile/Profile'
import styles from './Scene.module.css'
import { Main } from '../../subpages/Main/Main'
import { Market } from '../../subpages/Market/Market'
import { Finance } from '../../subpages/Finance/Finance'
import { Warehouse } from '@mui/icons-material'
import { Warehous } from '../../subpages/Warehouse/Warehouse'
import { ContrAgents } from '../../subpages/Contragents/Contragents'
import { GetItems } from '../../subpages/GetItems/GetItems'
import { Remain } from '../../subpages/Remains/Remain'

export const Scene = () => {
    return (
        <section className={ styles.scene }>
            <Routes>
                <Route path='/' element={
                    <section>
                        <Main/>
                    </section>
                }/>
                <Route path='/dashboard/profile' element={
                    <Profile />
                } />
                <Route path='/dashboard/candidates' element={
                    <section>
                        <CandidatesPage/>
                    </section>
                } />
                <Route path='/dashboard/client' element={
                    <section>
                        <Student />
                    </section>
                } />
                <Route path='/dashboard/main' element={
                    <section>
                        <Main/>
                    </section>
                }/>
                <Route path='/dashboard/market' element={
                    <section>
                        <Market/>
                    </section>
                }/>
                <Route path='/dashboard/finance' element={
                    <section>
                        <Finance/>
                    </section>
                }/>
                <Route path='/dashboard/warehous' element={
                    <section>
                        <Warehous/>
                    </section>
                }/>
                <Route path='/dashboard/contr-agents' element={
                    <section>
                        <ContrAgents/>
                    </section>
                }/>
                <Route path='/dashboard/get-items' element={
                    <section>
                        <GetItems/>
                    </section>
                }/>
                <Route path='/dashboard/remain-products' element={
                    <section>
                        <Remain/>
                    </section>
                }/>
            </Routes>
        </section>
    )
}