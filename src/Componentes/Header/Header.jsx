import React, {useState} from 'react'
import './Header.css'

import logOndas from '../../assets/logOndas.png'
import CoordiNav from '../../Componentes/Navbars/CoordinNavbar/CordiNavbar'
import ProfeNav from '../../Componentes/Navbars/ProfeNavbar/ProfNavbar'
import studenNav from '../../Componentes/Navbars/StudentNavbar/StudenNavbar'

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <div className='Headerpendejos'>
            {/* Botón para abrir el menú */}
            <img className='logo-bton'
                src={logOndas}
                alt="Abrir menú"
                onClick={() => setDrawerOpen(true)}
            />

            {/* Componente del Drawer */}
            <CoordiNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
    )
}

export default Header