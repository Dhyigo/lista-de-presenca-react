import React, { useState, useEffect } from 'react';

import { Card, CardProps } from '../../components/Card';
import './style.css'

type ProfileResponse = {
  name: string;
  avatar_url: string;
} 

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('Vazio');
  const [students, setStudent] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudent(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {

      const response = await fetch('https://api.github.com/users/Dhyigo');
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }

    fetchData();
  }, []);


  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome.."
        onChange={(e) => setStudentName(e.target.value)}

      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))

      }
    </div>
  )
}
