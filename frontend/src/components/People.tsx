import React, { useEffect, useState } from 'react';
import { fetchProtected } from '../api';
import { loadAuth } from '../auth';

export default function People() {
  const [data, setData] = useState([]);
  const { token } = loadAuth();

  useEffect(() => {
    fetchProtected('/swapi/people', token)
      .then(setData)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>People</h2>
      <ul>
        {data.map((p, i) => <li key={i}>{p.name}</li>)}
      </ul>
    </div>
  );
}