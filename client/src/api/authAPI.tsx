import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // Send a POST request to '/auth/login' with user login information in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      let errorMessage = 'Authentication failed'; // Default error message
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (err) {
        console.warn('Non-JSON response or empty body from server');
      }
      throw new Error(errorMessage);
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data;  // Return the data received from the server
  } catch (err) {
    console.log('Error from user login: ', err);  // Log any errors that occur during fetch
    return Promise.reject('Could not fetch user info');  // Return a rejected promise with an error message
  }
}
export { login };
