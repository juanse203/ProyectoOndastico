import React, {useState} from 'react'
import './Header.css'
import { useAuth } from '../../Contexto/TelaComeSinPretexto'

import logOndas from '../../assets/logOndas.png'
import CoordiNav from '../../Componentes/Navbars/CoordinNavbar/CordiNavbar'
import ProfeNav from '../../Componentes/Navbars/ProfeNavbar/ProfNavbar'
import StudenNav from '../../Componentes/Navbars/StudentNavbar/StudenNavbar'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { userData } = useAuth();

    const Menucorrespondiente = () => {
    if (!userData) return null

    switch (userData.rol) {
      case 'Coordinador':
        return <CoordiNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      case 'Profesor':
        return <ProfeNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      case 'Estudiante':
        return <StudenNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      default:
        return null
    }
  }

    return (
        <div className='Headerpendejos'>
            {/* Botón para abrir el menú */}
            <img className='logo-bton'
                src={logOndas}
                alt="Abrir menú"
                onClick={() => setDrawerOpen(true)}
            />
            <div className='name-usuario'>{userData?.nombre} {userData?.apellido}</div>
            
            {/* Trae el menu segun el rol del usuario */}
            {Menucorrespondiente()}
        </div>
    )
}

export default Header