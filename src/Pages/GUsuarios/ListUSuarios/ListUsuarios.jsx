import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../..//Firebase/Firebase'
import Header from '../../../Componentes/Header/Header'

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const snapshot = await getDocs(collection(db, "usuarios"));
    const lista = snapshot.docs.map(doc => doc.data());
    setUsuarios(lista);
  }

  useEffect(() => {
    getUsuarios();
  }, [])

  return (
    <div>
      <Header />
      <h1>Usuarios</h1>
      <Link to={"/añadirUs"} className='bton-añadir'>Añadir</Link>
      <table>
        <thead>
          <tr className="tablita-chan">
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.uid}>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListUsuarios