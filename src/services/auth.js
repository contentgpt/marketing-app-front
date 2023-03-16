export async function authUser(firstName, lastName, email, password, type) {
  let response;
  if (type === 'sign-up') {
    response = await fetch('http://localhost:7890/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  } else {
    response = await fetch('http://localhost:7890/api/v1/users/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }
  return response.user;
}

export async function getUser({ email, password }) {
  const response = await fetch('http://localhost:7890/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.user;
}