import React,{useContext} from 'react'
import { UserContext } from '../auth/UserContext'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Header = () => {
  const [token] = useContext(UserContext)
  return (
    // ======= Header =======
    <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">

        <h1 className="logo"><a href="/">Autojournal Forex</a></h1>
        {/* Uncomment below if you prefer to use an image logo */}
        {/* <a href="index.html" className="logo"><img src="assets/img/logo.png" alt="" className="img-fluid"></a> */}

        <nav id="navbar" className="navbar">
            <ul>  
              <li><Link className='nav-link scrollto' to="/profile">Profile</Link></li> 
              <li><Link className='nav-link scrollto' to="/links">Links</Link></li>       
              <li><Link className='nav-link scrollto' to="/autojournal">Journal</Link></li>       
              <li><Link className='nav-link scrollto' to="/contact">Contact</Link></li>            
              <li>{ token ? <Logout /> : <Link className='nav-link scrollto' to="/login">Login</Link> }</li>             
              <li><Link className='getstarted scrollto' to="/register">Get Started</Link></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
        </nav> 

        </div>
    </header>
  )
}

export default Header