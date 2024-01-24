'use client';

import { PiloteProps } from "@/types/PiloteProps";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PiloteScreen = () => {
  const { id } = useParams<{ id: string }>();

  const [pilote, setPilote] = useState<PiloteProps>();

  useEffect(() => {
    fetch(`/api/pilotes/${id}`)
      .then((response) => {
        // Vérifier si la réponse est OK avant de convertir en JSON
        if (!response.ok) {
          throw new Error(`Erreur lors de la requête : ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPilote(data.pilote);
      })
      .catch((error) => {
        console.error(error);
        // Gérer l'erreur, par exemple, rediriger vers une page d'erreur
      });
  }, [id]);

  if (!pilote) {
    // Afficher un indicateur de chargement ou un message en attendant la réponse
    return <div>Chargement...</div>;
  }

  return (
    <main className="w-full px-16 py-10">
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-1 border rounded-xl border-red-200 p-3 flex-col justify-start items-start">
          <h1 className="mb-3">Pilote</h1>
          <div className="flex flex-col">
            <p>{pilote?.name} ({pilote?.age} ans)</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PiloteScreen;
