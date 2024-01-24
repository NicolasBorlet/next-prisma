'use client';
import Link from "next/link";
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
    <main className="flex justify-center items-center flex-col h-screen">
      <h1>Bienvenu sur le site référence des pilotes</h1>
      <Link href="/pilotes">
        Voir les pilotes
      </Link>
    </main>
  );
}
