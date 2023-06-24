import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../context/user-context';
import apiClient,{CanceledError, AxiosError} from '../../services/api-client';

interface HeaderProps {
    className: string,
    logo: string

}

const Header = ({className, logo}: HeaderProps) => {

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(()=>{
        apiClient.get('/api/users/profile')
        .then((response)=>{
            setUserInfo(response.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    },[])

    function handleLogout(){
        apiClient.post('/api/users/logout')
        .then((response) => {
            setUserInfo(null);
            setRedirect(true);
    })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    const user = userInfo?.firstName;

    return (
        <header>
            <div className={className}>
                <Link to='/'>{logo}</Link>
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
                    <li>{user}</li>
                    <li><Link to="/create">Create new post</Link></li>
                    <li><a onClick={handleLogout}>logout</a></li>  
                    </>
                    }
                    </ul>
                    <button>hello</button>
                </nav>
            </div>
        </header>
    )
}

export default Header;