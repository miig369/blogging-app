import {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleRegister(e){
        e.preventDefault();
        axios.post('http://localhost:9000/api/users/register', {
            firstName, lastName, email, password
        }).then((response)=>{
            console.log(response.data);
            toast("Registration successfull");
            setTimeout(()=>{
                navigate('/login')
            }, 4000)
           
        })
        .catch((error)=>{
            console.log(error.message)
            toast("Registration failed, please try again");
        })
    }
    return (
        <>
            <ToastContainer />
            <div className='container'>
                <form action="" onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <input type="text" placeholder='Enter first name' name='firstName' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <input type="text" placeholder='Enter last name' name='lastName' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                    <input type="email" placeholder='Enter email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)} }/>
                    <input type="password" placeholder='Enter password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button>Register</button>
                </form>
                
            </div>
    </>
    )
    
}

export default Register;