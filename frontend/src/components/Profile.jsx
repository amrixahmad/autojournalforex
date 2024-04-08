import React,{ useState,useEffect,useContext } from 'react'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { UserContext } from '../auth/UserContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [token] = useContext(UserContext)
    const navigate = useNavigate()
    const [username,setUsername] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const [showError,setShowError] = useState(false)
    const [showSuccess,setShowSuccess] = useState(false)

    const getUsername = async () => {
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }            
        }
        const response = await fetch("/api/users/me",request)
        const data = await response.json()

        if (!response.ok) {
            setErrorMessage("something wrong with request")
        } else {
            setUsername(data.username)
        }
    }

    const updateUsername = async (e) => {
        e.preventDefault()
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({username:username})
        }
        const response = await fetch("/api/users",request)
        if (!response.ok) {
            console.log("something wrong with response request")
            setErrorMessage("something wrong with response request")
            setShowError(true)
        } else {
            getUsername()
            setShowError(false)
            setShowSuccess(true)
            setSuccessMessage("Update successful!")
        }
    }   

    useEffect(()=>{
        if (!token) {
            navigate("/login")
        }
        getUsername()
    },[token])
  return (
    /* // Profile Section */
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>Profile</h2>
          <p>Edit your profile here</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form method="post" className="php-email-form" encType='multipart/form-data'>
                                 
              <div className="col-md-6 form-group mt-3">
                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  id="name" 
                  placeholder="Name of link" 
                  required
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  />
              </div>                         
              <div className="my-3">
                <div className="loading">Loading</div>
                <ErrorMessage message={errorMessage} show={showError}/>
                <SuccessMessage message={successMessage} show={showSuccess}/>
              </div>              
              <div className="text-center">
              <button type="submit" onClick={updateUsername}>Update Username</button>  
              </div>              
            </form>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Profile