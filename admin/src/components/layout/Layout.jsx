import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

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
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 z-30">
        <Sidebar />
      </aside>

      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          } transition-all duration-300 ease-in-out md:hidden z-50 w-64`}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      <div
        className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeSidebar}
      />

      {!isSidebarOpen &&
        <button
          onClick={toggleSidebar}
          className={`md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 
        h-12 w-6 flex items-center justify-center
        rounded-r-lg shadow-lg 
        ${isSidebarOpen
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            } transition-colors duration-200`}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <FiChevronRight className="w-5 h-5" />

        </button>
      }

      <div className="flex-1 flex flex-col min-h-0 md:ml-64">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6 pb-24 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 