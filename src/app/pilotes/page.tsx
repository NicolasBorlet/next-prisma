'use client';

import { FormEvent, useEffect, useState } from "react";

interface PiloteProps {
  id: number;
  name: string;
  age: number;
}

export default function Pilotes() {
  const [data, setData] = useState([]);
  const [newPiloteName, setNewPiloteName] = useState(""); 
  const [newPiloteAge, setNewPiloteAge] = useState(0);

  useEffect(() => {
    fetch("/api/pilotes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setData(data.pilotes)
      });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Envoi de la requête POST pour créer un nouveau pilote
    await fetch("/api/pilotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPiloteName,
        age: newPiloteAge, // Vous pouvez ajuster l'âge selon vos besoins
      }),
    });

    // Rechargement des pilotes après l'ajout du nouveau pilote
    const response = await fetch("/api/pilotes");
    const newData = await response.json();
    setData(newData.pilotes);

    // Réinitialisation du champ de nom du nouveau pilote
    setNewPiloteName("");
  };

  return (
    <main>
      <h1>Pilotes</h1>
      <div>
        {data.map((pilote: PiloteProps) => (
          <a key={pilote.id}>
            <h3>{pilote.name}</h3>
          </a>
        ))}
      </div>
      <h1>Ajouter un pilote</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom du pilote</label>
        <input
          id="name"
          name="name"
          type="text"
          value={newPiloteName}
          onChange={(event) => setNewPiloteName(event.target.value)}
        />
        <label htmlFor="age">Âge du pilote</label>
        <input
          id="age"
          name="age"
          type="number"
          value={newPiloteAge}
          onChange={(event) => setNewPiloteAge(parseInt(event.target.value, 10))}
        />
        <button type="submit">Ajouter</button>
      </form>
    </main>
  );
}
