import Article from '../components/article/Article';
import apiClient from '../services/api-client';
import { useState, useEffect, useContext} from 'react';
import { UserContext } from '../context/user-context';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import truncate from '../helpers/truncate'
0
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
    const {userInfo} = useContext(UserContext)
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

    const user = userInfo?.firstName;
    return (
        <>
        { user &&   
        <div>
            <Link className='article-btn' to="/create">
            <IconContext.Provider value={{color: '#27D3AA', size: '24px'}}>
                <IoMdAddCircle />Create Post</IconContext.Provider></Link>
        </div>
        }
       <section className='articles-wrapper'>
        {
            articles?.length > 0 
            ?
            articles.map((article)=> (
           <Article key={article?._id} title={article?.title} url={article?.imageUrl} author={article?.author?.firstName}date={article?.datePosted} className='article' alt='article image' _id={article?._id} readMore='Read More' description={truncate(article?.summary, 150)}/>
            )) :
            <h2 style={{marginTop: '100px'}}>No Blogs Available, Please login to Create a blog</h2>
        }
        </section>

    </>
    )
}

export default Home;