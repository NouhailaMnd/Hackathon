import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="px-6 py-4 text-3xl font-bold border-b border-blue-800">ÉquiPassion</div>
        <nav className="flex flex-col flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: <DashboardIcon /> },
            { id: 'locals', label: 'Gestion Locaux', icon: <BuildingIcon /> },
            { id: 'plannings', label: 'Gestion Plannings', icon: <CalendarIcon /> },
            { id: 'users', label: 'Gestion Utilisateurs', icon: <UsersIcon /> },
            { id: 'billing', label: 'Factures & Paiements', icon: <InvoiceIcon /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors
                ${activeTab === id ? 'bg-blue-900 shadow-lg' : 'hover:bg-blue-800'}`}
              type="button"
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 text-xs text-blue-300 text-center border-t border-blue-800">
          &copy; 2025 ÉquiPassion
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto bg-white rounded-xl shadow-md max-w-7xl mx-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'locals' && <LocalsManagement />}
        {activeTab === 'plannings' && <PlanningsManagement />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'billing' && <BillingManagement />}
      </main>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/stats')
      .then(res => {
        setStats(res.data);
        setError(null);
      })
      .catch(err => {
        setError("Erreur lors du chargement des statistiques");
        console.error(err);
      });
  }, []);

  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;
  if (!stats) return <p className="text-center text-gray-600 italic">Chargement des statistiques...</p>;

  const statsData = [
    { label: 'Réservations', value: stats.reservations, icon: <DashboardIcon color="text-blue-500" /> },
    { label: 'Revenus TTC', value: `${stats.revenus} €`, icon: <DashboardIcon color="text-green-500" /> },
    { label: 'Locaux actifs', value: stats.locaux_actifs, icon: <BuildingIcon color="text-purple-500" /> },
    { label: 'Utilisateurs', value: stats.utilisateurs, icon: <UsersIcon color="text-yellow-500" /> },
    { label: 'Factures en attente', value: stats.factures_en_attente, icon: <InvoiceIcon color="text-pink-500" /> },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-blue-600 pb-2">Tableau de bord général</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map(({ label, value, icon }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className={`p-3 bg-gray-100 rounded-full ${icon.props.color || ''}`}>
              {icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function LocalsManagement() {
  const [locaux, setLocaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/locaux')
      .then(res => {
        setLocaux(res.data);
        setError(null);
      })
      .catch(err => {
        setError("Erreur lors du chargement des locaux");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-600 italic">Chargement des locaux...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-blue-600 pb-2">Gestion des Locaux</h1>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-4 text-left font-semibold">Nom</th>
            <th className="p-4 text-left font-semibold">Type</th>
            <th className="p-4 text-left font-semibold">Capacité</th>
            <th className="p-4 text-left font-semibold">Prix/heure</th>
            <th className="p-4 text-left font-semibold">Localisation</th>
            <th className="p-4 text-left font-semibold">Actif</th>
          </tr>
        </thead>
        <tbody>
          {locaux.map(l => (
            <tr key={l.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="p-4">{l.nom}</td>
              <td className="p-4">{l.type}</td>
              <td className="p-4">{l.capacite}</td>
              <td className="p-4">{l.prix_heure} €</td>
              <td className="p-4">{l.localisation}</td>
              <td className="p-4">{l.actif ? 'Oui' : 'Non'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function PlanningsManagement() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-blue-600 pb-2">Gestion des Plannings</h1>
      <p className="text-gray-600 italic">Fonctionnalité à développer</p>
    </>
  );
}

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/utilisateurs')
      .then(res => {
        setUsers(res.data);
        setError(null);
      })
      .catch(err => {
        setError("Erreur lors du chargement des utilisateurs");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-600 italic">Chargement des utilisateurs...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-blue-600 pb-2">Gestion des Utilisateurs</h1>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-4 text-left font-semibold">ID</th>
            <th className="p-4 text-left font-semibold">Nom</th>
            <th className="p-4 text-left font-semibold">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="p-4">{u.id}</td>
              <td className="p-4">{u.name}</td>
              <td className="p-4">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function BillingManagement() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/factures')
      .then(res => {
        setFactures(res.data);
        setError(null);
      })
      .catch(err => {
        setError("Erreur lors du chargement des factures");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-600 italic">Chargement des factures...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-blue-600 pb-2">Factures & Paiements</h1>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-4 text-left font-semibold">ID Facture</th>
            <th className="p-4 text-left font-semibold">Utilisateur</th>
            <th className="p-4 text-left font-semibold">Montant TTC</th>
            <th className="p-4 text-left font-semibold">Statut</th>
            <th className="p-4 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {factures.map(f => (
            <tr key={f.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="p-4">{f.id}</td>
              <td className="p-4">{f.user_name}</td>
              <td className="p-4">{f.montant_ttc} €</td>
              <td className={`p-4 font-semibold ${f.statut === 'payée' ? 'text-green-600' : 'text-red-600'}`}>
                {f.statut}
              </td>
<td className="p-4">{new Date(f.date_emission).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* Icônes SVG (simplifiées) */
function DashboardIcon({ color = "text-white" }) {
  return (
    <svg
      className={`w-6 h-6 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3 12l2-2 4 4 8-8 4 4v6H3z" />
    </svg>
  );
}
function BuildingIcon({ color = "text-white" }) {
  return (
    <svg
      className={`w-6 h-6 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" ry="2" />
      <path d="M3 7l9-4 9 4" />
    </svg>
  );
}
function CalendarIcon({ color = "text-white" }) {
  return (
    <svg
      className={`w-6 h-6 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function UsersIcon({ color = "text-white" }) {
  return (
    <svg
      className={`w-6 h-6 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function InvoiceIcon({ color = "text-white" }) {
  return (
    <svg
      className={`w-6 h-6 ${color}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}