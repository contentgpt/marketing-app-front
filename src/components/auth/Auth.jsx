import React, { useState } from 'react';
import { useContext } from 'react';
import { NavLink, redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';

export default function Auth() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  const { type } = useParams();

  if (user) {
    return redirect('./creator/Creator');
  }

  const submitAuth = async () => {
    const userResp = await authUser(firstName, lastName, email, password, type);
    setUser(userResp);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="auth-container">
        <div>
          <NavLink className="links" to="/auth/sign-in">SIGN IN</NavLink>
          <NavLink className="links" to="/auth/sign-up">SIGN UP</NavLink>
        </div>
        <div className="auth">
          <label className='labels'>First Name</label>
          <input className='labels' type="first-name" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label className='labels'>First Name</label>
          <input className='labels' type="last-name" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label className='labels'>EMAIL</label>
          <input className='labels' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className='labels'>PASSWORD</label>
          <input className='labels' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='labels' onClick={submitAuth}>SUBMIT</button>
        </div>
      </div>
    </>
  );
}
