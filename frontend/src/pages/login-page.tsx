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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    function handleLogin(e){
        e.preventDefault();

        apiClient.post<UserProps>('/api/users/login', {email, password})
        .then((response) =>{
            setUserInfo(response.data);
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