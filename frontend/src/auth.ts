export function saveAuth(accessToken: string, refreshToken?: string, user?: { [key: string]: string | number}) {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  console.log('Auth saved:', { accessToken, refreshToken, user });
}

export function loadAuth() {
  const token = localStorage.getItem('accessToken');
  const userString = localStorage.getItem('user');
  
  let user = null;
  if (userString && userString !== 'undefined') {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
    }
  }
  console.log('Loaded auth:', { token, user });
  return { token, user };
}

export function getAuthToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function logout() {
  localStorage.clear();
}