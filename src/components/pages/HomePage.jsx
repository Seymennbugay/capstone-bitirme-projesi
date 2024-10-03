function HomePage() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)", // Canlı degrade arka plan
    color: "#fff",
    fontFamily: '"Poppins", sans-serif',
    animation: "backgroundAnimation 10s infinite alternate", // Arka plan animasyonu
  };

  const titleStyle = {
    fontSize: "4rem",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)", // Kalın gölge
    letterSpacing: "3px", // Harfler arası genişlik
    animation: "glow 2s ease-in-out infinite alternate", // Glow animasyonu
  };

  const descriptionStyle = {
    fontSize: "1.8rem",
    color: "#fff",
    maxWidth: "800px",
    textAlign: "center",
    lineHeight: "2",
    letterSpacing: "1.5px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    padding: "20px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)", // Cam efekti
  };

  const keyframesStyle = `
    @keyframes backgroundAnimation {
      0% {
        background-image: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
      }
      100% {
        background-image: linear-gradient(135deg, #FFDD00 0%, #FBB034 100%);
      }
    }
    
    @keyframes glow {
      from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff7f50, 0 0 40px #ff7f50, 0 0 50px #ff7f50;
      }
      to {
        text-shadow: 0 0 20px #fff, 0 0 30px #ff7f50, 0 0 40px #ff7f50, 0 0 50px #ff7f50, 0 0 60px #ff7f50;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style>
      <h1 style={titleStyle}>Library Management System</h1>
      <p style={descriptionStyle}>
        Kütüphane yönetim sistemine hoş geldiniz. Kitaplarınızı, yazarlarınızı
        ve daha fazlasını yönetin.
      </p>
    </div>
  );
}

export default HomePage;
