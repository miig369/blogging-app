import {Link} from 'react-router-dom';

interface ArticleProps {
    _id: string | number | any,
    title: string,
    url: string,
    date?: Date | null,
    readMore: string,
    description: string,
    alt: string,
    className: string
    author: string
}

const Article = ({_id, title, url, date, className, alt, readMore, description, author}: ArticleProps) =>{
    return(
        <article className={className}>
            <Link to={`/articles/${_id}`}>
            <img src={url} alt={alt} />
            <h1>{title}</h1>
            </Link>
           <span><b>{author}</b><time>{date}</time></span> 
            <p>{description}</p>
            <Link className='read-more' to={`/articles/${_id}`}>{readMore}</Link>
        </article>
    )
}

export default Article;