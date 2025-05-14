import { useAuth } from './TelaComeSinPretexto'
import { Navigate } from 'react-router-dom'

const ConCondon = ({ children }) => {
  // Esto protege las rutas, redireccionando al login en caso que se quieran saltar las rutas
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/" />
}

export default ConCondon