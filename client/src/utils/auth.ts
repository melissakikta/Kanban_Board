import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // DONE: return a value that indicates if the token is expired
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
    } catch (err) {
      // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
      return false;
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
