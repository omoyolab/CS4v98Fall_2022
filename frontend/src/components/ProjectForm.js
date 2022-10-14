import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useProjectContext } from "../hooks/useProjectContext"
import { useAuthContext } from "../hooks/useAuthContext"


const ProjectForm = () => {
    const {dispatch}  = useProjectContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()

 
    const [emptyFields, setEmptyFields] = useState([])

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [severity, setSeverity] = useState('')
    const [budget, setBudget] = useState('')
    const [owner, setOwner] = useState('')
    const [queue, setQueue] = useState('')
    const [queues, setQueues] = useState([])
    const [owners, setOwners] = useState([])
    const [errorProject, setErrorProject] = useState(null)
    const[successProject,  setSuccessProject] = useState(null)


    //Handle Dropdowns
  
     useEffect(() => {
        fetch('https://cs4v98.herokuapp.com/api/queues', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((data) => {
            setQueues(data)

            //set initial value
            if(data.length >0){
                setQueue(data[0]._id)
            }
          });


        fetch('https://cs4v98.herokuapp.com/api/clients', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((data) => {
            setOwners(data)

            //set initial value
            if(data.length >0){
                setOwner(data[0]._id)
            }
          });

      },[]);


      const handleQueueChange = (event) => {
        setQueue(event.target.value);
      } 

      const handleOwnerChange = (event) => {
        setOwner(event.target.value);
      } 

    //Handle create Project Form
    const handleProjectSubmit = async (e) =>{
        e.preventDefault()

        if(!user){
            setErrorProject('You much be logged in')
            return
        }
        const client = { owner, severity, title,details,budget, queue}

        const response = await fetch('https://cs4v98.herokuapp.com/api/projects', {
            method: 'POST',
            body: JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setErrorProject(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setTitle('')
            setDetails('')
            setSeverity('')
            setBudget('')
            setOwner('')
            setQueue('')
            setErrorProject(null)
            setEmptyFields([])
            
            dispatch({type:'CREATE_PROJECT', payload:json})
        }

        navigate('/')
        setSuccessProject('New Project Added Successfully')
    }

    return(
        <div>
        <div className="wrapper">
        <form className="create" onSubmit={handleProjectSubmit}>
        <h3 className="heads">Add a New Project</h3>

            <label>Project Title</label>
            <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('Title')? 'error': ''}
            />
            <label>Details</label>
            <textarea 
            type="text" 
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            className={emptyFields.includes('Details')? 'error': ''}
            />

            <label >Severity</label>
            <select
            onChange={(e) => setSeverity(e.target.value)}
            value={severity}
            className={emptyFields.includes('Severity')? 'error': ''}
            > 
            <option value=""> Choose Severity</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            </select>        

            <label>Budget</label>
            <input 
            type="number" 
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            className={emptyFields.includes('Budget')? 'error': ''}
            />


            <label>Client(Project Manager)</label>
            <select value={owner} onChange={handleOwnerChange}  className={emptyFields.includes('Owner')? 'error': ''}>
                {owners && Array.isArray(owners) && owners.map(owner => (
                    <option key={owner._id} value={owner._id}>{owner.firstName}  {owner.lastName} - {owner.company}</option>
                ))}
            </select>

            <label>Queue</label>
            <select value={queue} onChange={handleQueueChange}  className={emptyFields.includes('Queue')? 'error': ''}>
                {queues && Array.isArray(queues) && queues.map(queue => (
                    <option key={queue._id} value={queue._id}>{queue.queueName}</option>
                ))}
          </select>

            <button>Add Project</button>
            {errorProject && <div className="error">{errorProject}</div>}
            {successProject && <div className="success">{successProject}</div>}
        </form>
        </div>
        </div>
       
    )
}

export default ProjectForm