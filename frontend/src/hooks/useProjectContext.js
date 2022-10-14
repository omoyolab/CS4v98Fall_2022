import { ProjectContext } from "../context/ProjectContext"
import { useContext } from "react"

export const useProjectContext = () =>{
    const context = useContext(ProjectContext)

    if(!context){
        throw Error('UseProjectContext must be used inside the ProjectContextProvider')
    }

    return context
}