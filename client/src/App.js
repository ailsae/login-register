import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [emailReg, setEmailReg] = useState('');
  const [nameReg, setNameReg] = useState('');
  const [passReg, setPassReg] = useState('');

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [LoginStatus, setLoginStatus] = useState('');

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: emailReg,
      nama: nameReg, 
      password: passReg}).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: pass}).then((response) => {
        if (response.data.message)
          setLoginStatus(response.data.message);
        else
          setLoginStatus(response.data[0].nama)
    });
  };

  return (
    <div className="App">
      <div className='register'>
        <h1>Registration</h1>
        <label>Username</label> 
        <input 
          type="text" 
          onChange={(e)=> {
            setNameReg(e.target.value);
          }}
        />
        <br/><label>Email Address</label> 
        <input 
          type="text" 
          onChange={(e)=> {
            setEmailReg(e.target.value);
          }}
        />
        <br/><label>Password</label> 
        <input 
          type="password" 
          onChange={(e)=> {
            setPassReg(e.target.value);
          }}
        />
        <br/><button onClick={register}>Register</button>
      </div>

      <div className='login'>
        <h1>Login</h1>
        <label>Email Address</label> 
        <input 
          type="text" 
          placeholder='email'
          onChange={(e)=> {
            setEmail(e.target.value);
          }}
        />
        <br/><label>Password</label> 
        <input 
          type="password" 
          placeholder='Password'
          onChange={(e)=> {
            setPass(e.target.value);
          }}
        />
        <br/><button onClick={login}>Login</button>
      </div>

      <h3>{LoginStatus}</h3>
    </div>
  );
}

export default App;
