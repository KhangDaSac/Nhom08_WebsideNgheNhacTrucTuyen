import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Layout from './components/layout/Layout';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Account from './pages/Account';
import SongManager from './pages/SongManager';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route
                            path="/account"
                            element={
                              <ProtectedRoute>
                                <Account />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/song-manager"
                            element={
                              <ProtectedRoute>
                                <SongManager />
                              </ProtectedRoute>
                            }
                          />

                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
              </Router>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

export default App;