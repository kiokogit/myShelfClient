import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../components/Home';
import { BookShelf } from '../components/BookShelf';
import { VideoShelf } from '../components/VideoShelf';
import { Journal } from '../components/Journal';

export const Navigate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/bookshelf/' element={<BookShelf />} />
        <Route path='/videoshelf/' element={<VideoShelf />} />
        <Route path='/journal/' element={<Journal />} />
      </Routes>
    </BrowserRouter>
  )
};
