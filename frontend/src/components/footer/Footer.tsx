interface FooterProps {
    title: string,
    className: string
}

const Footer = ({className, title}: FooterProps) => {
    return(
    <footer className={className}>
        <p>{title}</p>
    </footer>
    )
}

export default Footer;