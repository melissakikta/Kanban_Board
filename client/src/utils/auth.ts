import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        return decoded.exp < now; // Token is expired if current time > token expiration
      }
      return false; // If no exp field, assume it's valid
    } catch (err) {
      console.error('Failed to decode token', err);
      return true; // Treat as expired if token can't be decoded
    }
  }

  getToken(): string {
    // DONE: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // DONE: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // DONEredirect to the home page
    window.location.assign('/');
  }

  logout() {
    // DONE: remove the token from localStorage
    localStorage.removeItem('id_token');
    // DONE: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
