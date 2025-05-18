import React from 'react'
import './HomePage.css'
import Header from '../../Componentes/Header/Header'
import { Link } from 'react-router-dom'


const HomePage = () => {

  return (
    <div>
      <Header/>
      {/* Contenido de la página */}
      <h1>Bienvenido al HomePage</h1>
      <section className="resumen">
          <div className="card">Proyectos</div>
          <div className="card">Reportes</div>
          <div className="card">Gestión de usuarios</div>
        </section>

        <section className="notificaciones">
          <h2>Notificaciones</h2>
          <ul>
            <li>✅ Avance nuevo cargado</li>
            <li>📥 Documento agregado</li>
          </ul>
        </section>
    </div>
  )
}

export default HomePage