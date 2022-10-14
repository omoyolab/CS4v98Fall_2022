import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//Pages & Components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ProjectForm from './components/ProjectForm';
import EditProjectForm from './components/EditProjectForm';
import ClientForm from './components/ClientForm';
import Login from './pages/Login'
import Signup from './pages/Signup';



function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
       <Navbar />
        <div className="pages">
          <Routes>
            <Route  path="/" element= { user?<Home /> : <Navigate to="/login" />} />
            <Route  path="/create-projects" element= {<ProjectForm/>} />
            <Route  path="/create-clients" element= {<ClientForm/>} />
            <Route  path="/edit-project/:projectId" element= {<EditProjectForm/>} />
            <Route  path="/login" element= {!user?<Login />: <Navigate to="/" />} />
            <Route  path="/signup" element= {!user?<Signup/>: <Navigate to="/" />} />
          </Routes>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
