import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import DeleteBook from '../../frontend/src/pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from '../../frontend/src/pages/ShowBook'


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='books/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<DeleteBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<ShowBook />} />
        
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
