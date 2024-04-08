import React,{createContext,useEffect,useState} from 'react'

export const UserContext = createContext()

const UserProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem("linkToken"))

    useEffect(() => {
        const fetchUser = async () => {
            const request = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const response = await fetch("/api/users/me",request)
            if (!response.ok) {
                setToken(null)
            }
            localStorage.setItem("linkToken",token)
        }
        fetchUser()
    },[token])
    
  return (
    <UserContext.Provider value={[token,setToken]}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider