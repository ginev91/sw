import React, { useEffect, useState } from 'react';
import { fetchProtected } from '../api';
import { loadAuth } from '../auth';

export default function Vehicles() {
  const [data, setData] = useState([]);
  const { token } = loadAuth();

  useEffect(() => {
    fetchProtected('/swapi/vehicles', token)
      .then(setData)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>Vehicles</h2>
      <ul>
        {data.map((v, i) => <li key={i}>{v.name}</li>)}
      </ul>
    </div>
  );
}