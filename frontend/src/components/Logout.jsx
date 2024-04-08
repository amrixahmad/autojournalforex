import React, {useContext} from 'react'
import { UserContext } from '../auth/UserContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const [,setToken] = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("linkToken")
        setToken(null)
        navigate("/login")
    }
  return (
    <a role='button' className='nav-link scrollto' onClick={handleLogout}>Logout</a>
  )
}

export default Logout