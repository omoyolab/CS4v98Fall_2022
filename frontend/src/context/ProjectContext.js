import { createContext, useReducer } from "react"

export const ProjectContext = createContext()

export const projectReducer = (state, action) =>{

    switch(action.type){
        case 'SET_PROJECTS':
            return{
                projects: action.payload
            }
        case 'CREATE_PROJECT':
            return{
                projects:[action.payload, ...state.projects]
            }
        case 'UPDATE_PROJECT':
            const filteredProjects =  state.projects.filter((p)=> p._id !== action.payload._id)
            filteredProjects.push(action.payload)
            return{projects: filteredProjects}
        case 'DELETE_PROJECT':
            return{
                projects: state.projects.filter((p)=> p._id !== action.payload._id)
            }
    
        default:
            return state
    }

}

export const ProjectContextProvider = ( { children} ) => {
    const [state, dispatch] = useReducer(projectReducer, {
        projects: null
    })

  

    return(
        <ProjectContext.Provider value={{...state, dispatch}}>
            { children }
        </ProjectContext.Provider>
    )
}