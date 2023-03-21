import React, { useState } from 'react';
// import { useContext } from 'react';
import { NavLink, redirect, useParams } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
import { authUser, signInUser, signUpUser, signOutUser } from '../../services/auth';

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { user, setUser } = useContext(UserContext);
  // const { type } = useParams();

  // if (user) {
  //   return redirect('/creator');
  // }

  const submitAuth = async () => {
    const userResp = await signUpUser(firstName, lastName, email, password);
    //setUser(userResp);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <label className="labels">First Name</label>
      <input
        className="labels"
        type="first-name"
        placeholder="first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label className="labels">Last Name</label>
      <input
        className="labels"
        type="last-name"
        placeholder="last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label className="labels">EMAIL</label>
      <input
        className="labels"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="labels">PASSWORD</label>
      <input
        className="labels"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="labels" onClick={submitAuth}>
        SUBMIT
      </button>
    </div>
  );
}
function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { user, setUser } = useContext(UserContext);
  // const { type } = useParams();

  // if (user) {
  //   return redirect('/creator');
  // }

  const submitAuth = async () => {
    const userResp = await signInUser({ email, password });
    redirect('/creator');
    window.location.reload();

    //setUser(userResp);
    // setEmail('');
    // setPassword('');
  };

  return (
    <div>
      <label className="labels">EMAIL</label>
      <input
        className="labels"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="labels">PASSWORD</label>
      <input
        className="labels"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="labels" onClick={submitAuth}>
        SUBMIT
      </button>
    </div>
  );
}

export default function Auth({
  // string, should be 'sign-in' or 'sign-up'
  type,
}) {
  return (
    <>
      <div className="auth-container">
        <div>
          <NavLink className="links" to="/auth/sign-in">
            SIGN IN
          </NavLink>
          <NavLink className="links" to="/auth/sign-up">
            SIGN UP
          </NavLink>
          <button onClick={() => signOutUser()}>Sign out</button>
        </div>
        <div className="auth">
          {type === 'sign-in' && <SignInForm />}
          {type === 'sign-up' && <SignUpForm />}
        </div>
      </div>
    </>
  );
}
