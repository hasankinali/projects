import styles from './Topline.module.css'
import overlay from './../../App.module.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth.context'
import { NavLink, useNavigate } from 'react-router-dom'

export const Topline = () => {
    const [active, setActive] = useState(false)
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    const escHandler = (event) => {
        if (event.keyCode === 27) {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escHandler, false)
        return () => {
            document.removeEventListener('keydown', escHandler, false)
        }
    }, [])

    return (
        <section className={ styles.topline }>
            <div className={ styles.item }>
                {/* <button className={ styles.link } onClick={ () => setActive(true) }>
                    <span className={ `material-icons ${ styles.icon }` }>
                        exit_to_app
                    </span>
                </button> */}
            </div>
            <div className={ `${ overlay.overlay } ${ active ? styles.active : '' }` } onClick={ () => setActive(false) }></div>
            <div className={ `${ styles.message } ${ active ? styles.active : '' }` }>
                <p className={ styles.text }>Вы уверены, что хотите выйти</p>
                <button className={ styles.submit } onClick={ logoutHandler }>Да</button>
                <button className={ styles.submit } onClick={ () => setActive(false)}>Нет</button>
            </div>
        </section>
    )
}