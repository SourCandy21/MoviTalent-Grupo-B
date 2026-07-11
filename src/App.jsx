import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar/navbar';
import CadastroItem from './pages/CadastroItem';
import ManageOffersPage from './features/offers/pages/ManageOffersPage';
import CollectionDetailsPage from './features/offers/pages/CollectionDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CadastroItem />} />
        <Route path="/items/:itemId/offers" element={<ManageOffersPage />} />
        <Route path="/items/:itemId/collections/:collectionId" element={<CollectionDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
