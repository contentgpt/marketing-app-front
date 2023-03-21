const localStorageKey = 'andrews-super-duper-secret';

function storeToken(token) {
  localStorage.setItem(localStorageKey, token);
}

export function getToken() {
  return localStorage.getItem(localStorageKey);
}

function clearToken() {
  localStorage.removeItem(localStorageKey);
}

export async function signUpUser(firstName, lastName, email, password) {
  const response = await fetch('http://localhost:7890/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  if (!response.ok) {
    throw new Error(`Error in signUpUser: ${response.statusText} ${response.status}`);
  }
  // data.id - string
  // data.firstName - string
  const data = await response.json();
  return {
    userId: data.id,
  };
}

export async function signInUser({ email, password }) {
  if (!email) {
    throw new Error(`signInUser: Must pass in email`);
  }
  if (!password) {
    throw new Error(`signInUser: Must pass in password`);
  }
  const response = await fetch('http://localhost:7890/api/v1/users/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error in signUpUser: ${response.statusText} ${response.status}`);
  }
  // data.message - string
  // data.token - string (JWT token)
  const data = await response.json();
  if (!data.token) {
    throw new Error(`signInUser should return a token in it's response body but did not.`);
  }
  console.log(`signInUser: success. stored token`);
  storeToken(data.token);
}

export function signOutUser() {
  clearToken();
}

// export async function authUser(firstName, lastName, email, password, type) {
//   // const

//   // let response;
//   if (type === 'sign-up') {
//     const response = await fetch('http://localhost:7890/api/v1/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ firstName, lastName, email, password }),
//     });
//   } else {
//     const response = await fetch('http://localhost:7890/api/v1/users/sessions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//   }

//   if (response.ok) {
//     const data = await response.json();
//     const token = data.token;
//       // Store the token securely, e.g., in-memory storage, HttpOnly cookies, or other storage methods
//   } else {
//       // Handle login error
//   }
//   console.log('response.user in authUser', response.user);
//   console.log('token in authUser', token);
//   return response.user;
// }

// export async function getUser() {
//   const response = await fetch('http://localhost:7890/api/v1/users/me', {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       // Authorization: `bearer ${jwt.token}`
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Error in getUser: ${response.statusText} ${response.status}`);
//   }

//   const json = await response.json();
//   console.log('response in auth.js', json);
//   return json;
// }
