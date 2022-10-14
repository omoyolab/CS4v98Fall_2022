import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProjectContextProvider } from './context/ProjectContext'
import { AuthContextProvider } from './context/AuthContext'
import { QueueContextProvider } from './context/QueueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueueContextProvider>
      <ProjectContextProvider>
          <App />
      </ProjectContextProvider> 
      </QueueContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


