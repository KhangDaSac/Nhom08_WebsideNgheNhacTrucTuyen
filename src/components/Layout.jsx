import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { FiMenu } from 'react-icons/fi';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar - Slide from left */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-50 w-64`}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Main content - Adjusted margin for desktop sidebar */}
      <div className="flex-1 flex flex-col min-h-0 md:ml-64">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6 pb-24 overflow-y-auto">
          {children}
        </main>
        <Footer className="fixed bottom-0 left-0 right-0 md:left-64" />
      </div>
    </div>
  );
};

export default Layout; 