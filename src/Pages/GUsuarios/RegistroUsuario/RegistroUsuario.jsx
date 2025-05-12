import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../Firebase/Firebase'
import { setDoc, doc } from "firebase/firestore";

import Header from '../../../Componentes/Header/Header'

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "Estudiante",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = res.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        rol: formData.rol,
      });

      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header/>
      <Link to={"/Usuarios"} className='bton-volver'>Volver</Link>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="email" placeholder="Correo" type="email" onChange={handleChange} />
        <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} />
        <select name="rol" onChange={handleChange}>
          <option value="Estudiante">Estudiante</option>
          <option value="Profesor">Profesor</option>
          <option value="Coordinador">Coordinador</option>
        </select>
        <button type="submit">Guardar</button>
      </form>

    </div>
  )
}

export default RegistroUsuario