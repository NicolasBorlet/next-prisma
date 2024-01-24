'use client';
// import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/pilotes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setData(data.pilotes)
      });
  }, []);

  return (
    <main>
      <h1>Pilotes</h1>
      <div>
        {data.map((pilote: {id: string, name: string}) => (
          <a
            key={pilote.id}
          >
            <h3>{pilote.name}</h3>
          </a>
        ))}
      </div>      
    </main>
  );
}
