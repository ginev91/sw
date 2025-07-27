import React, { useEffect, useState } from 'react';
import { fetchProtected } from '../api';
import { loadAuth } from '../auth';

export default function Starships() {
  const [data, setData] = useState([]);
  const { token } = loadAuth();

  useEffect(() => {
    fetchProtected('/swapi/starships', token)
      .then(setData)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>Starships</h2>
      <ul>
        {data.map((s, i) => <li key={i}>{s.name}</li>)}
      </ul>
    </div>
  );
}