import { useCallback, useEffect } from "react"
import { useState } from "react"

export const useAuth = () => {
    const [status, setStatus] = useState(null)
    const [profile, setProfile] = useState({
        object: ''
    })
    const [code, setCode] = useState('')

    const login = useCallback((status, profile) => {
        const code = JSON.parse(localStorage.getItem('userCode'))

        setCode(code)
        setProfile(profile)
        setStatus(status)

        localStorage.setItem('userProfile', JSON.stringify({ profile: profile }))
        localStorage.setItem('userStatus', JSON.stringify({ status: status }))
    }, [])

    const logout = useCallback(() => {
        setProfile({})
        setStatus(null)

        localStorage.removeItem('userProfile')
        localStorage.removeItem('userStatus')
        localStorage.removeItem('userCode')
    }, [])

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('userProfile'))
        const status = JSON.parse(localStorage.getItem('userStatus'))

        if(status) {
            login(status.status, profile.data)
        }
    }, [])

    return { login, logout, status, profile, code }
}