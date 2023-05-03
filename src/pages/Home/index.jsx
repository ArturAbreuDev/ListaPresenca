import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import "./styles.css";

export function Home() {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  async function getUserData() {
    const username = window.prompt("Qual é o seu nome de usuário do GitHub?");
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setUser({
      name: data.name,
      avatar: data.avatar_url,
    });
  }

  function handleSignOut() {
    setUser({ name: "", avatar: "" });
    getUserData();
  }

  function handleAddStudent() {
    const newStudent = {
      name: name,
      time: new Date().toLocaleTimeString(),
    };
    setStudents([...students, newStudent]);
    setName("");
  }

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          {user.name ? null : (
            <button type="button" onClick={getUserData}>
              Obter informações do GitHub
            </button>
          )}

          <strong>{user.name}</strong>
          {user.name ? <img src={user.avatar} alt="foto de perfil" /> : null}

          {user.name ? (
            <button type="button" onClick={handleSignOut}>
              Sair
            </button>
          ) : null}
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {students.map((student, index) => (
        <Card key={index} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
