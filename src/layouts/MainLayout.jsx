import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Player from '../components/player/Player';
import Footer from '../components/navigation/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Player />
      <Footer />
    </div>
  );
};

export default MainLayout; 