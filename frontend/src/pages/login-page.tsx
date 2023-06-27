import {useContext, useState} from 'react';
import apiClient,{CanceledError, AxiosError} from '../services/api-client';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserContext} from '../context/user-context';

interface UserProps {
    password: string;
    email:string;
    id?: number | any;
  }

const Login = () => {
    const {setUserInfo} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleLogin(e){
        e.preventDefault();

        if((email === "" ) || (password === "")){
            toast('Email or Password cannot be empty')
            return;
        }

        apiClient.post<UserProps>('/api/users/login', {email, password})
        .then((response) =>{
            setUserInfo(response.data);
            localStorage.setItem('token', response.data.token);
            setRedirect(true);
        })
        .catch((error)=>{
            console.log(error.message)
            toast("Login failed, please try again");
        })

    }

    if(redirect){
        return <Navigate to='/' />
    }

    return (
        <>
       <ToastContainer />
        <div className='container'>
            <form action="" onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="email" placeholder='Enter email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder='Enter password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </div>
        </>
    )
}

export default Login;