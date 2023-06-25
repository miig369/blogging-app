interface FooterProps {
    title: string,
}

const Footer = ({title}: FooterProps) => {
    return(
    <footer>
        <p>{title}</p>
    </footer>
    )
}

export default Footer;