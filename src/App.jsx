import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
// import Track from './pages/Track';
import Artist from './pages/Artist';
// import Explore from './pages/Explore';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes with MainLayout */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/playlist/:id" element={<Playlist />} />
                    <Route path="/album/:id" element={<Album />} />
                    {/* <Route path="/track/:id" element={<Track />} /> */}
                    <Route path="/artist/:id" element={<Artist />} />
                    {/* <Route path="/explore" element={<Explore />} /> */}
                  </Route>
                </Route>
              </Routes>
            </Router>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
