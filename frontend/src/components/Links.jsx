import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../auth/UserContext'
import { useNavigate } from 'react-router-dom'
import LinkForm from './LinkForm'

const Links = () => {
    const [token] = useContext(UserContext)    
    const navigate = useNavigate()    
    const [links,setLinks] = useState(null)
    const [linkID,setLinkID] = useState(null)

    const toggleUpdateLink = async (linkID) => {
      setLinkID(linkID)
    }

    const getLinks = async () => {
      const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }

      const response = await fetch("/api/links/all",request)
      
      if (!response.ok) {
        console.log("Something wrong with request")
      } else {
        const data = await response.json()
        console.log(data)
        setLinks(data)
      }
    }

    const handleDeleteLink = async (linkID) => {
      const request = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
      const response = await fetch(`/api/links/${linkID}`,request)
      if (!response.ok) {
        console.log("Something wrong with request")
      }
      getLinks()
    }
    
    useEffect(()=>{
      if (!token) {
        navigate("/login")
      }
      getLinks()
    },[token])

  return (
    <>
    <LinkForm token={token} getLinks={getLinks} linkID={linkID} setLinkID={setLinkID} />
    {/* // Display links section} */}
    <section id="links" className="d-flex align-items-center">
        <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
        
          <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-9 text-center">
              <h1>Your Links</h1>
              </div>
          </div>        
          { links ? (
            <div className="row icon-boxes">            
                { links.map((link)=>(
                <div key={link.id} className="col-md-6 col-lg-3 d-flex align-items-center mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                  <div className="icon-box">
                    <h4 className="title"><a href={"https://" + link.url}>{link.name}</a></h4>
                    <button className='btn btn-info' onClick={()=>toggleUpdateLink(link.id)}>Update Link</button>
                    <button className='btn btn-danger' onClick={()=>handleDeleteLink(link.id)}>Delete Link</button>
                  </div>
                </div>                
                ))}    
            </div>
          ) : <p>seems link you don't have any links</p>}
          

        </div>
    </section>    
    </>
  )
}

export default Links