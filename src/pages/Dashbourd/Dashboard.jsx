import styles from './Dashboard.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Topline } from '../../components/Topline/Topline'
import { Scene } from '../../components/Scene/Scene'

export const Dashboard = () => {
    const [active, setActive] = useState(false)

    const links = [
        { title: 'Дашборд', link: 'main', icon: 'bar_chart' },
        { title: 'Магазин', link: 'market', icon: 'shopping_cart' },
        { title: 'Финансы', link: 'finance', icon: 'attach_money' },
        { title: 'Приход товара', link: 'get-items', icon: 'add_shopping_cart' },
        { title: 'Остатка товара', link: 'remain-products', icon: 'production_quantity_limits' },
        { title: 'Клиенты', link: 'client', icon: 'people_alt' },
        // { title: 'Кандидаты', link: 'candidates', icon: 'recent_actors' },
    ]

    const items = links.map(({ title, link, icon }, i) => {
        return (
            <li key={ i } className={ styles.item }>
                <NavLink className={ styles.link } to={ `/dashboard/${ link }` }>
                    <span className={ `material-icons ${ styles.icon }` }>{ icon }</span>
                    <span className={ styles.text }>{ title }</span>
                </NavLink>
            </li>
        )
    })

    return (
        <div className={ styles.dashboard }>
            <nav className={ `${ styles.navbar } ${ active ? styles.open : '' }` }>
                <div className={ styles.flexBlock }>
                    <div className={ `${ styles.title } ${ active ? styles.open : '' }` }>
                        <a href="/" className={ `${ styles.logo } ${ active ? styles.open : '' }` }>
                            <h1>APPLE CRM</h1>
                        </a>
                        <button className={ styles.ham } onClick={ () => setActive(!active) }>
                            <span className={ `${ styles.line } ${ active ? styles.open : '' }` }></span>
                            <span className={ `${ styles.line } ${ active ? styles.open : '' }` }></span>
                            <span className={ `${ styles.line } ${ active ? styles.open : '' }` }></span>
                        </button>
                    </div>
                    <ul className={ `${ styles.menu } ${ active ? styles.open : '' }` }>
                        { items }
                    </ul>
                </div>
            </nav>
            <div className={ styles.main }>
                <Topline />
                <Scene />
            </div>
        </div>
    )
}