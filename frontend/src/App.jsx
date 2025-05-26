import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './layout/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        {/* Tu peux ajouter d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
