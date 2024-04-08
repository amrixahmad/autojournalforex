import React,{useState,useEffect} from 'react'
import ErrorMessage from './ErrorMessage'

const LinkForm = ({token,getLinks,linkID,setLinkID}) => {
    const [url,setUrl] = useState("")
    const [name,setName] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [show,showError] = useState(false)

    const clearForm = () => {
        setUrl("")
        setName("")
    }

    const toggleCancel = () => {
      setLinkID(null)
      clearForm()
    }

    const getLink = async () => {
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        const response = await fetch(`/api/links/${linkID}`,request)
        const data = await response.json()

        if (!response.ok){
            console.log("Link does not exist or problem retrieving link")
        } else {
            setUrl(data.url)
            setName(data.name)
        }
    }

    useEffect(()=>{
        if (linkID) {getLink()}
    },[linkID,token])

    const handleUpdateLink = async (e) => {
      if (!url && !name) {
        setErrorMessage("url and name cannot be empty")
        showError(true)
      } else {
        e.preventDefault()
        
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                url: url,
                name: name
            })            
        }
        const response = await fetch(`/api/links/${linkID}`,request)
        if (!response.ok) {
            console.log("Something wrong with update request")
        } else {
            clearForm()
            getLinks()
            showError(false)
            setLinkID(null)
        }
      }
    }

    const handleCreateLink = async (e) => {
        if (!url && !name) {
          setErrorMessage("url and name cannot be empty")
          showError(true)
        } else {
          e.preventDefault()
          const request = {
              method: "POST",
              headers: {
                  "Content-Type":"application/json",
                  Authorization: "Bearer " + token
              },
              body: JSON.stringify({url:url,name:name})           
          }
          
          const response = await fetch("/api/links",request)
          if (!response.ok) {
              console.log("Something wrong with the request")
          } else {
              console.log("Successfully created lead!")
              clearForm()
              getLinks()
          }
        }
        
    }

  return (
    /* // Create Links Section */
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>Links</h2>
          <p>Create your links here :)</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form method="post" className="php-email-form">
                           
              <div className="col-md-6 form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  name="url" 
                  id="url" 
                  placeholder="Your link" 
                  required
                  value={url}
                  onChange={(e)=>setUrl(e.target.value)}
                  />
              </div>              
              <div className="col-md-6 form-group mt-3">
                <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  id="name" 
                  placeholder="Name of link" 
                  required
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
              </div>                         
              <div className="my-3">
                <div className="loading">Loading</div>
                <ErrorMessage message={errorMessage} show={show}/>
                {/* <SuccessMessage message={successMessage} show={showSuccess}/> */}
              </div>              
              <div className="text-center">
              { linkID ? (<div className='d-flex align-items-center'>
                          <button type="submit" onClick={handleUpdateLink}>Update Link</button>
                          <button className='btn btn-danger' onClick={toggleCancel}>Cancel</button>
                          </div>) 
                : (<button type="submit" onClick={handleCreateLink}>Create Link</button>)}  
              </div>              
            </form>

          </div>

        </div>

      </div>
    </section>
  )
}

export default LinkForm