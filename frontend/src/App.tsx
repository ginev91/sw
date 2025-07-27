import React, { useState } from 'react';
import LoginForm from './components/LoginFrom';
import RegisterForm from './components/RegisterForm';
import { loadAuth, logout } from './auth';

function App() {
  const [{ token, user }, setAuth] = useState(loadAuth());
  const [showRegister, setShowRegister] = useState(false);

  function handleLogin() {
    setAuth(loadAuth());
  }

  function handleRegister() {
    setShowRegister(false);
  }

  if (!token) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        {showRegister ? (
          <div>
            <RegisterForm onRegister={handleRegister} />
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setShowRegister(false)}
                style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Login here
              </button>
            </p>
          </div>
        ) : (
          <div>
            <LoginForm onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setShowRegister(true)}
                style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Register here
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: 'black', borderRadius: '4px' }}>
        <h2>🚀 Welcome to SWAPI Dashboard!</h2>
        <p>📧 Email: <strong>{user?.email}</strong></p>
        <p>👤 Role: <strong>{user?.role}</strong></p>
        <p>🆔 User ID: <strong>{user?.id}</strong></p>
        <p>🎫 Token: <code style={{ 
          fontSize: '12px', 
          display: 'block',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          backgroundColor: 'black',
          padding: '8px',
          borderRadius: '4px',
          marginTop: '8px',
          maxHeight: '100px',
          overflowY: 'auto'
        }}>{token}</code></p>

        <button 
          onClick={() => { logout(); setAuth({ token: null, user: null }); }}
          style={{ 
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3>🌟 SWAPI Resources</h3>
        <ul>
          <li>👥 People</li>
          <li>🪐 Planets</li>
          <li>🚀 Starships</li>
          <li>🚗 Vehicles</li>
        </ul>
        <p><em>CRUD operations are not yet implemented.</em></p>
      </div>
    </div>
  );
}

export default App;