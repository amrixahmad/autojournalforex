import React, {useState,useEffect} from 'react'
import ErrorMessage from './ErrorMessage'

const AutoJournalForm = ({token,getAutoJournals,AutoJournalId,setAutoJournalId}) => {
    const [AutoJournalImage,setAutoJournalImage] = useState(null)
    const [isSelected,setIsSelected] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const [showError,setShowError] = useState(false)
    const [showSuccess,setShowSuccess] = useState(false)

    const handleUpdateAutoJournal = async () => {

    }

    const onInputChange = (e) => {
      setIsSelected(true)
      setAutoJournalImage(e.target.files[0])
      // console.log("file select",AutoJournalImage,isSelected)
    }

    const handleCreateAutoJournal = async (e) => {
      e.preventDefault()
      const formData = new FormData()

      formData.append("file",AutoJournalImage)   
      
      const request = {
        method: "POST",
        headers: {Authorization: "Bearer " + token},
        body: formData
      }
      const response = await fetch("/api/autojournal",request)
      if (!response.ok){
        setErrorMessage("Upload went wrong")
      } else {
        console.log("Form submit success")
      }
    }

    const toggleCancel = () => {

    } 

  return (
    /* // Create Autojournal Section */
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>AutoJournals</h2>
          <p>Upload your trade screenshot here :)</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form method="post" className="php-email-form" encType='multipart/form-data'>
                         
              <div className="col-md-6 form-group mt-3">
                <label>Choose your AutoJournal image</label>
                <input 
                  type="file"
                  name="AutoJournal-img"
                  onChange={(e)=>{setAutoJournalImage(e.target.files[0])}}
                  />
              </div>                      
              <div className="my-3">
                <div className="loading">Loading</div>
                <ErrorMessage message={errorMessage} show={showError}/>
                {/* <SuccessMessage message={successMessage} show={showSuccess}/> */}
              </div>              
              <div className="text-center">
              { AutoJournalId ? (<div className='d-flex align-items-center'>
                          <button type="submit" onClick={handleUpdateAutoJournal}>Update AutoJournal</button>
                          <button className='btn btn-danger' onClick={toggleCancel}>Cancel</button>
                          </div>) 
                : (<button type="submit" onClick={handleCreateAutoJournal}>Create AutoJournal</button>)}  
              </div>              
            </form>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AutoJournalForm