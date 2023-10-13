import { Kennzeichen } from "./types";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState<Kennzeichen[]>([]);

  useEffect(() => {
    fetch("/kennzeichen.json", {
      method: "GET",
    })
      .then((response) => {
        if (response.status != 200) {
          location.reload();
          return;
        }

        return response.json();
      })
      .then((kennzeichen: Kennzeichen[]) => {
        setData(kennzeichen);
      });
  }, []);

  if (data.length === 0) {
    return <p>Laden...</p>;
  }

  return (
    <>
      <p>Einträge: {data.length}</p>
      <table>
        <thead>
          <tr>
            <td>Kürzel</td>
            <td>Name</td>
            <td>Stadt / Kreis</td>
            <td>Bundesland</td>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.kuerzel}</td>
              <td>{entry.name}</td>
              <td>{entry.kreis}</td>
              <td>{entry.bundesland}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
