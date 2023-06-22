import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Article from './components/article/Article'

function App() {

  return (
    <main>
      <Header className='container header-wrapper' logo='MunyaBlog'/>
      <section className='container article-wrapper'>
       <Article title='My Blog' url='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d635e8109204737.5fceba9e2b997.jpg' date='' className='article' alt='article' link='' readMore='Read More' description='Hello world'/>
      </section>
      <Footer className='container footer' title='Footer' />
    </main>
  )
}

export default App
