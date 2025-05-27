import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './layout/AdminDashboard';
import HomePage from './components/HomePage.jsx';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        {/* Tu peux ajouter d'autres routes ici */}
        
      </Routes>
    </Router>
    <div className="App">
      <HomePage />
    </div>
    </>
  );
}

export default App;
