import React, { useState } from 'react';
import { register } from '../api';

export default function RegisterForm({ onRegister }: { onRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(email, password, confirmPassword);
      setSuccess('Registration successful! You can now login.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onRegister();
    } catch (err) {
      setError('Registration failed: ' + (err as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Password (min 6 characters)" 
        required 
        minLength={6}
      />
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} 
        placeholder="Confirm Password" 
        required 
        minLength={6}
      />
      <button type="submit">Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
}