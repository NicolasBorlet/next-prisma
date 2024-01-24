"use client";

import { PiloteProps } from "@/types/PiloteProps";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function Pilotes() {
  const [data, setData] = useState([]);
  const [newPiloteName, setNewPiloteName] = useState("");
  const [newPiloteAge, setNewPiloteAge] = useState(0);

  useEffect(() => {
    fetch("/api/pilotes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setData(data.pilotes);
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
    <main className="w-full px-16 py-10">
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-1 border rounded-xl border-red-200 p-3 flex-col justify-start items-start">
          <h1 className="mb-3">Pilotes</h1>
          <div className="flex flex-col">
            {data.map((pilote: PiloteProps) => (
             <Link href={`/pilotes/${pilote.id}`} key={pilote.id}>
                  {pilote.name} ({pilote.age} ans)
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 border rounded-xl border-red-200 p-3">
          <h1>Ajouter un pilote</h1>
          <form onSubmit={handleSubmit} className="flex flex-col text-center justify-center items-center">
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
              onChange={(event) =>
                setNewPiloteAge(parseInt(event.target.value, 10))
              }
            />
            <button type="submit" className="mt-4 px-4 py-1 border rounded-xl border-red-200 w-fit">Ajouter</button>
          </form>
        </div>
      </div>
    </main>
  );
}
