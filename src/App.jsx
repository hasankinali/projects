import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'
import { AuthContext } from './context/Auth.context'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'
import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Student from './subpages/Student/Student'

export const App = () => {
    const { login, logout, status } = useAuth()
    const isAuth = !!status
    const routes = useRoutes(isAuth)

    return (
        <AuthContext.Provider value={{ login, logout, status,isAuth }}>
            <BrowserRouter>
                <section className={styles.app}>
                    { isAuth }
                    { routes }
                </section>
                <Routes>
                    <Route exact path="/student" element={<Student />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}