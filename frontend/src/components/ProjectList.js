import { useProjectContext } from "../hooks/useProjectContext"
import { useAuthContext } from "../hooks/useAuthContext"
import  { Link } from 'react-router-dom'

const ProjectList = () => {
    const {projects, dispatch} = useProjectContext()
    const {user} = useAuthContext()

    const handleClick = async (project) =>{
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
            <div class="project-list-table-title"> Project List</div>
              <ul class="project-list-table">
                <li class="table-header">
                <div class="col col-1">Case Number</div>
                <div class="col col-2">Project Title</div>
                <div class="col col-3">Project Summary</div>
                <div class="col col-4">Severity</div>
                <div class="col col-5">Budget</div>
                <div class="col col-7">Company</div>
                <div class="col col-7">Status</div>
                </li>
                {projects && projects.map((project) => (
                    <li class="table-row">
                        <div class="col col-1" data-label="Case Number">{project.caseNumber}
                        <Link  to={`/edit-project/${project._id}`}><h5>Edit</h5></Link>
                        <span  className="material-symbols-outlined inner-element action-button" onClick={() => handleClick(project)}>delete</span>
                        </div>
                        <div class="col col-2 project_title" data-label="Project Title">{project.title}</div>
                        <div class="col col-3" data-label="Project Details">{project.details}</div>
                        <div class="col col-4" data-label="Severity">{project.severity}</div>
                        <div class="col col-5" data-label="Budget">${project.budget}</div>
                        <div class="col col-7" data-label="Company">{project.owner.company}</div>
                        <div class="col col-7" data-label="Company">{project.status}</div>
                  </li>
                ))}
                </ul> 

        </div>
    )
}

export default ProjectList