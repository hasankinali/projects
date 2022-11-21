import styles from './Profile.module.css'
import { useAuth } from './../../hooks/auth.hook'
import { NavLink } from 'react-router-dom'

export const Profile = () => {
    // const { profile } = JSON.parse(localStorage.getItem('userProfile'))
    // console.log(profile)

    const profile = {
        email: 'aksss.7@gmail.com',
        fullname: 'Akbar Kudaibergenov',
        gender: 'MALE',
        phoneNumber: '0990777820',
        username: 'akbar',
    }

    const links = [
        // { title: 'Создать пользователя', link: 'profile/createUser', icon: 'create' },
        // { title: 'Изменить пароль', link: 'profile/changePassword', icon: 'vpn_key' },
    ]

    return (
        <div className={ styles.main }>
            <div className={ styles.profile }>
                <div className={ styles.card }>
                    <div className={ styles.avatar }>

                    </div>
                    <ul>
                        <li className={ styles.item }>
                            { profile.fullname }
                        </li>
                        <li className={ styles.item }>
                            <span className={ `material-icons ${ styles.icon }` }>email</span>
                            { profile.email }
                        </li>
                        <li className={ styles.item }>
                            <span className={ `material-icons ${ styles.icon }`}>phone</span>
                            { profile.phoneNumber }
                        </li>
                    </ul>
                </div>
                <div className={ styles.buttons }>
                    {
                        links.map(({ title, link, icon }, i) => {
                            return (
                                <NavLink key={i} className={ styles.button } to={`/dashboard/${ link }`}>
                                    <span className={ `material-icons ${styles.icon}` }>{icon}</span>
                                    {title}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
