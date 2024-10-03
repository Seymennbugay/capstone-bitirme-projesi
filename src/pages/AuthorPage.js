import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorModal from '../components/ErrorModal';
import constants from '../constants';

function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: '', birthDate: '', country: '' });
  const [editAuthor, setEditAuthor] = useState(null);
  const [error, setError] = useState('');

  // Verileri al
  useEffect(() => {
    axios.get(constants.API_URL+'/api/v1/authors')
      .then(response => setAuthors(response.data))
      .catch(err => setError(err.message));
  }, []);

  // Yazar ekle
  const addAuthor = () => {
    // Doğru formatta tarih olup olmadığını kontrol et
    if (!isValidDate(newAuthor.birthDate)) {
      setError('Doğum tarihi "YYYY-MM-DD" formatında olmalıdır.');
      return;
    }

    axios.post(constants.API_URL+'/api/v1/authors', newAuthor)
      .then(response => {
        setAuthors([...authors, response.data]);
        setNewAuthor({ name: '', birthDate: '', country: '' }); // Formu sıfırla
      })
      .catch(err => setError(err.message));
  };

  // Yazar sil
  const deleteAuthor = (id) => {
    axios.delete(constants.API_URL+`/api/v1/authors/${id}`)
      .then(() => {
        setAuthors(authors.filter(author => author.id !== id));
      })
      .catch(err => setError(err.message));
  };

  // Yazar güncelle
  const updateAuthor = () => {
    if (!isValidDate(editAuthor.birthDate)) {
      setError('Doğum tarihi "YYYY-MM-DD" formatında olmalıdır.');
      return;
    }

    axios.put(constants.API_URL+`/api/v1/authors/${editAuthor.id}`, editAuthor)
      .then(() => {
        setAuthors(authors.map(author => (author.id === editAuthor.id ? editAuthor : author)));
        setEditAuthor(null); // Güncelleme sonrası düzenleme modunu kapat
      })
      .catch(err => setError(err.message));
  };

  // Tarih formatını doğrulayan yardımcı fonksiyon
  const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) != null;
  };

  // Stil tanımları
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    color: '#34495e',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: '#ecf0f1',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle = {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
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

  const submitButtonStyle = {
    padding: '10px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Yazarlar</h1>
      {error && <ErrorModal errorMessage={error} onClose={() => setError('')} />}
      <ul style={listStyle}>
        {authors.map(author => (
          <li key={author.id} style={listItemStyle}>
            {author.name} - {author.birthDate} - {author.country}
            <div>
              <button style={buttonStyle} onClick={() => setEditAuthor(author)}>Güncelle</button>
              <button style={{ ...buttonStyle, backgroundColor: '#e74c3c' }} onClick={() => deleteAuthor(author.id)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={formStyle}>
        <h2>Yazar Ekle</h2>
        <input
          placeholder="İsim"
          value={newAuthor.name}
          onChange={e => setNewAuthor({ ...newAuthor, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Doğum Tarihi (YYYY-MM-DD)"
          value={newAuthor.birthDate}
          onChange={e => setNewAuthor({ ...newAuthor, birthDate: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Ülke"
          value={newAuthor.country}
          onChange={e => setNewAuthor({ ...newAuthor, country: e.target.value })}
          style={inputStyle}
        />
        <button onClick={addAuthor} style={submitButtonStyle}>Ekle</button>
      </div>
      {editAuthor && (
        <div style={formStyle}>
          <h2>Yazar Güncelle</h2>
          <input
            placeholder="İsim"
            value={editAuthor.name}
            onChange={e => setEditAuthor({ ...editAuthor, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Doğum Tarihi (YYYY-MM-DD)"
            value={editAuthor.birthDate}
            onChange={e => setEditAuthor({ ...editAuthor, birthDate: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Ülke"
            value={editAuthor.country}
            onChange={e => setEditAuthor({ ...editAuthor, country: e.target.value })}
            style={inputStyle}
          />
          <button onClick={updateAuthor} style={submitButtonStyle}>Güncelle</button>
        </div>
      )}
    </div>
  );
}

export default AuthorPage;
