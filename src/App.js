import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PublisherPage from './pages/PublisherPage';
import CategoryPage from './pages/CategoryPage';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import BookBorrowingPage from './pages/BookBorrowingPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publishers" element={<PublisherPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/borrows" element={<BookBorrowingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
