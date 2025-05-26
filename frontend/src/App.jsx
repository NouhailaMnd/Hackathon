import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Sidebar" element={<Sidebar />} />
        {/* Tu peux ajouter d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
