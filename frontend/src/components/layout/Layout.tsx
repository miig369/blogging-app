import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/header';

const Layout = () => {
    return(
        <main>
        <Header logo='DaBlog'/>
            <Outlet/>
        <Footer title={`\u00A9 ${new Date().getFullYear()} | DaBlog. All rights reserved. `} />
      </main>
    )
}


export default Layout;