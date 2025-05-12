import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import PerfilPage from './Pages/PerfilPage/PerfilPage'

import Gusuarios from './Pages/GUsuarios/ListUSuarios/ListUsuarios'
import AddUsuario from './Pages/GUsuarios/RegistroUsuario/RegistroUsuario'
import DeleteUser from './Pages/GUsuarios/DeleteUsuario/DeleteUsuario'

import Gproyectos from './Pages/GProyectos/ListProyectos/ListProyectos'
import Addprojecto from './Pages/GProyectos/AddProyecto/AddProyecto'
import DetallesProject from './Pages/GProyectos/DetailsProyecto/DetailsProyecto'
import AvancesProject from './Pages/RegAvances/RegAvances'

import Reportes from './Pages/ReportesPage/Reportes'
import ErrorPage from './Pages/ErrorPage/ErrorPage'


const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* Login, el home y el perfil... obvio */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path='/Perfil' element={<PerfilPage />}/>

        {/* Gestion de usuarios */}
        <Route path='/Usuarios' element={<Gusuarios />}/>
        <Route path='/añadirUs' element={<AddUsuario />}/>
        <Route path='/deletesUsers' element={<DeleteUser/>}/>

        {/* Gestion de proyectos */}
        <Route path='/Proyectos' element={<Gproyectos />}/>
        <Route path='/añadirProjects' element={<Addprojecto/>}/>
        <Route path='/DetallesProject' element={<DetallesProject/>}/>
        <Route path='/AvancesProject' element={<AvancesProject/>}/>
        <Route path='/Reportes' element={<Reportes />}/>

        {/* Pos la pagina de error, que mas va a ser */}
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App