import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './Components/AppLayout';
import { HomePage } from './pages/home';
import { VenuePage } from './pages/venue';
import { ProfilePage } from './pages/profile';
import { EditPage } from './pages/edit';
import { CreatePage } from './pages/create';
import './index.css';
import './fonts.css';
import { DataProvider } from './context/common';
import { AnimatePresence } from 'framer-motion';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
