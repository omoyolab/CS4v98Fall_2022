import { useSignup } from "../hooks/useSignup"
import{ useState } from 'react'

const Signup = () => {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[phone, setPhone] = useState('')
    const[role, setRole] = useState('')
    const { signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
            e.preventDefault()

            await signup(firstName,lastName,email, password,phone, role)
    }



    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>First Name</label>
            <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
             />

            <label>Last Name</label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
             />

            <label>Email</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
             />

            <label>Password</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
             />

            <label>Phone</label>
            <input 
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
             />

            <label>Role</label>
            <input 
                type="text"
                onChange={(e) => setRole(e.target.value)}
                value={role}
             />

             <button disabled={isLoading}>Sign Up</button>
             {error && <div className="error">{error}</div>}
        </form>
    )



}

export default Signup