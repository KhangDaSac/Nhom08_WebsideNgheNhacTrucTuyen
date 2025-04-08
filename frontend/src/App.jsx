import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { SearchProvider } from './contexts/SearchContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Layout from './components/layout/Layout';
import { LibraryProvider } from './contexts/LibraryContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Playlists from './pages/Playlists';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Song from './pages/Song';
import Artist from './pages/Artist';
import Album from './pages/Album';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <PlayerProvider>
              <SearchProvider>
                <LibraryProvider>
                  <ToastProvider>
                    <Router>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                          path="/*"
                          element={
                            <Layout>
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/search" element={<Search />} />
                                <Route
                                  path="/account"
                                  element={
                                    <ProtectedRoute>
                                      <Account />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/playlists"
                                  element={
                                    <ProtectedRoute>
                                      <Playlists />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/playlist/:id"
                                  element={
                                    <ProtectedRoute>
                                      <Playlist />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route
                                  path="/library"
                                  element={
                                    <ProtectedRoute>
                                      <Library />
                                    </ProtectedRoute>
                                  }
                                />
                                <Route path="/song/:id" element={<Song />} />
                                <Route path="/artist/:id" element={<Artist />} />
                                <Route path="/album/:id" element={<Album />} />
                              </Routes>

                            </Layout>
                          }
                        />
                      </Routes>
                    </Router>
                  </ToastProvider>
                </LibraryProvider>
              </SearchProvider>
            </PlayerProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

export default App;