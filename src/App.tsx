import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/layout";
import { HomePage } from "./pages/home";
import { VenuePage } from "./pages/venue";
import { ProfilePage } from "./pages/profile";
import { ManagerPage } from "./pages/manager";
import { EditPage } from "./pages/edit";
import { CreatePage } from "./pages/create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/venue" element={<VenuePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/create" element={<CreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
