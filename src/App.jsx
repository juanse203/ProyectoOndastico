import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Protegida from './Contexto/ConCondon'

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
      <Routes>
        {/* Login, el home y el perfil... obvio */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Protegida><HomePage /></Protegida>} />
        <Route path='/Perfil' element={<Protegida><PerfilPage /></Protegida>}/>

        {/* Gestion de usuarios */}
        <Route path='/Usuarios' element={<Protegida><Gusuarios /></Protegida>}/>
        <Route path='/añadirUs' element={<Protegida><AddUsuario /></Protegida>}/>
        <Route path='/deletesUsers' element={<Protegida><DeleteUser/></Protegida>}/>

        {/* Gestion de proyectos */}
        <Route path='/Proyectos' element={<Protegida><Gproyectos /></Protegida>}/>
        <Route path='/añadirProjects' element={<Protegida><Addprojecto/></Protegida>}/>
        <Route path='/proyecto/:id' element={<Protegida><DetallesProject/></Protegida>}/>
        <Route path='/AvancesProject' element={<Protegida><AvancesProject/></Protegida>}/>
        <Route path='/Reportes' element={<Protegida><Reportes /></Protegida>}/>

        {/* Pos la pagina de error, que mas va a ser XD */}
        <Route path='/*' element={<Protegida><ErrorPage/></Protegida>}/>
      </Routes>
    </div>
  )
}

export default App