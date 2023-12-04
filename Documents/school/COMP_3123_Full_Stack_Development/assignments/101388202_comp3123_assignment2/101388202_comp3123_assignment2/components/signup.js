import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSignup = () => {
    if (username && password) {
      history.push('/login');
    } else {
      alert('Invalid registration information. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;