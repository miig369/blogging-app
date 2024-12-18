import {Link, Navigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import { UserContext } from '../../context/user-context';
import apiClient,{CanceledError, AxiosError} from '../../services/api-client';

interface HeaderProps {
    logo: string

}

const Header = ({logo}: HeaderProps) => {

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(()=>{
                        //effect cleanup
    const controller = new AbortController();
  
        apiClient.get('/api/users/profile', {signal: controller.signal})
        .then((response)=>{
            setUserInfo(response.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
        return () => controller.abort();
    },[])

    function handleLogout(){
        apiClient.post('/api/users/logout')
        .then((response) => {
            setUserInfo(null);
            localStorage.removeItem('token');
            <Navigate to='/login' />
    })
        .catch((error)=>{
            console.log(error.message)
        })
    }


 
    
    const user = userInfo?.firstName;

    return (
        <header>
            <div className='container'>
            <div className='header-wrapper'>
                <Link className= 'logo' to='/'>{logo}</Link>
                <nav>
                    <ul>
                    {
                        !user &&
                        <>
                     <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>  
                    </>
                    }
                    {user && 
                    <>
                    <li><p>{user}</p></li>
                    <li><a onClick={handleLogout}>logout</a></li>  
                    </>
                    }
                    </ul>
                </nav>
            </div>
            </div>
        </header>
    )
}

export default Header;