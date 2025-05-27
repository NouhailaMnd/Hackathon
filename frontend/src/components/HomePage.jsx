import React, { useState } from 'react';
import ClientDashboard from './ClientDashboard.jsx';

const HomePage = () => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setQrCode('');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleQrLogin = (e) => {
    e.preventDefault();
    if (qrCode) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    // Passe la fonction de déconnexion au dashboard
    return <ClientDashboard onLogout={handleLogout} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: 32,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: 8, color: '#2193b0', fontWeight: 700, fontSize: 28 }}>
          Location de Locaux
        </h1>
        <p style={{ marginBottom: 32, color: '#888', fontSize: 16 }}>
          Connexion à votre espace client
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <button
            onClick={() => setLoginMethod('email')}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: '8px 0 0 8px',
              border: 'none',
              background: loginMethod === 'email' ? '#2193b0' : '#eee',
              color: loginMethod === 'email' ? 'white' : '#333',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Email / Mot de passe
          </button>
          <button
            onClick={() => setLoginMethod('qr')}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: '0 8px 8px 0',
              border: 'none',
              background: loginMethod === 'qr' ? '#2193b0' : '#eee',
              color: loginMethod === 'qr' ? 'white' : '#333',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            QR Code
          </button>
        </div>
        {!isLoggedIn ? (
          loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  marginBottom: 16,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 16
                }}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  marginBottom: 24,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 16
                }}
                required
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(33,147,176,0.08)'
                }}
              >
                Se connecter
              </button>
            </form>
          ) : (
            <form onSubmit={handleQrLogin}>
              <input
                type="text"
                placeholder="Scannez ou collez votre QR Code"
                value={qrCode}
                onChange={e => setQrCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  marginBottom: 24,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  fontSize: 16
                }}
                required
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: 'none',
                  background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(33,147,176,0.08)'
                }}
              >
                Se connecter avec QR Code
              </button>
              <p style={{ color: '#888', fontSize: 13, marginTop: 10 }}>
                Votre QR code personnel vous a été envoyé par email lors de l'inscription.
              </p>
            </form>
          )
        ) : (
          <div>
            <h2 style={{ color: '#28a745', marginBottom: 16 }}>Bienvenue !</h2>
            <p>Vous êtes connecté à l'espace client.</p>
          </div>
        )}
      </div>
      <footer style={{ marginTop: 40, color: '#fff', fontSize: 14, opacity: 0.8 }}>
        © {new Date().getFullYear()} Location de Locaux. Tous droits réservés.
      </footer>
    </div>
  );
};

export default HomePage;