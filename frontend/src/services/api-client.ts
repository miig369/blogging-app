import axios,{CanceledError, AxiosError} from 'axios';
// import Cookies from 'js-cookie';

// Set config defaults when creating the instance
export default axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        // Authorization : `Bearer ${Cookies.get('token')}`
        Authorization : localStorage.getItem('token')
    }

    //Cookie.getItem("access_token")
})

export {CanceledError, AxiosError}