import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../..//Firebase/Firebase'
import { useAuth } from '../../../Contexto/TelaComeSinPretexto'
import Header from '../../../Componentes/Header/Header'

const ListUsuarios = () => {
  const { userData } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      if (!userData) return;

      let q;

      if (userData.rol === "Coordinador") {
        q = collection(db, "usuarios");
      } else if (userData.rol === "Profesor") {
        // Solo estudiantes bajo su cargo
        q = query(
          collection(db, "usuarios"),
          where("rol", "==", "Estudiante"),
          where("profesorId", "==", userData.uid)
        );
      } else {
        // Estudiantes no deberían estar aquí
        return;
      }

      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => doc.data());
      setUsuarios(lista);
    };

    getUsuarios();
  }, [userData]);

  return (
    <div>
      <Header />
      <h1>{userData?.rol === "Profesor" ? "Mis Estudiantes" : "Usuarios"}</h1>

      {userData?.rol !== "Estudiante" && (
        <Link to={"/añadirUs"} className='bton-anadir'>Añadir</Link>
      )}

      <table>
        <thead>
          <tr className="tablita-chan">
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            {userData?.rol === "Coordinador" && <th>Opciones</th>}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.uid}>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              {userData?.rol === "Coordinador" && (
                <td>
                  <button className="opciones">Eliminar</button>
                  <button className="opciones">Editar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsuarios