import React, { useEffect, useState } from 'react';
import { fetchProtected } from '../api';
import { loadAuth } from '../auth';

export default function Planets() {
  const [data, setData] = useState([]);
  const { token } = loadAuth();

  useEffect(() => {
    fetchProtected('/swapi/planets', token)
      .then(setData)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>Planets</h2>
      <ul>
        {data.map((p, i) => <li key={i}>{p.name}</li>)}
      </ul>
    </div>
  );
}