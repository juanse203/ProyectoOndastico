import React, { useState } from 'react'
import { useAuth } from '../../Contexto/TelaComeSinPretexto'
import './LoginPage.css'
import logo from '../../assets/logOndas.png'
import librito from '../../assets/Librito-mision.jpg'

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (xd) => {
    xd.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert("Correo o contraseña inválidos");
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
            
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email" className="login-label">Correo</label>
              <input id="email" type="email" required className="login-input" onChange={(xd) => setEmail(xd.target.value)} />

              <label htmlFor="password" className="login-label">Contraseña</label>
              <input id="password" type="password" required className="login-input" onChange={(xd) => setPassword(xd.target.value)} />

              <button type="submit" className='login-button'>Entrar</button>
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