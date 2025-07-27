const API_BASE = 'http://localhost:3000/v1';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  console.log('Login response:', response);
  return response.json();
}

export async function register(email: string, password: string, confirmPassword: string) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Registration failed: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProtected(route: string, token: string) {
  const res = await fetch(`${API_BASE}${route}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}