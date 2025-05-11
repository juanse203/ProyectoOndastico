import React from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'

import logo from '../../assets/logOndas.png'
import librito from '../../assets/Librito-mision.jpg'

const LoginPage = () => {
  return (
    <div className="login-container">
      <img className='logOndas' src={logo} alt="logo" />
      {/* Contenido principal dividido en dos columnas */}
      <div className="login-main">
        {/* Columna izquierda con imagen */}
        <div className="login-image">
          <img
            src={librito}
            alt="Misión Ondas"
            className="login-img"
          />
        </div>

        {/* Columna derecha con el formulario */}
        <div className="login-form-container">
          <div className="login-form-box">
            <h2 className="login-title">Bienvenido a Ondas</h2>
            <p className="login-subtitle">¡Bienvenido! Por favor, introduzca sus datos.</p>

            <form className="login-form">
              <div>
                <label htmlFor="email" className="login-label">Correo</label>
                <input id="email" name="email" type="email" required className="login-input" />
              </div>

              <div>
                <label htmlFor="password" className="login-label">Contraseña</label>
                <input id="password" name="password" type="password" required className="login-input" />
              </div>

              <div className="login-options">
                <div className="login-checkbox">
                  <input id="remember" type="checkbox" />
                  <label htmlFor="remember">Autenticación externa</label>
                </div>
                <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
              </div>
              
              <Link to={"/Home"} className='login-button'>Entrando</Link>
            </form>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <div className="login-footer">
        <p><strong>INFORMACIÓN DE CONTACTO DE PROGRAMA ONDAS</strong></p>
        <p>Código postal: 111321 | Correo Electrónico: ondas@minciencias.gov.co | Teléfono: (57) (1) 6258480 ext. 5405</p>
      </div>
    </div>
  )
}

export default LoginPage