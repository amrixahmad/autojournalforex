import React, {useContext,useState,useEffect} from 'react'
import AutoJournalForm from './AutoJournalForm'
import { UserContext } from '../auth/UserContext'
import { useNavigate } from 'react-router-dom'

const AutoJournals = () => {
    const [AutoJournals,setAutoJournals] = useState(null)
    const [token] = useContext(UserContext)
    const [autoJournalId,setAutoJournalId] = useState(null)
    const [errorMessage,setErrorMessage] = useState("")
    const [showError,setShowError] = useState(false)
    const [successMessage,setSuccessMessage] = useState("")
    const [showSuccess,setShowSuccess] = useState(false)
    const navigate = useNavigate()

    const toggleUpdateAutoJournal = async () => {

    }

    const handleDeleteAutoJournal = async () => {

    }

    const getAutoJournals = async () => {
      const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
      const response = await fetch("/api/autojournal/all",request)
      if (!response.ok) {
        setErrorMessage("Could not retrieve Journal entries")
      } else {
        const data = await response.json()
        console.log(data)
        setAutoJournals(data)
      }
    }

    useEffect(()=>{
      if (!token) {
        navigate("/login")
      }
      getAutoJournals()
    },[token])

  return (
    <>
    <AutoJournalForm token={token} getAutoJournals={getAutoJournals} autoJournalId={autoJournalId} setAutoJournalId={setAutoJournalId} />
    {/* // Display links section} */}
    <section id="AutoJournals" className="d-flex align-items-center">
        <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
        
          <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-9 text-center">
              <h1>Your Journal Entries</h1>
              </div>
          </div>        
          { AutoJournals ? (
            <div className="row icon-boxes">            
                { AutoJournals.map((autoJournal)=>(
                  <div key={autoJournal.id} className="col-md-6 col-lg-3 d-flex align-items-center mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                    <div className="icon-box">
                      <img src={autoJournal.image}></img>
                      <p>Date Created: {autoJournal.date_created}</p>
                      <button className='btn btn-info' onClick={()=>toggleUpdateAutoJournal(autoJournal.id)}>Update Link</button>
                      <button className='btn btn-danger' onClick={()=>handleDeleteAutoJournal(autoJournal.id)}>Delete Link</button>
                    </div>
                  </div>                
                ))}    
            </div>
          ) : <p>seems like you don't have any journal entries</p>}
          

        </div>
    </section>    
    </>
  )
}

export default AutoJournals