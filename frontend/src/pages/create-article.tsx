import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from 'react';

const CreateArticle = () => {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [content, setContent] = useState('')
    return (
    <section className='container'>
        <h1>Hello World</h1>
        <form className='create-article'>
            <input type="text" placeholder='Enter title' name='title' value={title}/>
            <input type="text" placeholder='Enter summary' name='summary' value={summary} />
            <input type="text" placeholder='Enter image url' name='url' value={imageUrl}/>
            <ReactQuill theme="snow" value={content} style={{height: '30em'}}/>
            <button>Create Post</button>
        </form>
    </section>)
}

export default CreateArticle;
