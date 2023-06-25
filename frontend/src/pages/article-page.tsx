import {useState, useEffect, useContext} from 'react';
import apiClient from '../services/api-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { Link, Navigate } from 'react-router-dom';
import { IoMdCreate, IoIosTrash} from "react-icons/io";
import { IconContext } from "react-icons";

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
        <section className='container'>
        { userInfo.id === articleInfo?.author?._id &&
                 <div className='action-btns'>
                <Link className='article-btn' to={`/edit/${articleInfo._id}`}>
                <IconContext.Provider value={{color: 'red', size: '24px'}}>
                    <IoMdCreate/>
                   Edit Post
                </IconContext.Provider>
                </Link>
                <a href='#' className='article-btn' onClick={handleDelete}>
                <IconContext.Provider value={{color: 'red', size: '24px'}}>
                <IoIosTrash />
                   Delete Post
                </IconContext.Provider>
                </a>
            </div>}
                <div className="article-view">
                    <h1>{articleInfo?.title}</h1>
                    <img src={articleInfo?.imageUrl} alt={articleInfo?.title}/>
                    <div dangerouslySetInnerHTML={{__html: articleInfo?.content}} />
                    <time>{articleInfo?.datePosted}</time>
                </div>
            </section>
    )
}

export default ArticlePage;