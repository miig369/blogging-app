interface ArticleProps {
    title: string,
    url: string,
    date?: Date | null,
    readMore: string,
    description: string,
    alt: string,
    className: string
    link: string
}

const Article = ({title, url, date, className, alt, link, readMore, description}: ArticleProps) =>{
    return(
        <article className={className}>
            <img src={url} alt={alt} />
            <h1>{title}</h1>
            <time>{date}</time>
            <p>{description}</p>
            <a href={link}>{readMore}</a>
        </article>
    )
}

export default Article;