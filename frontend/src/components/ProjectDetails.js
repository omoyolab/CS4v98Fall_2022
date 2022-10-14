import { useProjectContext } from "../hooks/useProjectContext"
import  { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectDetails = ({project}) => {
    const {dispatch} = useProjectContext()
    const {user} = useAuthContext()

    const handleClick = async () =>{
        if(!user){
            return
        }

        const response = await fetch('https://cs4v98.herokuapp.com/api/projects/' + project._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_PROJECT', payload: project})
        }
    }

    return (
        
        <div> 
            <div className="project-details">
                <h4>{project.title} [{project.caseNumber} ]</h4>
                 <p><strong>Project Details:</strong> <br></br>{project.details}</p>
                {/* <p><strong>Assigned To:</strong> {project.assignedTo}</p>  */}
                <p><strong>Project Manager:</strong> {project.owner.firstName}  {project.owner.lastName}</p>
                <p><strong>Company:</strong> {project.owner.company}</p>
                <p><strong>Contact:</strong> {project.owner.email}</p>
                <h6>Project Metrics</h6>
                <hr></hr>
                <p><strong>Budget:</strong> ${project.budget}.00</p>
                <p><strong>Severity:</strong> {project.severity}</p>
                <p><strong>Queue:</strong> {project.queue.queueName}</p>
                <p><strong>Case Number:</strong> {project.caseNumber}</p>
                <p><strong>Status:</strong> {project.status}</p> 
            
                <p><strong>Timeline: </strong>{formatDistanceToNow(new Date(project.createdAt),{addSuffix: true})}</p>
                <span  className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    <div className="actions">
                    <Link to={`/edit-project/${project._id}`}><h5>Edit</h5></Link>
                    <Link to="/"><h5>Resolve</h5></Link>
                    <Link to="/"><h5>Assign</h5></Link>
                    <Link to="/"><h5>Transfer</h5></Link>
                    </div>
                
            </div>
        </div>
      
        
    )
}

export default ProjectDetails