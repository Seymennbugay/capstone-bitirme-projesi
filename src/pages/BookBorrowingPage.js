import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorModal from '../components/ErrorModal';


function BookBorrowingPage() {
  const [borrows, setBorrows] = useState([]);
  const [newBorrow, setNewBorrow] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    returnDate: '',
    bookId: ''
  });
  const [editBorrow, setEditBorrow] = useState(null);
  const [error, setError] = useState('');

  // Verileri al
  useEffect(() => {
    axios.get(constants.API_URL+'/api/v1/borrows')
      .then(response => setBorrows(response.data))
      .catch(err => setError(err.message));
  }, []);

  // Ödünç alma ekle
  const addBorrow = () => {
    if (!newBorrow.borrowerName || !newBorrow.borrowerMail || !newBorrow.borrowingDate || !newBorrow.returnDate || !newBorrow.bookId) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const borrowRequest = {
      borrowerName: newBorrow.borrowerName,
      borrowerMail: newBorrow.borrowerMail,
      borrowingDate: newBorrow.borrowingDate,
      returnDate: newBorrow.returnDate,
      bookForBorrowingRequest: {
        id: newBorrow.bookId // Kitap ID'sini backend'e gönderiyoruz
      }
    };

    axios.post(constants.API_URL+'/api/v1/borrows', borrowRequest)
      .then(response => {
        setBorrows([...borrows, response.data]);
        setNewBorrow({ borrowerName: '', borrowerMail: '', borrowingDate: '', returnDate: '', bookId: '' });
        setError('');
      })
      .catch(err => setError(err.response?.data?.message || err.message));
  };

  // Ödünç alma sil
  const deleteBorrow = (id) => {
    axios.delete(`http://localhost:8080/api/v1/borrows/${id}`)
      .then(() => {
        setBorrows(borrows.filter(borrow => borrow.id !== id));
      })
      .catch(err => setError(err.response?.data?.message || err.message));
  };

  // Ödünç alma güncelle
  const updateBorrow = () => {
    if (!editBorrow.borrowerName || !editBorrow.borrowerMail || !editBorrow.borrowingDate || !editBorrow.returnDate || !editBorrow.bookId) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const borrowUpdateRequest = {
      borrowerName: editBorrow.borrowerName,
      borrowerMail: editBorrow.borrowerMail,
      borrowingDate: editBorrow.borrowingDate,
      returnDate: editBorrow.returnDate,
      bookForBorrowingRequest: {
        id: editBorrow.bookId // Kitap ID'sini burada güncelliyoruz
      }
    };

    axios.put(`http://localhost:8080/api/v1/borrows/${editBorrow.id}`, borrowUpdateRequest)
      .then(() => {
        setBorrows(borrows.map(borrow => (borrow.id === editBorrow.id ? editBorrow : borrow)));
        setEditBorrow(null);
        setError('');
      })
      .catch(err => setError(err.response?.data?.message || err.message));
  };

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '20px auto',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '3px',
    border: '1px solid #bdc3c7',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Kitap Ödünç Alma</h1>
      {error && <ErrorModal errorMessage={error} />}

      {/* Ödünç Alma Ekleme Formu */}
      <div style={formStyle}>
        <h2>Ödünç Alma Ekle</h2>
        <input
          placeholder="Ad (Örn: John Doe)"
          value={newBorrow.borrowerName}
          onChange={e => setNewBorrow({ ...newBorrow, borrowerName: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="E-posta (Örn: john.doe@example.com)"
          value={newBorrow.borrowerMail}
          onChange={e => setNewBorrow({ ...newBorrow, borrowerMail: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Ödünç Tarihi (YYYY-MM-DD)"
          value={newBorrow.borrowingDate}
          onChange={e => setNewBorrow({ ...newBorrow, borrowingDate: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="İade Tarihi (YYYY-MM-DD)"
          value={newBorrow.returnDate}
          onChange={e => setNewBorrow({ ...newBorrow, returnDate: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Kitap ID (Sayısal)"
          value={newBorrow.bookId}
          onChange={e => setNewBorrow({ ...newBorrow, bookId: e.target.value })}
          style={inputStyle}
        />
        <button onClick={addBorrow} style={buttonStyle}>Ekle</button>
      </div>

      {/* Ödünç Alınan Kitapları Listeleme */}
      <h2>Mevcut Ödünç Alınan Kitaplar</h2>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Mail</th>
            <th>Ödünç Tarihi</th>
            <th>İade Tarihi</th>
            <th>Kitap ID</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map(borrow => (
            <tr key={borrow.id}>
              <td>{borrow.borrowerName}</td>
              <td>{borrow.borrowerMail}</td>
              <td>{borrow.borrowingDate}</td>
              <td>{borrow.returnDate}</td>
              <td>{borrow.bookId}</td>
              <td>
                <button onClick={() => setEditBorrow(borrow)}>Güncelle</button>
                <button onClick={() => deleteBorrow(borrow.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ödünç Alma Güncelleme Formu */}
      {editBorrow && (
        <div style={formStyle}>
          <h2>Ödünç Alma Güncelle</h2>
          <input
            placeholder="Ad (Örn: John Doe)"
            value={editBorrow.borrowerName}
            onChange={e => setEditBorrow({ ...editBorrow, borrowerName: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="E-posta (Örn: john.doe@example.com)"
            value={editBorrow.borrowerMail}
            onChange={e => setEditBorrow({ ...editBorrow, borrowerMail: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Ödünç Tarihi (YYYY-MM-DD)"
            value={editBorrow.borrowingDate}
            onChange={e => setEditBorrow({ ...editBorrow, borrowingDate: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="İade Tarihi (YYYY-MM-DD)"
            value={editBorrow.returnDate}
            onChange={e => setEditBorrow({ ...editBorrow, returnDate: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Kitap ID (Sayısal)"
            value={editBorrow.bookId}
            onChange={e => setEditBorrow({ ...editBorrow, bookId: e.target.value })}
            style={inputStyle}
          />
          <button onClick={updateBorrow} style={buttonStyle}>Güncelle</button>
        </div>
      )}
    </div>
  );
}

export default BookBorrowingPage;

