import  { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {

    const{ logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
        return <Link to='/'  />
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Project Management APP</h1>
                </Link>
                <nav>
                    {user &&(
                         <div>
                         <span>{user.email}</span>        
                          <button onClick={handleClick}>Log Out</button>
                         </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>    
                    )}
                    
                </nav>
            </div>
        </header>
    )
}

export default Navbar