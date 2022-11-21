import { useContext, useState } from 'react'
import styles from './Auth.module.css'
import { AuthContext } from '../../context/Auth.context'
import { useHttp } from '../../hooks/http.hook'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const { loading, request, API_URL } = useHttp()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = (event) => {
        event.preventDefault()
        const cyrillicPattern = /^[\u0400-\u04FF]+$/

        if(form.username === '' || form.password === '') {
            alert('Поля не должны быть пустыми')
        } else if (cyrillicPattern.test(form.username) || cyrillicPattern.test(form.password)) {
            alert('Нельзя вводить русские символы')
        } else {
            let code = window.btoa(form.username + ':' + form.password)
            localStorage.setItem('usercode', JSON.stringify({ code }))

            request(`${API_URL}api/myUser`, 'GET', null, {
                Authorization: `Basic ${ code }`
            }).then((result) => {
                auth.login(result.successful, result.object)
            })
        }
    }

    return (
        <div className={styles.block}>
            <h2 className={styles.heading}>Вход</h2>
            <form className={styles.form}>
                <div className={styles.inputBlock}>
                    <input 
                        type="text" 
                        className={styles.input}
                        name='username'
                        placeholder='Логин'
                        onChange={ changeHandler } />
                    <label htmlFor="username" className={ styles.label }>Логин</label>
                </div>
                <div className={styles.inputBlock}>
                    <input 
                        type="password"
                        className={styles.input}
                        name="password"
                        placeholder='Пароль'
                        onChange={ changeHandler } />
                    <label htmlFor="password" className={ styles.label }>Пароль</label>
                </div>
                <div className={styles.buttons}>
                    <button onClick={ loginHandler } className={ styles.submit }>Войти</button>
                </div>
            </form>
        </div>
    )
}