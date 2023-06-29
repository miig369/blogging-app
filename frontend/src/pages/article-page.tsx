import {useState, useEffect, useContext} from 'react';
import apiClient from '../services/api-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { Link, Navigate } from 'react-router-dom';
import { IoMdCreate, IoIosTrash} from "react-icons/io";
import { IconContext } from "react-icons";
import { toast } from 'react-toastify';

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
        
         //effect cleanup
    const controller = new AbortController();

        apiClient.get('/api/articles/'+id)
        .then((response)=>{
            setArticleInfo(response.data);
        })
        .catch((error)=>{
            console.log(error.message)
        })

    return () => controller.abort();
    }, [])

    function handleDelete(){

        // apiClient.delete('/api/articles/'+id)
        // .then((response)=>{
        //     setRedirect(true)
        // })
        // .catch((error)=>{
        //     console.log(error.message)
        // })

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `token=${localStorage.getItem('token')}`);

        const raw = JSON.stringify({
        "title": articleInfo.title,
        "content": articleInfo.content,
        "summary": articleInfo.summary,
        "imageUrl": articleInfo.imageUrl
        });

        const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:9000/api/"+id, requestOptions)
        .then((response) =>{
             response.text() 
             setRedirect(true);
            })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    if (!articleInfo){
        return '';
    }

    if(redirect){
        return <Navigate to='/'/>
    }

    return (
        <section className='container'>
        {  userInfo._id === articleInfo.author &&
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
              </div>
        }
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