import {useState, useEffect, useContext} from 'react';
import apiClient from '../services/api-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { Link, Navigate } from 'react-router-dom';

interface ArticleProps {
    _id : string | number | any;
    title: string,
    summary?:string, 
    content?:string, 
    imageUrl?:string, 
    datePosted?:Date
}

const ArticlePage = () => {

    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const [articleInfo, setArticleInfo] = useState<ArticleProps>(null)
    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        
        apiClient.get('/api/articles/'+id)
        .then((response)=>{
            setArticleInfo(response.data);
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }, [])

    function handleDelete(){
        apiClient.delete('/api/articles/'+id)
        .then((response)=>{
            setRedirect(true)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    if (!articleInfo){
        return '';
    }

    if(redirect){
        return <Navigate to='/'/>
    }
    return (
        <>
        { userInfo.id === articleInfo?.author?._id &&
            <div className='container'>
                <Link to={`/edit/${articleInfo._id}`}>
                   Edit Article
                </Link>
                <a href='#' onClick={handleDelete}>
                   Delete Article
                </a>
            </div>}
            <section className='container'>
                <h1>{articleInfo?.title}</h1>
                <img src={articleInfo?.imageUrl} alt={articleInfo?.title}/>
                <div dangerouslySetInnerHTML={{__html: articleInfo?.content}} />
                <time>{articleInfo?.datePosted}</time>
            </section>
            </>
    )
    /*
        "_id": "649736cbe478fdd54ccd9af8",
        "title": "post with image",
        "summary": "hello ",
        "content": "<p>hello</p>",
        "imageUrl": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*IHssbtIDUCY9feEBJn4Zbg.jpeg",
        "datePosted": "24/06/2023",
        "author": "6494fcece1ed54e76a214310",
        "__v": 0
    */
}

export default ArticlePage;