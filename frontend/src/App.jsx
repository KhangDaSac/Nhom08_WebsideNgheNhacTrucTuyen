import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { SearchProvider } from './contexts/SearchContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Artist from './pages/Artist';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Search from './pages/Search';
import Library from './pages/Library';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <PlayerProvider>
              <SearchProvider>
                <Router>
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route
                      path="/*"
                      element={
                        <ProtectedRoute>
                          <Layout>
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/account" element={<Account />} />
                              <Route path="/playlist/:id" element={<Playlist />} />
                              <Route path="/album/:id" element={<Album />} />
                              <Route path="/artist/:id" element={<Artist />} />
                              <Route path="/playlist/:id" element={<Playlist />} />
                              {/* <Route path="/song/:id" element={<Song />} /> */}
                              <Route path="/search" element={<Search />} />
                              <Route path="/library" element={<Library />} />
                            </Routes>
                          </Layout>
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Router>
              </SearchProvider>

            </PlayerProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

export default App;