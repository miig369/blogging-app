import './App.css'
import Layout from './components/layout/Layout'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/index-page'
import Login from './pages/login-page'
import Register from './pages/register-page'
import { UserContextProvider } from './context/user-context'
import CreateArticle from './pages/create-article'
import ArticlePage from './pages/article-page'
import EditArticle from './pages/edit-article'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={
            <section className='container article-wrapper'>
              <Home />
            </section>
        }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<CreateArticle />} />
        <Route path='/articles/:id' element={<ArticlePage/>} />
        <Route path='/edit/:id' element={<EditArticle />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
