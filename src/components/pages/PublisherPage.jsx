import React, { useEffect, useState } from "react";
import axios from "axios";

function PublisherPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });
  const [editPublisher, setEditPublisher] = useState(null);
  const [error, setError] = useState("");

  // Verileri al
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "api/v1/publishers")
      .then((response) => setPublishers(response.data))
      .catch((err) => setError(err.message));
  }, []);

  // Modalı kapatma fonksiyonu
  const closeErrorModal = () => {
    setError("");
  };

  // Form validasyonu
  const validateForm = (publisher) => {
    const { name, establishmentYear, address } = publisher;

    if (!name || !establishmentYear || !address) {
      return "Lütfen tüm alanları doldurun!";
    }
    if (!/^\d+$/.test(establishmentYear)) {
      return "Kuruluş Yılı yalnızca rakamlardan oluşmalıdır!";
    }
    return null;
  };

  // Yayınevi ekle
  const addPublisher = () => {
    const validationError = validateForm(newPublisher);
    if (validationError) {
      setError(validationError);
      return;
    }

    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "api/v1/publishers",
        newPublisher
      )
      .then((response) => {
        setPublishers([...publishers, response.data]);
        setNewPublisher({ name: "", establishmentYear: "", address: "" });
        setSuccessMsg("Created");
        setTimeout((e) => {
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Yayınevi sil
  const deletePublisher = (id) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + `api/v1/publishers/${id}`)
      .then(() => {
        setPublishers(publishers.filter((publisher) => publisher.id !== id));
        setSuccessMsg("Deleted");
        setTimeout((e) => {
          setSuccessMsg("");
        }, 2000);
      })
      .catch((err) => setError(err.message));
  };

  // Yayınevi güncelle
  const updatePublisher = () => {
    const validationError = validateForm(editPublisher);
    if (validationError) {
      setError(validationError);
      return;
    }

    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL +
          `api/v1/publishers/${editPublisher.id}`,
        editPublisher
      )
      .then(() => {
        setPublishers(
          publishers.map((publisher) =>
            publisher.id === editPublisher.id ? editPublisher : publisher
          )
        );
        setEditPublisher(null);
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

  const listStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: "#ecf0f1",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
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

  const submitButtonStyle = {
    padding: "10px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Yayınevleri</h1>
      {/* {error && <ErrorModal errorMessage={error} onClose={closeErrorModal} />} */}
      <ul style={listStyle}>
        {publishers.map((publisher) => (
          <li key={publisher.id} style={listItemStyle}>
            {publisher.name} - {publisher.establishmentYear} -{" "}
            {publisher.address}
            <div>
              <button
                style={buttonStyle}
                onClick={() => setEditPublisher(publisher)}
              >
                Güncelle
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
                onClick={() => deletePublisher(publisher.id)}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div style={formStyle}>
        <h2>Yayınevi Ekle</h2>
        <input
          placeholder="İsim"
          value={newPublisher.name}
          onChange={(e) =>
            setNewPublisher({ ...newPublisher, name: e.target.value })
          }
          style={inputStyle}
        />
        <input
          placeholder="Kuruluş Yılı"
          value={newPublisher.establishmentYear}
          onChange={(e) =>
            setNewPublisher({
              ...newPublisher,
              establishmentYear: e.target.value,
            })
          }
          style={inputStyle}
        />
        <input
          placeholder="Adres"
          value={newPublisher.address}
          onChange={(e) =>
            setNewPublisher({ ...newPublisher, address: e.target.value })
          }
          style={inputStyle}
        />
        <button onClick={addPublisher} style={submitButtonStyle}>
          Ekle
        </button>
        <h3>{successMsg}</h3>
      </div>
      {editPublisher && (
        <div style={formStyle}>
          <h2>Yayınevi Güncelle</h2>
          <input
            placeholder="İsim"
            value={editPublisher.name}
            onChange={(e) =>
              setEditPublisher({ ...editPublisher, name: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Kuruluş Yılı"
            value={editPublisher.establishmentYear}
            onChange={(e) =>
              setEditPublisher({
                ...editPublisher,
                establishmentYear: e.target.value,
              })
            }
            style={inputStyle}
          />
          <input
            placeholder="Adres"
            value={editPublisher.address}
            onChange={(e) =>
              setEditPublisher({ ...editPublisher, address: e.target.value })
            }
            style={inputStyle}
          />
          <button onClick={updatePublisher} style={submitButtonStyle}>
            Güncelle
          </button>
        </div>
      )}
    </div>
  );
}

export default PublisherPage;
