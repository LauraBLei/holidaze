import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './Components/AppLayout';
import './index.css';
import './fonts.css';
import { DataProvider } from './context/common';
import { AnimatePresence } from 'framer-motion';

import { lazy, Suspense } from 'react';
import SkeletonLoaderVenue from './Components/loading/SkeletonLoaderVenue';
import SkeletonLoaderHome from './Components/loading/SkeletonLoaderHome';
import SkeletonLoaderProfile from './Components/loading/SkeletonLoaderProfile';

const HomePage = lazy(() => import('./pages/home'));
const VenuePage = lazy(() => import('./pages/venue'));
const ProfilePage = lazy(() => import('./pages/profile'));
const EditPage = lazy(() => import('./pages/edit'));
const CreatePage = lazy(() => import('./pages/create'));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<SkeletonLoaderHome />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/venues"
            element={
              <Suspense fallback={<SkeletonLoaderVenue />}>
                <VenuePage />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<SkeletonLoaderProfile />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/edit"
            element={
              <Suspense fallback={null}>
                <EditPage />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={null}>
                <CreatePage />
              </Suspense>
            }
          />
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
