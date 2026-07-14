import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import CadastroItem from './pages/CadastroItem/CadastroItem';
import ManageOffersPage from './features/offers/pages/ManageOffersPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CadastroItem />} />
        <Route path="/items/:itemId/offers" element={<ManageOffersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
