import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch} = useAuthContext()


    const signup = async (firstName,lastName,email, password,phone, role) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://cs4v98.herokuapp.com/api/users/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName,lastName,email, password,phone, role})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //Update Auth Context
            dispatch({type: 'LOGIN', payload:json})
            setIsLoading(false)
        }
    }
    return{ signup, isLoading, error}
}