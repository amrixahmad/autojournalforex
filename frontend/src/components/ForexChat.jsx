import React, { useState } from 'react';

const ForexChat = () => {
  const [messages, setMessages] = useState([]);
  const [forexChatText, setForexChatText] = useState('');
  const [forexChatImage,setforexChatImage] = useState(null)
  const [isSelected,setIsSelected] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [showError,setShowError] = useState(false)
  const [showSuccess,setShowSuccess] = useState(false)

  const onInputChange = (e) => {
    setIsSelected(true)
    // setAutoJournalImage(e.target.files[0])
    // console.log("file select",AutoJournalImage,isSelected)
  }

  const handleSend = () => {
    if (forexChatText) {
      setMessages([...messages, { id: messages.length, text: forexChatText }]);
      setForexChatText('');
    }
  };

  const handleforexChatTextChange = (event) => {
    setForexChatText(event.target.value);
  };

  const handleSubmitPrompt = async (e) => {
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

  return (
    // Contact Section
    <section id="contact" className="contact mt-5">
      <div className="container">

        <div className="section-title">
          <h2>Forex Coach</h2>
          <p>Chat with your expert forex coach.</p>
        </div>        

        <div className="row mt-5 d-flex justify-content-center">

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ForexChat;
