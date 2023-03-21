import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in');
    }
  }, [user, navigate]);

  return <div>This will become the landing page for logged in users: their dashboard.</div>;
}
