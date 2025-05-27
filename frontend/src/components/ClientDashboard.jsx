import React, { useState } from 'react';
import SelectCategory from './SelectCategory.jsx';

const fakeUser = {
  nom: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  avatar: 'https://i.pravatar.cc/100?u=jean.dupont'
};

const ClientDashboard = ({ onLogout }) => {
  const [showSelect, setShowSelect] = useState(false);

  if (showSelect) {
    return <SelectCategory />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 40
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: 32,
        width: '100%',
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <img
          src={fakeUser.avatar}
          alt="Avatar"
          style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 16, border: '3px solid #2193b0' }}
        />
        <h2 style={{ color: '#2193b0', marginBottom: 8, fontWeight: 700 }}>
          Bienvenue, {fakeUser.nom} !
        </h2>
        <p style={{ color: '#888', marginBottom: 24 }}>
          {fakeUser.email}
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: 24
        }}>
          <button onClick={() => setShowSelect(true)} style={quickLinkStyle}>Réserver un local</button>
          <a href="#" style={quickLinkStyle}>Mes réservations</a>
          <a href="#" style={quickLinkStyle}>Mes factures</a>
        </div>
        <button
          onClick={onLogout}
          style={{
            marginTop: 32,
            padding: '12px 32px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #56ab2f 0%, #2193b0 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(33,147,176,0.08)',
            transition: 'background 0.2s'
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

const quickLinkStyle = {
  display: 'block',
  padding: '16px',
  borderRadius: '8px',
  background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)',
  color: 'white',
  fontWeight: 600,
  textDecoration: 'none',
  fontSize: 18,
  boxShadow: '0 2px 8px rgba(33,147,176,0.08)',
  transition: 'background 0.2s',
  cursor: 'pointer',
  border: 'none'
};

export default ClientDashboard;
