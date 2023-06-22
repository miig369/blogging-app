interface HeaderProps {
    className: string,
    logo: string

}

const Header = ({className, logo}: HeaderProps) => {
    return (
        <header>
            <div className={className}>
                <h3>{logo}</h3>
                <nav>
                    <ul>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;