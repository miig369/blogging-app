import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/header';

const Layout = () => {
    return(
        <main>
        <Header className='container header-wrapper' logo='MunyaBlog'/>
            <Outlet/>
        <Footer className='container footer' title='Footer' />
      </main>
    )
}


export default Layout;