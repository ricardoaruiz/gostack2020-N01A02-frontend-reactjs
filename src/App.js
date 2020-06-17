import React, { useEffect, useState } from 'react'
import Header from './components/Header'

import './App.css';
import backgroundImage from './assets/background.jpeg'
import api from './services/api';

const App = () => {

  const [ projects, setProjects ] = useState([])

  useEffect(() => {
    api.get('/projects')
    .then(result => {
      setProjects(result.data)
    })
    .catch(error => {
      console.error(error)
      alert('Erro ao cadatrar um novo projeto');
    })
  }, [])

  const handleAddProject = async () => {

    try {
      const response = await api.post('/projects', {
        title: `Projeto ${Date.now()}`,
        owner: 'Ricardo'
      });

      setProjects([ ...projects, response.data ])

    } catch(error) {
      console.error(e);
      alert('Erro ao cadatrar um novo projeto');
    }
  }

  return (
    <div class="App">
      <Header title="Titulo1" />

      <img src={backgroundImage} width={300}/>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </div>
  )
}

export default App
