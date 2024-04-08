import React,{useState,useContext} from 'react'
import { UserContext } from '../auth/UserContext'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { Link,useNavigate } from 'react-router-dom'

const Register = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confPassword,setConfPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [showError,setShowError] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false)
  const [,setToken] = useContext(UserContext)
  const navigate = useNavigate()

  const registerUser = async () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email,password:password})
    }
    const response = await fetch("/api/users",request)
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.detail)
    } else {
      // console.log(data.access_token)
      setToken(data.access_token)
      navigate("/links")
    }
  }

  const clearForm = () => {
    setEmail("")
    setPassword("")
    setConfPassword("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confPassword && password.length > 6) {
      registerUser()
      setSuccessMessage("User submission successful. Thank you!")
      setShowSuccess(true)
      setShowError(false)
      clearForm()
    } else {
      setErrorMessage("Make sure passwords match and is more than 6 characters")
      setShowError(true)
    }
  }

  return (
    // Contact Section
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>Register</h2>
          <p>You know you want to</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form action="forms/contact.php" 
                  method="post" 
                  className="php-email-form"
                  onSubmit={handleSubmit}
                  >
                <div className="col-md-6 form-group">
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
                    placeholder="Password must be at least 6 characters" 
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-6 form-group mt-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    name="conf_password" 
                    id="conf_password" 
                    placeholder="Confirm Password" 
                    required
                    value={confPassword}
                    onChange={(e)=>setConfPassword(e.target.value)}
                    />
                </div>   
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <ErrorMessage message={errorMessage} show={showError}/>
                  <SuccessMessage message={successMessage} show={showSuccess}/>
                </div>
                <div className="text-center"><button type="submit">Register</button></div>  
                <Link className='text-center' to="/login">Already have an account? Click here to login :)</Link>            
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Register