import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuth } from '../../../Contexto/TelaComeSinPretexto'
import { auth, db } from '../../../Firebase/Firebase'
import { setDoc, doc } from "firebase/firestore"

import Header from '../../../Componentes/Header/Header'

const RegistroUsuario = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "Estudiante",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = res.user;

      // Asignar relaciones jerárquicas
      const data = {
        uid: user.uid,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        rol: formData.rol,
      };

      if (formData.rol === "Profesor" && userData.rol === "Coordinador") {
        data.coordinadorId = userData.uid;
      } else if (formData.rol === "Estudiante") {
        data.profesorId = userData.uid;
      }

      await setDoc(doc(db, "usuarios", user.uid), data);
      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error("Error al registrar usuario", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Registrar Usuario</h2>
      <Link to="/Usuarios">Volver</Link>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <select name="rol" onChange={handleChange} value={formData.rol}>
          {userData.rol === "Coordinador" && <option value="Profesor">Profesor</option>}
          <option value="Estudiante">Estudiante</option>
          <option value="Coordinador">Coordinador</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario