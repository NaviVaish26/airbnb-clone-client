import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can login');
      setRedirect(true);
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
            id='id'
            placeholder='John Doe'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            id='email'
            placeholder='your@email.com'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            id='password'
            placeholder='password'
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?{' '}
            <Link className='underline text-black' to={'/login'}>
              {' '}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
