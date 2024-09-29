import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthorProvider } from './contexts/AuthorContext';
import { BookProvider } from './contexts/BookContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { PublisherProvider } from './contexts/PublisherContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthorProvider>
        <BookProvider>
          <CategoryProvider>
            <PublisherProvider>
              <App />
            </PublisherProvider>
          </CategoryProvider>
        </BookProvider>
      </AuthorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
