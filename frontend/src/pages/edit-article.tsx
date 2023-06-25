import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from 'react';
import apiClient,{CanceledError, AxiosError} from '../services/api-client';
import {Navigate, useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ArticlePros {
    id?: string,
    title :string, 
    summary  :string,  
    imageUrl: string,
    content?: string | any, 
}

const EditArticle = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [content, setContent] = useState('')
    const [redirect, setRedirect] =useState(false)

    useEffect(()=>{
        apiClient.get<ArticlePros>('/api/articles/'+id)
        .then((response)=>{
            setTitle(response.data.title)
            setSummary(response.data.summary)
            setImageUrl(response.data.imageUrl)
            setContent(response.data.content)
        }).catch((error)=>{
            console.log(error.message)
        })
    },[])

    function handleUpdatePost(e){
        e.preventDefault();

        const newPost = {
            title: title, 
            summary: summary,
            imageUrl,
            // imageUrl: imageUrl[0],
            content: content
        }

        apiClient.put('/api/articles/'+id, newPost)
        .then((response)=>{
            setRedirect(true)
        })
        .catch((error)=>{
            console.log(error.message)
            toast("Something went wrong, please try again");
        })
    }

    if(redirect){
        return <Navigate to={'/articles/'+id}/>
    }

    return (
        <>
        <ToastContainer />
    <section className='container'>
        <h1>Hello World</h1>
        <form className='create-article' onSubmit={handleUpdatePost}>
            <input type="text" placeholder='Enter title' name='title' value={title} onChange={e => setTitle(e.target.value)} required/>
            <input type="text" placeholder='Enter summary' name='summary' value={summary} onChange={e => setSummary(e.target.value)}  required />
            <input type="text" placeholder='Enter image url' name='imageUrl' value={imageUrl} onChange={e => setImageUrl(e.target.value)}  required />
            {/* <input type="file" name='imageUrl' onChange={e => setImageUrl(e.target.files)}/> */}
            <ReactQuill theme="snow" value={content} style={{height: '20em', marginBottom: '5em'}} name='content' onChange={newValue => setContent(newValue)} required/>
            <button>Update Post</button>
        </form>
    </section>
    </>)

}

export default EditArticle;