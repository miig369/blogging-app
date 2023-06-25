import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from 'react';
import apiClient,{CanceledError, AxiosError} from '../services/api-client';
import {Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateArticle = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] =useState(false)

    function handlePost(e){
        e.preventDefault();
        console.log('cliiiiicked')
        const newPost = {
            title: title, 
            summary: summary,
            imageUrl,
            // imageUrl: imageUrl[0],
            content: content
        }

        apiClient.post('/api/articles/', newPost)
        .then((response)=>{
            setRedirect(true)
        })
        .catch((error)=>{
            console.log(error.message)
            toast("Something went wrong, please try again");
        })
    }

    if(redirect){
        return <Navigate to='/'/>
    }

    return (
        <>
        <ToastContainer />
    <section className='container'>
        <h1>Hello World</h1>
        <form className='create-article' onSubmit={handlePost}>
            <input type="text" placeholder='Enter title' name='title' value={title} onChange={e => setTitle(e.target.value)} required/>
            <input type="text" placeholder='Enter summary' name='summary' value={summary} onChange={e => setSummary(e.target.value)}  required />
            <input type="text" placeholder='Enter image url' name='imageUrl' value={imageUrl} onChange={e => setImageUrl(e.target.value)}  required />
            {/* <input type="file" name='imageUrl' onChange={e => setImageUrl(e.target.files)}/> */}
            <ReactQuill theme="snow" value={content} style={{height: '20em', marginBottom: '5em'}} name='content' onChange={newValue => setContent(newValue)} required/>
            <button>Create Post</button>
        </form>
    </section>
    </>)

}

export default CreateArticle;