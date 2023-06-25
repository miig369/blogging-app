import Article from '../components/article/Article';
import apiClient from '../services/api-client';
import { useState, useEffect, useContext} from 'react';
import { UserContext } from '../context/user-context';
import { Link } from 'react-router-dom';

interface ArticleProps {
    _id: string | number | any,
    title: string,
    content:string,
    summary: string,
    datePosted?: string | any,
    imageUrl: string,
    firstName: string
}

const Home = () => {

    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const {userInfo} = useContext(UserContext)

    useEffect(()=>{
        apiClient.get<ArticleProps[]>('/api/articles').
        then((response)=>{
            console.log(response.data)
            setArticles(response.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }, [])

    const user = userInfo?.firstName;
    return (
        <>
        { user &&   
        <div className='create-article-btn'>
            <Link to="/create">Create new post</Link>
        </div>
        }
       
        {
            articles.length > 0 
            &&
            articles.map((article)=> (
           <Article key={article?._id} title={article?.title} url={article?.imageUrl} author={article?.author?.firstName}date={article?.datePosted} className='article' alt='article image' _id={article?._id} readMore='Read More' description={article?.summary}/>
            ))}
        </>
    )
}

export default Home;