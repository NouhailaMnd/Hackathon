import React, { useState } from 'react';

const HomePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoggedIn(true);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                padding: 32,
                width: '100%',
                maxWidth: 380,
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: 8, color: '#f76b1c', fontWeight: 700, fontSize: 28 }}>
                    Location de Locaux
                </h1>
                <p style={{ marginBottom: 32, color: '#888', fontSize: 16 }}>
                    Connectez-vous à votre espace client
                </p>
                {!isLoggedIn ? (
                    <form onSubmit={handleLogin}>
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
                                background: 'linear-gradient(90deg, #f76b1c 0%, #fad961 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: 18,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(247,107,28,0.08)'
                            }}
                        >
                            Se connecter
                        </button>
                    </form>
                ) : (
                    <div>
                        <h2 style={{ color: '#28a745', marginBottom: 16 }}>Bienvenue, {email} !</h2>
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