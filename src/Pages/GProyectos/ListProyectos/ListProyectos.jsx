import React, { useEffect, useState } from "react"
import Header from '../../../Componentes/Header/Header'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from '../../../Firebase/Firebase'
import { useAuth } from '../../../Contexto/TelaComeSinPretexto'
import { Link } from "react-router-dom"

const ListProyectos = () => {
  const { userData } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProyectos = async () => {
      if (!userData) return;

      let q;

      if (userData.rol === "Coordinador") {
        // Coordinador ve todos los proyectos
        q = collection(db, "proyectos");
      } else if (userData.rol === "Profesor") {
        // Profesor ve los que creó o le asignaron
        q = query(
          collection(db, "proyectos"),
          where("asignadoA", "==", userData.uid)
        );
      } else if (userData.rol === "Estudiante") {
        // Estudiante ve los proyectos donde está en integrantes
        q = query(
          collection(db, "proyectos"),
          where("integrantes", "array-contains", userData.uid)
        );
      }

      const snap = await getDocs(q);
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProyectos(lista);
      setCargando(false);
    };

    cargarProyectos();
  }, [userData]);

  if (cargando) return <p>Cargando proyectos...</p>;

  return (
    <div>
      <Header />
      <h2>Lista de Proyectos</h2>
      <Link to={"/añadirProjects"} className="bton-anadir">Añadir</Link>
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id} style={{ marginBottom: "1rem" }}>
            <h3>{proyecto.titulo}</h3>
            <p><strong>Área:</strong> {proyecto.area}</p>
            <p><strong>Institución:</strong> {proyecto.institucion}</p>
            <p><strong>Estado:</strong> {proyecto.estado}</p>
            <Link to={`/proyecto/${proyecto.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListProyectos