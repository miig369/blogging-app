import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import apiClient,{CanceledError, AxiosError} from '../services/api-client';
import {useState, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/user-context';

const CreateArticle = () => {

    const {userInfo} = useContext(UserContext);

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] =useState(false)

    function handlePost(e){
        e.preventDefault();

        if((title === "" ) || (summary === "") || (content === "") || (imageUrl==="")){
            toast('All fields have to be completed')
            return;
        }
        
        const newPost = {
            title: title, 
            summary: summary,
            imageUrl,
            // imageUrl: imageUrl[0],
            content: content
        }

        console.log('clicked: ', newPost)

        // apiClient.post('/api/articles/', newPost)
        // .then((response)=>{
        //     setRedirect(true)
        // })
        // .catch((error)=>{
        //     console.log(error.message)
        //     toast("Something went wrong, please try again");
        // })

        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `token=${localStorage.getItem('token')}`);

        const raw = JSON.stringify(newPost);

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:9000/api/articles", requestOptions)
        .then((response) => 
        {
            response.text()
            setRedirect(true)
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }

    if(Object.keys(userInfo)?.length === 0){ 
        return (<Navigate to='/login'/>);
    }

    if(redirect){
        return <Navigate to='/'/>
    }

    return (
        <>
        <ToastContainer />
    <section className='container'>
        <form className='create-article' onSubmit={handlePost}>
        <h1>Create Post</h1>
            <input type="text" placeholder='Enter title' name='title' value={title} onChange={e => setTitle(e.target.value)} required/>
            <input type="text" placeholder='Enter summary' name='summary' value={summary} onChange={e => setSummary(e.target.value)}  required />
            <input type="text" placeholder='Enter image url' name='imageUrl' value={imageUrl} onChange={e => setImageUrl(e.target.value)}  required />
            <ReactQuill theme="snow" value={content} style={{height: '20em', marginBottom: '5em'}} name='content' onChange={newValue => setContent(newValue)} required/>
            <button>Create Post</button>
        </form>
    </section>
    </>)

}

export default CreateArticle;
