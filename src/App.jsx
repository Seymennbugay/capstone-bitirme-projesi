import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import AuthorPage from "./components/pages/AuthorPage";
import BookBorrowingPage from "./components/pages/BookBorrowingPage";
import BookPage from "./components/pages/BookPage";
import CategoryPage from "./components/pages/CategoryPage";
import PublisherPage from "./components/pages/PublisherPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/authors" element={<AuthorPage></AuthorPage>} />
          <Route
            path="/borrows"
            element={<BookBorrowingPage></BookBorrowingPage>}
          />
          <Route path="/books" element={<BookPage></BookPage>} />
          <Route path="/publishers" element={<PublisherPage></PublisherPage>} />
          <Route path="/categories" element={<CategoryPage></CategoryPage>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
