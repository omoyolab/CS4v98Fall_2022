import  { Link } from 'react-router-dom'


const OperationsBtn = () => {


    return(
       
            <div className="Operations">
                <h3 className='heads'>Operations Panel</h3>
                <Link to="/create-projects"><button className="Operations-btn">Create Project</button></Link>
                <Link to="/create-clients"><button className="Operations-btn">Create Clients</button></Link>
            </div>
      
    )
}

export default OperationsBtn