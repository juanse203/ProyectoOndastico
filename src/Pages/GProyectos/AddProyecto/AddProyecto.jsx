import React, { useEffect, useState } from "react"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { useAuth } from "../../../Contexto/TelaComeSinPretexto"
import { db } from '../../../Firebase/Firebase'
import { Link } from "react-router-dom"

import Header from '../../../Componentes/Header/Header'

const AddProyecto = () => {
  const { userData } = useAuth();
  const [profesores, setProfesores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    area: "",
    objetivos: "",
    cronograma: "",
    presupuesto: "",
    institucion: "",
    observaciones: "",
    integrantes: [], // uids estudiantes
    asignadoA: "",   // uid profesor (si lo crea el coordinador)
  });

  // Cargar profesores si el creador es coordinador
  useEffect(() => {
    const fetchProfesores = async () => {
      if (userData.rol === "Coordinador") {
        const q = query(collection(db, "usuarios"), where("rol", "==", "Profesor"));
        const snap = await getDocs(q);
        setProfesores(snap.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
      }
    };

    const fetchEstudiantes = async () => {
      if (userData.rol === "Profesor") {
        const q = query(collection(db, "usuarios"), where("rol", "==", "Estudiante"), where("profesorId", "==", userData.uid));
        const snap = await getDocs(q);
        setEstudiantes(snap.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
      }
    };

    fetchProfesores();
    fetchEstudiantes();
  }, [userData]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) => {
    const uid = e.target.value;
    setFormData(prev => ({
      ...prev,
      integrantes: e.target.checked
        ? [...prev.integrantes, uid]
        : prev.integrantes.filter(id => id !== uid)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proyecto = {
      ...formData,
      creadoPor: userData.uid,
      rolCreador: userData.rol,
      fechaCreacion: new Date(),
      estado: "Formulación",
      historialEstados: [
        {
          estado: "Formulación",
          fecha: new Date(),
          observacion: "Proyecto creado"
        }
      ],
    };

    if (userData.rol === "Profesor") {
      proyecto.asignadoA = userData.uid;
    }

    if (userData.rol === "Coordinador" && !formData.asignadoA) {
      alert("Debe seleccionar un profesor para asignar el proyecto.");
      return;
    }

    await addDoc(collection(db, "proyectos"), proyecto);
    alert("Proyecto creado exitosamente");
    setFormData({
      titulo: "",
      area: "",
      objetivos: "",
      cronograma: "",
      presupuesto: "",
      institucion: "",
      observaciones: "",
      integrantes: [],
      asignadoA: "",
    });
  };

  return (
    <div>
      <Header />
      <h2>Crear Proyecto</h2>
      <Link to={"/Proyectos"} className="bton-volver">Volver</Link>
      <form onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <input name="area" placeholder="Área" value={formData.area} onChange={handleChange} required />
        <textarea name="objetivos" placeholder="Objetivos" value={formData.objetivos} onChange={handleChange} required />
        <input name="cronograma" placeholder="Cronograma" value={formData.cronograma} onChange={handleChange} required />
        <input name="presupuesto" placeholder="Presupuesto" value={formData.presupuesto} onChange={handleChange} required />
        <input name="institucion" placeholder="Institución" value={formData.institucion} onChange={handleChange} required />
        <textarea name="observaciones" placeholder="Observaciones" value={formData.observaciones} onChange={handleChange} />

        {/* Coordinador selecciona profesor */}
        {userData.rol === "Coordinador" && (
          <select name="asignadoA" onChange={handleChange} value={formData.asignadoA}>
            <option value="">Seleccione un profesor</option>
            {profesores.map(p => (
              <option key={p.uid} value={p.uid}>{p.nombre} {p.apellido}</option>
            ))}
          </select>
        )}

        {/* Profesor selecciona estudiantes */}
        {userData.rol === "Profesor" && (
          <div>
            <h4>Seleccionar Estudiantes:</h4>
            {estudiantes.map(est => (
              <label key={est.uid}>
                <input
                  type="checkbox"
                  value={est.uid}
                  onChange={handleCheckboxChange}
                  checked={formData.integrantes.includes(est.uid)}
                />
                {est.nombre} {est.apellido}
              </label>
            ))}
          </div>
        )}

        <button type="submit">Crear Proyecto</button>
      </form>
    </div>
  )
}

export default AddProyecto