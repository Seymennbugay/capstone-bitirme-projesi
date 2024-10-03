import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#1abc9c", // Canlı yeşil arka plan
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const navListStyle = {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  };

  const navItemStyle = {
    margin: "0 10px",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
  };

  const linkHoverStyle = {
    textDecoration: "underline", // Hover'da alt çizgi
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ fontSize: "1.8rem", margin: 0 }}>
        Library Management System
      </h1>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Ana Sayfa
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/publishers"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Yayınevleri
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/categories"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Kategoriler
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/books"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Kitaplar
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/authors"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Yazarlar
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link
            to="/borrows"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.target.style = { ...linkStyle, ...linkHoverStyle })
            }
            onMouseOut={(e) => (e.target.style = linkStyle)}
          >
            Ödünç Al
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
