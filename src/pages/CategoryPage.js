import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorModal from '../components/ErrorModal';


function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(constants.API_URL+'/api/v1/categories')
      .then(response => setCategories(response.data))
      .catch(err => setError(err.message));
  }, []);

  const addCategory = () => {
    axios.post(constants.API_URL+'/api/v1/categories', newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategory({ name: '', description: '' });
      })
      .catch(err => setError(err.message));
  };

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:8080/api/v1/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch(err => setError(err.message));
  };

  const updateCategory = () => {
    axios.put(`http://localhost:8080/api/v1/categories/${editCategory.id}`, editCategory)
      .then(() => {
        setCategories(categories.map(category => (category.id === editCategory.id ? editCategory : category)));
        setEditCategory(null);
      })
      .catch(err => setError(err.message));
  };

  // Stil tanımları
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    color: '#2c3e50',
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
      <h1 style={titleStyle}>Kategoriler</h1>
      {error && <ErrorModal errorMessage={error} />}
      <ul style={listStyle}>
        {categories.map(category => (
          <li key={category.id} style={listItemStyle}>
            {category.name} - {category.description}
            <div>
              <button style={buttonStyle} onClick={() => setEditCategory(category)}>Güncelle</button>
              <button style={{ ...buttonStyle, backgroundColor: '#e74c3c' }} onClick={() => deleteCategory(category.id)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={formStyle}>
        <h2>Kategori Ekle</h2>
        <input
          placeholder="İsim"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Açıklama"
          value={newCategory.description}
          onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
          style={inputStyle}
        />
        <button onClick={addCategory} style={submitButtonStyle}>Ekle</button>
      </div>
      {editCategory && (
        <div style={formStyle}>
          <h2>Kategori Güncelle</h2>
          <input
            placeholder="İsim"
            value={editCategory.name}
            onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Açıklama"
            value={editCategory.description}
            onChange={e => setEditCategory({ ...editCategory, description: e.target.value })}
            style={inputStyle}
          />
          <button onClick={updateCategory} style={submitButtonStyle}>Güncelle</button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;



