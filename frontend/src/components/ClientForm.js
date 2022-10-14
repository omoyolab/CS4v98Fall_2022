import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const ClientForm = () => {

    const {user} = useAuthContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


  
    //Handle create Client Form
    const handleClientSubmit = async (e) =>{
        e.preventDefault()

        if(!user){
            setError('You much be logged in')
            return
        }

        const client = {firstName, lastName, company, email, phone}

        const response = await fetch('https://cs4v98.herokuapp.com/api/clients', {
            method: 'POST',
            body: JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setFirstName('')
            setLastName('')
            setCompany('')
            setPhone('')
            setEmail('')
            setError(null)
            setEmptyFields([])
            setSuccess('New Client Added Successfully')
        }
    }

 
    return(
        <div>
        <div className="wrapper">
        <form className="create" onSubmit={handleClientSubmit}>
            <h3 className="heads">Add a New Client</h3>
            <label>First Name</label>
            <input 
            type="text" 
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className={emptyFields.includes('FirstName')? 'error': ''}
            />

            <label>Last Name</label>
            <input 
            type="text" 
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className={emptyFields.includes('LastName')? 'error': ''}
            />

            <label>Company</label>
            <input 
            type="text" 
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className={emptyFields.includes('Company')? 'error': ''}
            />

            <label>Email</label>
            <input 
            type="text" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('Email')? 'error': ''}
            />

            <label>Phone</label>
            <input 
            type="text" 
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className={emptyFields.includes('Phone')? 'error': ''}
            />
            <button>Add Client</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form> 
        </div> 
        </div>
       
    )
}

export default ClientForm