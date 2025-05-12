import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/Firebase'

import logo from '../../assets/logOndas.png'
import librito from '../../assets/Librito-mision.jpg'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <img className='logOndas' src={logo} alt="logo" />
      <div className="login-main">
        <div className="login-image">
          <img src={librito} alt="Misión Ondas" className="login-img" />
        </div>

        <div className="login-form-container">
          <div className="login-form-box">
            <h2 className="login-title">Bienvenido a Ondas</h2>
            <p className="login-subtitle">¡Bienvenido! Por favor, introduzca sus datos.</p>

            <form className="login-form" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="login-label">Correo</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="login-label">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="login-options">
                <div className="login-checkbox">
                  <input id="remember" type="checkbox" />
                  <label htmlFor="remember">Autenticación externa</label>
                </div>
                <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <button type="submit" className="login-button">Entrar</button>
            </form>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <p><strong>INFORMACIÓN DE CONTACTO DE PROGRAMA ONDAS</strong></p>
        <p>Código postal: 111321 | Correo Electrónico: ondas@minciencias.gov.co | Teléfono: (57) (1) 6258480 ext. 5405</p>
      </div>
    </div>
  )
}

export default LoginPage