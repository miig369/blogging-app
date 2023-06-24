import Article from '../components/article/Article';
import apiClient from '../services/api-client';
import { useState, useEffect } from 'react';

interface ArticleProps {
    id: string | number | any,
    title: string,
    content:string,
    summary: string,
    datePosted?: string | any,
    imageUrl: string
}

const Home = () => {

    const [articles, setArticles] = useState<ArticleProps[]>([]);

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
    return (
        <>
        {
            articles.length > 0 
            &&
            articles.map((article)=> (
            <Article key={article?.id} title={article?.title} url={article?.imageUrl} date={article?.datePosted} className='article' alt='article image' link='' readMore='Read More' description={article?.summary}/>
            ))}
        </>
    )
}

export default Home;