import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";




import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';


function Login() {
  
  const navigate =useNavigate();
  
  const [action, setAction] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (action === 'Login') {
                const response = await axios.post('https://apitest.reachstar.io/signin', {
                    email: email,
                    password: password,
                });
                console.log('Login response:', response.data);
                 navigate("/home"); 
            } else {
                const response = await axios.post('https://apitest.reachstar.io/signup', {
                    name: name,
                    email: email,
                    password: password,
                });
                console.log('Signup response:', response.data);
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.log('Error:', error);
        }
    };

    return (
        <React.Fragment>
            {/* Header */}

                <div className='container-fluid'>
                    <h1 className="fs-1 p-5 text-center">Natia Latsuzbaia's Blog</h1>
                </div>

            {/* Main Content */}
            <div className='container'>
                <div className='header'>
                    <div className='text fs-1 fw-semibold'>{action}</div>
                    <div className='underline rounded-4'></div>
                </div>
                <form method='POST' onSubmit={handleSubmit}>
                    {action !== 'Login' && (
                        <div className='input'>
                            <img src={user_icon} alt='' />
                            <input type='text' placeholder='Name' value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                    )}
                    <div className='input'>
                        <img src={email_icon} alt='' />
                        <input type='email' placeholder='Email Address' value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt='' />
                        <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className='forgot-password'>Lost Password <span>Click Here!</span></div>
                    {error && <div className='error'>{error}</div>}
                    <div className='submit-container'>
                        <button type='submit' className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign Up')}>
                            Sign Up
                        </button>
                        <button type='submit' className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => {
                            setAction('Login');
                           
                          }}>     
                          Login
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}


export default Login;