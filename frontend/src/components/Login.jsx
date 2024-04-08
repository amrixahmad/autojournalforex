import React,{useState,useContext} from 'react'
import { UserContext } from '../auth/UserContext'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { useNavigate,Link } from 'react-router-dom'

const Login = () => {
  const [,setToken] = useContext(UserContext)
  const [email,setEmail] = useState("")  
  const [password,setPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [showError,setShowError] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const clearForm = () => {
    setEmail("")
    setPassword("")
  }

  const submitLogin = async () => {
    const request = {
      method: "POST",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`)
    }
    const response = await fetch("/api/token",request)
    const data = await response.json()

    if(!response.ok) {
      setErrorMessage(data.detail)
      setShowError(true)
    } else {
      setToken(data.access_token)
      setSuccessMessage("Login successful!")
      setShowError(false)
      setShowSuccess(true)
      clearForm()
      navigate("/links")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()    
    submitLogin()
  }

  return (
    // Login Section
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>Login</h2>
          <p>Welcome back</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form method="post" className="php-email-form" onSubmit={handleSubmit}>
                           
              <div className="col-md-6 form-group text-center">
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  id="email" 
                  placeholder="Your Email" 
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>              
              <div className="col-md-6 form-group mt-3">
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  id="password" 
                  placeholder="Your Password" 
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
              </div>                         
              <div className="my-3">
                <div className="loading">Loading</div>
                <ErrorMessage message={errorMessage} show={showError}/>
                <SuccessMessage message={successMessage} show={showSuccess}/>
              </div>
              <div className="text-center"><button type="submit">Login</button></div>
              <Link className='text-center' to="/register">Don't have an account? Click here to register :)</Link>
            </form>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Login