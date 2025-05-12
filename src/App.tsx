import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Components/layout';
import { HomePage } from './pages/home';
import { VenuePage } from './pages/venue';
import { ProfilePage } from './pages/profile';
import { EditPage } from './pages/edit';
import { CreatePage } from './pages/create';
import './index.css';
import './fonts.css';
import { DataProvider } from './context/common';

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/venues" element={<VenuePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/edit" element={<EditPage />} />
              <Route path="/create" element={<CreatePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
