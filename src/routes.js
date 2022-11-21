import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.css'
import { Auth } from './pages/Auth/Auth'
import { Dashboard } from './pages/Dashbourd/Dashboard'
import { Main } from './subpages/Main/Main'

export const useRoutes = (isAuth) => {
    if(isAuth) {
        return <Dashboard />
    }
    return (
        <Routes>
            <Route path='/' element={
                isAuth 
                ? <Navigate replace to='/dashboard' /> 
                :   <section className={ styles.auth }>
                        <Auth />
                    </section>
            } />
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/dashboard/main' element={<Main/>}/>
        </Routes>
    )
}