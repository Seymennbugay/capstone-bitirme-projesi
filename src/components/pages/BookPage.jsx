import React, { useEffect, useState } from "react";
import axios from "axios";

function BookPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    publicationYear: "",
    stock: "",
    authorId: "",
    publisherId: "",
  });
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState("");

  // Kitapları al
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "api/v1/books")
      .then((response) => setBooks(response.data))
      .catch((err) => setError(err.message));
  }, []);

  // Kitap ekle
  const addBook = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "api/v1/books", newBook)
      .then((response) => {
        setBooks([...books, response.data]); // Yeni eklenen kitabı listeye ekle
        setNewBook({
          name: "",
          publicationYear: "",
          stock: "",
          authorId: "",
          publisherId: "",
        }); // Formu sıfırla
        setSuccessMsg("Created");
        setTimeout((e) => {
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Kitap sil
  const deleteBook = (id) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + `api/v1/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
        setSuccessMsg("Deleted");
        setTimeout((e) => {
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Kitap güncelle
  const updateBook = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + `api/v1/books/${editBook.id}`,
        editBook
      )
      .then(() => {
        setBooks(
          books.map((book) => (book.id === editBook.id ? editBook : book))
        );
        setEditBook(null); // Güncelleme sonrası düzenleme modunu kapat
        setSuccessMsg("Updated");
        setTimeout((e) => {
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Stil tanımları
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "20px auto",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "3px",
    border: "1px solid #bdc3c7",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  };

  const thStyle = {
    backgroundColor: "#34495e",
    color: "white",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  const actionButtonStyle = {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Kitaplar</h1>
      {/* {error && <ErrorModal errorMessage={error} />} */}

      {/* Kitap Ekleme Formu */}
      <div style={formStyle}>
        <h2>Kitap Ekle</h2>
        <input
          placeholder="Kitap İsmi"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Yayın Yılı"
          value={newBook.publicationYear}
          onChange={(e) =>
            setNewBook({ ...newBook, publicationYear: e.target.value })
          }
          style={inputStyle}
        />
        <input
          placeholder="Stok"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Yazar ID"
          value={newBook.authorId}
          onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Yayınevi ID"
          value={newBook.publisherId}
          onChange={(e) =>
            setNewBook({ ...newBook, publisherId: e.target.value })
          }
          style={inputStyle}
        />
        <button onClick={addBook} style={buttonStyle}>
          Ekle
        </button>
        <h3>{successMsg}</h3>
      </div>

      {/* Kitapları Listeleme */}
      <h2>Mevcut Kitaplar</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Kitap İsmi</th>
            <th style={thStyle}>Yayın Yılı</th>
            <th style={thStyle}>Stok</th>
            <th style={thStyle}>Yazar ID</th>
            <th style={thStyle}>Yayınevi ID</th>
            <th style={thStyle}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td style={tdStyle}>{book.name}</td>
              <td style={tdStyle}>{book.publicationYear}</td>
              <td style={tdStyle}>{book.stock}</td>
              <td style={tdStyle}>{book.authorId}</td>
              <td style={tdStyle}>{book.publisher}</td>
              <td style={tdStyle}>
                <button
                  style={actionButtonStyle}
                  onClick={() => setEditBook(book)}
                >
                  Güncelle
                </button>
                <button
                  style={{ ...actionButtonStyle, backgroundColor: "#e74c3c" }}
                  onClick={() => deleteBook(book.id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Kitap Güncelleme Formu (EditBook varsa gösterilir) */}
      {editBook && (
        <div style={formStyle}>
          <h2>Kitap Güncelle</h2>
          <input
            placeholder="Kitap İsmi"
            value={editBook.name}
            onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Yayın Yılı"
            value={editBook.publicationYear}
            onChange={(e) =>
              setEditBook({ ...editBook, publicationYear: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Stok"
            value={editBook.stock}
            onChange={(e) =>
              setEditBook({ ...editBook, stock: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Yazar ID"
            value={editBook.authorId}
            onChange={(e) =>
              setEditBook({ ...editBook, authorId: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Yayınevi ID"
            value={editBook.publisherId}
            onChange={(e) =>
              setEditBook({ ...editBook, publisherId: e.target.value })
            }
            style={inputStyle}
          />
          <button onClick={updateBook} style={buttonStyle}>
            Güncelle
          </button>
        </div>
      )}
    </div>
  );
}

export default BookPage;
