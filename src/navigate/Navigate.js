import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../components/Home';
import { BookShelf } from '../components/Books/Main';
import { VideoShelf } from '../components/Videos/Main';
import { Journal } from '../components/Journal/Main';
import { NotFound404 } from '../components/Errors/NotFound404';

export const Navigate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookshelf/' element={<BookShelf />} />
        <Route path='/videoshelf/' element={<VideoShelf />} />
        <Route path='journal/*' element={<Journal />} />
        <Route path='' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
};
