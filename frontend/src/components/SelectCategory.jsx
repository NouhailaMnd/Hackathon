import React, { useState } from 'react';

const categories = [
  {
    value: 'terrain_sport',
    label: 'Terrains de sport',
    description: 'Terrains de football, tennis, basketball...',
    icon: '⚽'
  },
  {
    value: 'salle_conference',
    label: 'Salles de conférences',
    description: 'Espaces pour réunions et formations',
    icon: '👥'
  },
  {
    value: 'salle_fete',
    label: 'Salles de fêtes',
    description: 'Salles de réception et événements',
    icon: '🎉'
  }
];

const SelectCategory = () => {
  const [filters, setFilters] = useState({
    capacite: '',
    equipement: '',
    localisation: '',
    prix: ''
  });
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Ici tu pourrais filtrer les catégories selon les filtres si besoin

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
        maxWidth: 800,
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#2193b0', marginBottom: 24, fontWeight: 700 }}>Choisissez une catégorie de local</h2>
        <div style={{
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 32
        }}>
          {categories.map(cat => (
            <div
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              style={{
                flex: '1 1 220px',
                minWidth: 220,
                maxWidth: 250,
                background: selected === cat.value
                  ? 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)'
                  : '#f8f9fa',
                borderRadius: 16,
                boxShadow: selected === cat.value
                  ? '0 4px 16px rgba(33,147,176,0.15)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
                padding: 28,
                textAlign: 'center',
                cursor: 'pointer',
                border: selected === cat.value ? '2px solid #2193b0' : '2px solid transparent',
                transition: 'all 0.2s',
                color: selected === cat.value ? 'white' : '#333',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>{cat.icon}</div>
              <h3 style={{ margin: 0, color: selected === cat.value ? 'white' : '#2193b0', fontWeight: 700 }}>{cat.label}</h3>
              <p style={{ color: selected === cat.value ? '#fff' : '#888', fontSize: 15 }}>{cat.description}</p>
              {selected === cat.value && (
                <span style={{
                  position: 'absolute',
                  top: 12,
                  right: 16,
                  fontSize: 22,
                  color: '#fff'
                }}>✓</span>
              )}
            </div>
          ))}
        </div>
        <h4 style={{ color: '#2193b0', marginBottom: 18, fontWeight: 600 }}>Filtres</h4>
        <div style={{
          display: 'flex',
          gap: 18,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 10
        }}>
          <input
            type="number"
            name="capacite"
            placeholder="Capacité min."
            value={filters.capacite}
            onChange={handleChange}
            style={filterInputStyle}
          />
          <input
            type="text"
            name="equipement"
            placeholder="Équipement (ex: climatisation)"
            value={filters.equipement}
            onChange={handleChange}
            style={filterInputStyle}
          />
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            value={filters.localisation}
            onChange={handleChange}
            style={filterInputStyle}
          />
          <input
            type="number"
            name="prix"
            placeholder="Prix max (€)"
            value={filters.prix}
            onChange={handleChange}
            style={filterInputStyle}
          />
        </div>
        <button
          style={{
            marginTop: 24,
            padding: '12px 32px',
            borderRadius: 8,
            border: 'none',
            background: selected
              ? 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 50%, #56ab2f 100%)'
              : '#eee',
            color: selected ? 'white' : '#aaa',
            fontWeight: 700,
            fontSize: 18,
            cursor: selected ? 'pointer' : 'not-allowed',
            boxShadow: selected ? '0 2px 8px rgba(33,147,176,0.08)' : 'none',
            transition: 'all 0.2s'
          }}
          disabled={!selected}
        >
          Voir les locaux disponibles
        </button>
      </div>
    </div>
  );
};

const filterInputStyle = {
  padding: 12,
  borderRadius: 8,
  border: '1px solid #eee',
  minWidth: 150,
  fontSize: 16,
  background: '#f8f9fa'
};

export default SelectCategory;
