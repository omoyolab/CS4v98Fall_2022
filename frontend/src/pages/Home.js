import { useEffect} from "react"
import { useProjectContext } from "../hooks/useProjectContext"
import { useAuthContext } from "../hooks/useAuthContext"


//Components
import ProjectList from '../components/ProjectList'
import OperationsBtn from "../components/OperationsBtn"




const Home = () => {
    const {projects, dispatch} = useProjectContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('https://cs4v98.herokuapp.com/api/projects',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PROJECTS', payload:json}, )
            }
        }

        if(user && projects === null){
            fetchProjects()    
        }
        
        
    }, [dispatch, user])

    return (
        <div className="home">
           <div className="projects">
            <ProjectList />
           </div>
           <div className="operations">
           <OperationsBtn/>
           </div>
        </div>
    )
}



export default Home